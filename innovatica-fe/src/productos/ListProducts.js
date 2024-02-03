import React, { useState, useEffect } from 'react';
import './ProductoStyle.css';
import AgregarProducto from './AgregarProducto';

export const ListProducts = () => {
  const [showForm, setShowForm] = useState(false); 
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleShowForm = () => {
    setShowForm(true);
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


  const handlerOnAddSuccess = () => {
    fetchData();
    setShowForm(false);
  }

  return (
    <div>
      <h1>Productos</h1>
      {!showForm && (
        <button onClick={handleShowForm}>Nuevo Producto</button>
      )}
      {showForm && <AgregarProducto onAddSuccess={handlerOnAddSuccess}/>}
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
                </tr>
            </thead>
            <tbody>
                {productos.map(producto => (
                <tr key={producto.nombre}>
                    <td>{producto.nombre}</td>
                    <td>{producto.estado}</td>
                </tr>
                ))}
            </tbody>
            </table>
            )}
            </div>)}
      </div>
  );
}
