const { User, Store, StoreCashier, Role } = require('../data');
const response = require('../utils/response');

module.exports = async (req, res) => {
  const { storeId, userIds } = req.body;
  const storeIdNumber = parseInt(storeId, 10);

  try {
    // Verificar si la tienda existe
    const store = await Store.findByPk(storeIdNumber);
    if (!store) {
      return res.status(404).json({ message: 'Tienda no encontrada' });
    }

    // Obtener el rol de 'cajero'
    const cashierRole = await Role.findOne({ where: { name: 'cajero' } });
    if (!cashierRole) {
      return res.status(404).json({ message: 'Rol de cajero no encontrado' });
    }

    // Verificar si los usuarios existen y tienen el rol de 'cajero'
    const cashiers = await User.findAll({
      where: {
        id_user: userIds,
        id_role: cashierRole.id,
      },
    });

    if (cashiers.length !== userIds.length) {
      return res
        .status(400)
        .json({ message: 'Uno o más usuarios no existen o no tienen el rol de cajero' });
    }

    // Asignar cada cajero a la tienda
    await Promise.all(
      cashiers.map(async (cashier) => {
        // Verificar si el cajero ya está asignado a la misma tienda
        const existingAssignment = await StoreCashier.findOne({
          where: { userId: cashier.id_user, storeId: storeIdNumber },
        });

        if (!existingAssignment) {
          // Verificar si el cajero ya está asignado a otra tienda
          const oldAssignment = await StoreCashier.findOne({
            where: { userId: cashier.id_user },
          });

          if (oldAssignment) {
            // Eliminar la asignación antigua
            await oldAssignment.destroy();
          }

          // Crear la nueva asignación
          await StoreCashier.create({
            storeId: storeIdNumber,
            userId: cashier.id_user,
          });
        }
      })
    );

    response(res, 201, 'success');
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error asignando cajeros a la tienda' });
  }
};
