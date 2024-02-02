import React, { useState, useEffect } from 'react';
import './ProductoStyle.css';
import DeleteButton from './DeleteButton';
import EditarProducto from './EditarProducto';
import AgregarProducto from './AgregarProducto';

function App() {
  const [showForm, setShowForm] = useState(false);
  const [showFormEdit, setShowFormEdit] = useState(false); 
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentProduct, setCurrentProduct] = useState(null);

  const handleShowForm = () => {
    setShowForm(true);
  };

  const handleShowFormEdit = (product, event) => {
    setCurrentProduct(product);
    setShowFormEdit(true);
  };

  useEffect(() => {
    fetchData();
  }, []);

    const fetchData = async () => {
        try {
        const response = await fetch('http://localhost:8080/productos/');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProductos(data);
        setLoading(false);
        } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data');
        setLoading(false);
        }
    };


  const handleDeleteSuccess = () => {
    fetchData();
  }

  const handlerOnAddSuccess = () => {
    fetchData();
    setShowForm(false);
    setShowFormEdit(false);
    setCurrentProduct(null);

  }

  return (
    <div>
      <h1>Productos</h1>
      {!showForm && !showFormEdit && (
        <button onClick={handleShowForm}>Nuevo Producto</button>
      )}
      {showFormEdit && !showForm && <EditarProducto choosedProduct={currentProduct} onAddSuccess={handlerOnAddSuccess}/>}
      {showForm && !showFormEdit && <AgregarProducto onAddSuccess={handlerOnAddSuccess}/>}
      {!showFormEdit && (
        <div>
        {!showForm && (
        <div>
        {loading && <div>Loading...</div>}
        {error && <div>Error: {error}</div>}
        {!loading && !error && (
            <table>
            <thead>
                <tr>
                <th>Nombre</th>
                <th>Estado</th>
                <th>Categoría</th>
                <th>Imagen</th>
                <th>Acciones</th>
                <th></th>
                </tr>
            </thead>
            <tbody>
                {productos.map(producto => (
                <tr key={producto.pk}>
                    <td>{producto.fields.nombre}</td>
                    <td>{producto.fields.estado}</td>
                    <td>{producto.fields.categoria}</td>
                    <td><img src={producto.fields.imagen} style={{ width: '100px' }} /></td>
                    <td>
                        <DeleteButton productId={producto.pk}  onDeleteSuccess={handleDeleteSuccess}/>
                        {!showForm && (
                            <button onClick={(event) => handleShowFormEdit(producto)}>Editar</button>
                        )}
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        )}
        </div>
        )}
        </div>
        )}
    </div>
  );
            }
export default App;
