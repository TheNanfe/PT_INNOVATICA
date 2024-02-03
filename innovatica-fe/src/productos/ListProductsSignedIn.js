import React, { useState, useEffect } from 'react';
import './ProductoStyle.css';
import DeleteButton from './DeleteButton';
import EditarProducto from './EditarProducto';
import AgregarProducto from './AgregarProducto';

export const ListProductsSignedIn = () => {
  const [showForm, setShowForm] = useState(false);
  const [showFormEdit, setShowFormEdit] = useState(false); 
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [filter, setFilter] = useState('');
  const [filteredProductos, setFilteredProductos] = useState([]);

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
      const response = await fetch('http://localhost:8080/productos/all/', {
        headers: {Authorization: 'Bearer ' + localStorage.getItem('access_token')}
      });
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

  const handleFilterChange = event => {
    setFilter(event.target.value);
  };

  const handleFormSubmit = async event => {
    event.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/productos/get_product_by_filter/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json', Authorization: 'Bearer ' + localStorage.getItem('access_token')
            },
            body: JSON.stringify(filter)
        });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log(data);
      setProductos(data);
      setFilteredProductos(data);
    } catch (error) {
      console.error('Error filtering products:', error);
      setError('Error filtering products');
    }
  };

  return (
    <div>
      <h1>Productos</h1>
      <div>
        {!showFormEdit && !showForm && (
          <form onSubmit={handleFormSubmit}>
          <input type="text" placeholder="Filter" value={filter} onChange={handleFilterChange} />
          <button type="submit">Enviar</button>
          <button onClick={handlerOnAddSuccess} style={{marginLeft: '10px'}}>Limpiar Filtro</button>
        </form>
         )}
      </div>
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
            <div>
            <table>
            <thead>
                <tr>
                <th>Nombre</th>
                <th>Estado</th>
                <th>Categoría</th>
                <th>Imagen</th>
                <th>Acciones</th>
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
            </div>
        )}
        </div>
        )}
        </div>
        )}
    </div>
  );
};
