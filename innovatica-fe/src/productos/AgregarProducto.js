import React, { useState } from 'react';

function AgregarProducto({ onAddSuccess }) {
  const [formData, setFormData] = useState({
    nombre: '',
    estado: '',
    categoria: '',
    imagen: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/productos/insert_product/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      setFormData({
        nombre: '',
        estado: '',
        categoria: '',
        imagen: ''
      });
      onAddSuccess();
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <div>
        <form onSubmit={handleSubmit}>
        <div>
            <label htmlFor="nombre">Nombre:</label>
            <input type="text" id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} required/>
        </div>
        <div>
            <label htmlFor="estado">Estado:</label>
            <input type="text" id="estado" name="estado" value={formData.estado} onChange={handleChange} required/>
        </div>
        <div>
            <label htmlFor="categoria">Categoría:</label>
            <input type="text" id="categoria" name="categoria" value={formData.categoria} onChange={handleChange} required/>
        </div>
        <div>
            <label htmlFor="imagen">Imagen URL:</label>
            <input type="text" id="imagen" name="imagen" alt={formData.nombre} value={formData.imagen} onChange={handleChange} />
        </div>
        <button type="submit">Agregar Producto</button>
        </form>
        <button style={{marginTop: '5px'}} onClick={onAddSuccess}>Atras</button>
    </div>
  );
}

export default AgregarProducto;
