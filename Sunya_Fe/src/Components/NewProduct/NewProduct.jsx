import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import {
  cleanProductsAdmin,
  getProductsAdmin,
  postNewProduct,
} from "../../Redux/Actions/actions";

import { useEffect } from "react";
import {
  cleanAccountGroup,
  cleanTaxes,
  createProductSiigo,
  getAccountGroup,
  getTaxes,
} from "../../Redux/ActionsSiigo/actionsSiigo";

// eslint-disable-next-line react/prop-types
const NewProduct = ({ setShowModalA }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const userInfo = useSelector((state) => state.userInfo);
  const accounts = useSelector((state) => state.accounts);
  //const taxes = useSelector((state) => state.taxes);

  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [images, setImages] = useState([]);
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [account, setAccount] = useState("");
  const [idTax, setIdTax] = useState(0);
  const [type, setType] = useState("");
  const [currencyCode, setCurrencyCode] = useState("");
  const [position, setPosition] = useState("");
  const [unid, setUnid] = useState("");
  const [stockControl, setStockControl] = useState(false);
  const [taxClassification, setTaxClassification] = useState("");
  const [taxIncluded, setTaxIncluded] = useState(false);
  const [taxConsumptionValue, setTaxConsumptionValue] = useState(0);
  const [tariff, setTariff] = useState("");
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);

  useEffect(() => {
    const generateCode = () => {
      const randomPart = Math.floor(Math.random() * 100000);
      return `L7M-${randomPart}`;
    };
    setCode(generateCode());
    dispatch(getAccountGroup());
    dispatch(getTaxes(/*{headers}*/));

    return () => {
      const token = userInfo.token;
      const headers = { Authorization: `Bearer ${token}` };
      dispatch(getProductsAdmin({ headers }));
      dispatch(cleanAccountGroup());
      dispatch(cleanTaxes());
    };
  }, [dispatch, userInfo]);

  const handleAddColor = (color) => {
    setColors([...colors, color]);
  };

  const handleAddSize = (size) => {
    setSizes([...sizes, size]);
  };

  const handleRemoveColor = (color) => {
    setColors(colors.filter((c) => c !== color));
  };

  const handleRemoveSize = (size) => {
    setSizes(sizes.filter((s) => s !== size));
  };

  const upLoadImage = async (e) => {
    const files = Array.from(e.target.files);
    setLoading(true);

    const uploadPromises = files.map(async (file) => {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "Sunya7754");

      const response = await fetch(
        "https://api.cloudinary.com/v1_1/djkq5h1et/image/upload",
        {
          method: "POST",
          body: data,
        }
      );
      const fileData = await response.json();
      return fileData.secure_url;
    });

    try {
      const uploadedImages = await Promise.all(uploadPromises);
      setImages((prevImages) => [...prevImages, ...uploadedImages]);
    } catch (error) {
      console.error("Error uploading images:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDateProduct = async () => {
    const data = {
      idTax: idTax,
      type: type,
      code: code,
      name: name,
      slug: slug,
      images: images,
      brand: brand,
      account: account,
      description: description,
      price: parseFloat(price).toFixed(3),
      countInStock: parseFloat(countInStock),
      currencyCode: currencyCode,
      position: position,
      unid: unid,
      stockControl: stockControl,
      taxClassification: taxClassification,
      taxIncluded: taxIncluded,
      taxConsumptionValue: taxConsumptionValue,
      tariff: tariff,
    };

    try {
      const token = userInfo.token;
      const headers = { Authorization: `Bearer ${token}` };

      const responseA = await dispatch(createProductSiigo(headers, data));
      if (responseA.success) {
        const response = await dispatch(postNewProduct(headers, data));
        if (response.success) {
          Swal.fire({
            icon: "success",
            title: "¡Éxito!",
            text: "¡Producto creado correctamente. Ya está en SIIGO!.",
          });
          dispatch(cleanProductsAdmin());
          setEditMode(false);
          setShowModalA(false);
          history.push("/admin/products");
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Completa los campos requeridos para cargar el producto",
        });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="w-11/12 max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
      <div className="p-6">
        {!editMode ? (
          <button
            onClick={() => setEditMode(true)}
            className="bg-botonVerde text-white font-bold py-2 px-6 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Crear Producto
          </button>
        ) : (
          <form className="space-y-4">
            <div>
              <label className="block text-lg font-semibold mb-2">
                Imagenes del producto
                <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="file"
                name="files"
                onChange={upLoadImage}
                multiple
                className="block w-full text-sm text-gray-700 border border-gray-300 rounded-lg p-2 mb-4"
                required
              />
              {loading && <p className="text-blue-500">Cargando imagen...</p>}
              <div className="flex flex-wrap gap-4">
                {images.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`Uploaded ${index}`}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                ))}
              </div>
            </div>
            <div>
              <label className="block text-lg font-semibold mb-2">Codigo</label>
              <input
                type="text"
                value={code}
                readOnly
                className="block w-full text-sm text-gray-700 border border-gray-300 rounded-lg p-2"
              />
            </div>

            {/* Aquí empiezan los nuevos campos */}
            <div className="mb-4">
              <label
                htmlFor="formAccount"
                className="block text-sm font-medium text-gray-700"
              >
                <strong>Grupo Inventario SIIGO</strong>{" "}
                <span className="text-red-500">(campo obligatorio)</span>
              </label>
              <select
                id="formAccount"
                value={account}
                onChange={(e) => setAccount(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              >
                <option value="">Selecciona una cuenta</option>
                {/* Asegúrate de tener la variable `accounts` definida */}
                {accounts.map((acc) => (
                  <option key={acc.id} value={acc.id}>
                    {acc.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label
                htmlFor="formType"
                className="block text-sm font-medium text-gray-700"
              >
                <strong>Tipo de producto</strong>{" "}
              </label>
              <select
                id="formType"
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="">Selecciona una opción</option>
                <option value="Product">Producto</option>
                <option value="Service">Servicio</option>
                <option value="ConsumerGood">Consumo</option>
              </select>
            </div>

            <div className="mb-4">
              <label
                htmlFor="formName"
                className="block text-sm font-medium text-gray-700"
              >
                <strong>Nombre</strong>{" "}
              </label>
              <input
                id="formName"
                type="text"
                placeholder="Ingrese nombre nuevo producto"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="formSlug"
                className="block text-sm font-medium text-gray-700"
              >
                <strong>Presentacion</strong>{" "}
              </label>
              <input
                id="formSlug"
                type="text"
                placeholder="Ingrese nueva presentacion"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                required
                className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="formUnid"
                className="block text-sm font-medium text-gray-700"
              >
                <strong>Medida</strong>{" "}
                <span className="text-gray-500">(opcional)</span>
              </label>
              <select
                id="formUnid"
                value={unid}
                onChange={(e) => setUnid(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="">Selecciona una opción</option>
                <option value="94">Unidad</option>
              </select>
            </div>

            <div className="mb-6">
              <label
                htmlFor="formBrand"
                className="block text-sm font-medium text-gray-700"
              >
                <strong>Marca</strong>{" "}
                <span className="text-red-500">(campo obligatorio)</span>
              </label>
              <input
                id="formBrand"
                type="text"
                placeholder="Ingrese marca nuevo producto"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                required
                className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="formDescription"
                className="block text-sm font-medium text-gray-700"
              >
                <strong>Descripción </strong>{" "}
                <span className="text-red-500">(campo obligatorio)</span>
              </label>
              <input
                id="formDescription"
                type="text"
                placeholder="Ingrese descripción"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="formPrice"
                className="block text-sm font-medium text-gray-700"
              >
                <strong>Precio sin IVA</strong>{" "}
                <span className="text-red-500">(campo obligatorio)</span>
              </label>
              <input
                id="formPrice"
                type="text"
                placeholder="Ingrese precio nuevo producto sin IVA"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="formCurrencyCode"
                className="block text-sm font-medium text-gray-700"
              >
                <strong>Moneda</strong>{" "}
                <span className="text-red-500">(campo obligatorio)</span>
              </label>
              <select
                id="formCurrencyCode"
                value={currencyCode}
                onChange={(e) => setCurrencyCode(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              >
                <option value="">Selecciona una moneda</option>
                <option value="COP">COP</option>
                <option value="USD">USD</option>
              </select>
            </div>

            <div className="mb-6">
              <label
                htmlFor="formTaxClassification"
                className="block text-sm font-medium text-gray-700"
              >
                <strong>Clasificación de IVA</strong>{" "}
                <span className="text-red-500">(campo obligatorio)</span>
              </label>
              <select
                id="formTaxClassification"
                value={taxClassification}
                onChange={(e) => setTaxClassification(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              >
                <option value="">Selecciona una opción</option>
                <option value="SIVA">IVA</option>
                <option value="SIV">IVA Exento</option>
                <option value="SIVA_N">IVA No Aplica</option>
              </select>
            </div>

            <div className="mb-6">
              <label
                htmlFor="formTaxIncluded"
                className="block text-sm font-medium text-gray-700"
              >
                <strong>IVA incluido</strong>{" "}
                <span className="text-red-500">(campo obligatorio)</span>
              </label>
              <select
                id="formTaxIncluded"
                value={taxIncluded}
                onChange={(e) => setTaxIncluded(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              >
                <option value="">Selecciona una opción</option>
                <option value="true">Sí</option>
                <option value="false">No</option>
              </select>
            </div>

            <div className="mb-6">
              <label
                htmlFor="formTaxConsumptionValue"
                className="block text-sm font-medium text-gray-700"
              >
                <strong>Consumo del IVA</strong>{" "}
                <span className="text-red-500">(campo obligatorio)</span>
              </label>
              <input
                id="formTaxConsumptionValue"
                type="text"
                placeholder="Ingrese el valor de IVA de consumo"
                value={taxConsumptionValue}
                onChange={(e) => setTaxConsumptionValue(e.target.value)}
                required
                className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="formIdTax"
                className="block text-sm font-medium text-gray-700"
              >
                <strong>ID Impuesto</strong>{" "}
                <span className="text-red-500">(campo obligatorio)</span>
              </label>
              <input
                id="formIdTax"
                type="text"
                placeholder="Ingrese el ID del impuesto"
                value={idTax}
                onChange={(e) => setIdTax(e.target.value)}
                required
                className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="formPosition"
                className="block text-sm font-medium text-gray-700"
              >
                <strong>Posición</strong>{" "}
                <span className="text-red-500">(campo obligatorio)</span>
              </label>
              <input
                id="formPosition"
                type="text"
                placeholder="Ingrese la posición"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                required
                className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="formStockControl"
                className="block text-sm font-medium text-gray-700"
              >
                <strong>Control de Stock</strong>{" "}
                <span className="text-red-500">(campo obligatorio)</span>
              </label>
              <select
                id="formStockControl"
                value={stockControl}
                onChange={(e) => setStockControl(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              >
                <option value="">Selecciona una opción</option>
                <option value="true">Sí</option>
                <option value="false">No</option>
              </select>
            </div>

            <div className="mb-6">
              <label
                htmlFor="formCountInStock"
                className="block text-sm font-medium text-gray-700"
              >
                <strong>Cantidad en Stock</strong>{" "}
                <span className="text-red-500">(campo obligatorio)</span>
              </label>
              <input
                id="formCountInStock"
                type="number"
                placeholder="Ingrese cantidad en stock"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
                required
                className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="formTariff"
                className="block text-sm font-medium text-gray-700"
              >
                <strong>Tarifa</strong>{" "}
                <span className="text-red-500">(campo obligatorio)</span>
              </label>
              <input
                id="formTariff"
                type="text"
                placeholder="Ingrese tarifa del producto"
                value={tariff}
                onChange={(e) => setTariff(e.target.value)}
                required
                className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="formColors"
                className="block text-sm font-medium text-gray-700"
              >
                <strong>Colores</strong>
              </label>
              <input
                id="formColors"
                type="text"
                placeholder="Ingrese color"
                className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddColor(e.target.value);
                    e.target.value = "";
                  }
                }}
              />
              <ul className="mt-2">
                {colors.map((color, index) => (
                  <li key={index} className="flex items-center justify-between">
                    {color}
                    <button
                      type="button"
                      onClick={() => handleRemoveColor(color)}
                      className="text-red-500 ml-2"
                    >
                      Eliminar
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-6">
              <label
                htmlFor="formSizes"
                className="block text-sm font-medium text-gray-700"
              >
                <strong>Talles</strong>
              </label>
              <input
                id="formSizes"
                type="text"
                placeholder="Ingrese talle"
                className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddSize(e.target.value);
                    e.target.value = "";
                  }
                }}
              />
              <ul className="mt-2">
                {sizes.map((size, index) => (
                  <li key={index} className="flex items-center justify-between">
                    {size}
                    <button
                      type="button"
                      onClick={() => handleRemoveSize(size)}
                      className="text-red-500 ml-2"
                    >
                      Eliminar
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <button
              type="button"
              onClick={handleDateProduct}
              className="bg-botonVerde text-white font-bold py-2 px-6 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Guardar
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default NewProduct;
