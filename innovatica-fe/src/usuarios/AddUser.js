import React, { useState } from 'react';

function AddUser({ onAddSuccess }) {
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
      const response = await fetch('http://localhost:8080/usuarios/create_user/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', Authorization: 'Bearer ' + localStorage.getItem('access_token')
        },
        body: JSON.stringify(formData)
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      // Clear the form data
      setFormData({
        username: '',
        password: '',
        email: ''
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
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} required/>
        </div>
        <div>
            <label htmlFor="estado">Contraseña:</label>
            <input type="hash" id="password" name="password" value={formData.password} onChange={handleChange} required/>
        </div>
        <div>
            <label htmlFor="email">Email:</label>
            <input type="text" id="email" name="email" value={formData.email} onChange={handleChange} required/>
        </div>
        <button type="submit">Agregar Usuario</button>
        </form>
        <button style={{marginTop: '5px'}} onClick={onAddSuccess}>Atras</button>
    </div>
  );
}

export default AddUser;
