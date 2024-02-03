import React, { useState } from 'react';

function EditarProducto({choosedProduct, onAddSuccess}) {
    const [formData, setFormData] = useState({
        nombre: choosedProduct.fields.nombre,
        estado: choosedProduct.fields.estado,
        categoria: choosedProduct.fields.categoria,
        imagen: choosedProduct.fields.imagen
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
          const response = await fetch(`http://localhost:8080/productos/update_product/${choosedProduct.pk}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
          });
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          // Clear the form data
          setFormData({
            nombre: '',
            estado: '',
            categoria: '',
            imagen: ''
          });
          // Call the onAddSuccess function passed from the parent component
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
                <input type="text" id="imagen" name="imagen" value={formData.imagen} onChange={handleChange} />
            </div>
            <button type="submit">Editar Producto</button>
            </form>
            <button style={{marginTop: '5px'}} onClick={onAddSuccess}>Atras</button>
        </div>
      );
};

export default EditarProducto;