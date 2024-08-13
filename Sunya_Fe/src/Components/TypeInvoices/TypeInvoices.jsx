import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaSearch, FaRedoAlt } from 'react-icons/fa';
import { cleanTypeInvoiceSiigo, getTypeInvoiceSiigo } from '../../Redux/ActionsSiigo/actionsSiigo';

const TypeInvoices = () => {
  const dispatch = useDispatch();
  const typeInvoices = useSelector((state) => state.typeInvoices);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredInvoices, setFilteredInvoices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    dispatch(getTypeInvoiceSiigo())
      .then(() => setIsLoading(false))
      .catch(() => setIsLoading(false));

    return () => {
      dispatch(cleanTypeInvoiceSiigo());
    };
  }, [dispatch]);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    const filtered = typeInvoices.filter(
      (type) => type.id.includes(term) || type.electronic_type.includes(term)
    );
    setFilteredInvoices(filtered);
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center mb-4">
        <FaSearch className="mr-2 text-gray-500 text-sm" />
        <input
          type="text"
          placeholder="Buscar tipo de Factura"
          value={searchTerm}
          onChange={handleSearchChange}
          className="border rounded px-3 py-2 flex-1"
        />
        <FaRedoAlt
          onClick={() => setSearchTerm('')}
          className="ml-2 text-gray-500 cursor-pointer"
        />
      </div>

      {isLoading ? (
        <div className="flex justify-center">
          <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"></div>
        </div>
      ) : (
        <div className="divide-y divide-gray-200">
          {(searchTerm === '' ? typeInvoices : filteredInvoices).map((type) => (
            <details key={type.id} className="py-2">
              <summary className="cursor-pointer font-semibold text-gray-700">
                {type.name} (ID: {type.id})
              </summary>
              <div className="mt-2 pl-4">
                <p><strong>Código:</strong> {type.code}</p>
                <p><strong>Descripción:</strong> {type.description}</p>
                <p><strong>Tipo:</strong> {type.type}</p>
                <p><strong>Activa:</strong> {type.active ? 'SI' : 'NO'}</p>
                <p><strong>Vendedor por ítem:</strong> {type.seller_by_item ? 'SI' : 'NO'}</p>
                <p><strong>Maneja centro de costos:</strong> {type.cost_center ? 'SI' : 'NO'}</p>
                <p><strong>Maneja numeración automática:</strong> {type.automatic_number ? 'SI' : 'NO'}</p>
                <p><strong>Próximo consecutivo:</strong> {type.consecutive}</p>
                <p><strong>Descuento:</strong> {type.discount_type}</p>
                <p><strong>Maneja decimales:</strong> {type.decimals ? 'SI' : 'NO'}</p>
                <p><strong>Maneja anticipos:</strong> {type.advance_payment ? 'SI' : 'NO'}</p>
                <p><strong>Maneja reteiva:</strong> {type.reteiva ? 'SI' : 'NO'}</p>
                <p><strong>Maneja reteica:</strong> {type.reteica ? 'SI' : 'NO'}</p>
                <p><strong>Maneja autoretención:</strong> {type.self_withholding ? 'SI' : 'NO'}</p>
                <p><strong>Valor mínimo autoretenión:</strong> {type.self_withholding_limit}</p>
                <p><strong>Factura electrónica:</strong> {type.electronic_type}</p>
                <p><strong>Maneja ingresos para terceros:</strong> {type.customer_by_item ? 'SI' : 'NO'}</p>
              </div>
            </details>
          ))}
        </div>
      )}
    </div>
  );
};

export default TypeInvoices;


