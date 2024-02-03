import React, { useState, useEffect } from 'react';
import '../productos/ProductoStyle.css';
import Editarusuarios from '../productos/EditarProducto';
import AddUser from './AddUser';

export const ListUsers = () => {
  const [showForm, setShowForm] = useState(false);
  const [showFormEdit, setShowFormEdit] = useState(false); 
  const [usuarios, setUsuarios] = useState([]);
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
      console.log('Current at:' + localStorage.getItem('access_token'));
      console.log(localStorage)
        try {
        const response = await fetch('http://localhost:8080/usuarios/get_all_users/');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data);
        setUsuarios(data);
        setLoading(false);
        } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data');
        setLoading(false);
        }
    };

    const handleStatusButton = (status, pk, event) => {
        console.log(status, pk)
        const updateUserStatus = async (status, pk) => {
            try {
                const response = await fetch('http://localhost:8080/usuarios/update_status/', {
                    method: 'PUT',
                    headers: {
                    'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({"pk": pk, "status": status}),
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log(data);
            } catch (error) {
                console.error('Error occurred during login:', error);
              }
        }
        updateUserStatus(status, pk).then( () => fetchData());

    }   

  const handlerOnAddSuccess = () => {
    fetchData();
    setShowForm(false);
    setShowFormEdit(false);
    setCurrentProduct(null);

  }

  return (
    <div>
      <h1>Usuarios</h1>
      {!showForm && !showFormEdit && (
        <button onClick={handleShowForm}>Nuevo usuarios</button>
      )}
      {showFormEdit && !showForm && <Editarusuarios choosedProduct={currentProduct} onAddSuccess={handlerOnAddSuccess}/>}
      {showForm && !showFormEdit && <AddUser onAddSuccess={handlerOnAddSuccess}/>}
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
                <th>Username</th>
                <th>Activo</th>
                <th>Root</th>
                <th>Email</th>
                </tr>
            </thead>
            <tbody>
                {usuarios.map(usuarios => (
                <tr key={usuarios.pk}>
                    <td>{usuarios.fields.username}</td>
                    <td>{usuarios.fields.is_active ? ( <span>Si</span> ) : ( <span>No</span> )}</td>
                    <td>{usuarios.fields.is_superuser ? ( <span>Si</span> ) : ( <span>No</span> )}</td>
                    <td>{usuarios.fields.email}</td>
                    {localStorage.getItem('access_token') && (
                        <td> 
                            {usuarios.fields.is_active ? ( 
                                <button onClick={(event) => handleStatusButton('t', usuarios.pk)}>Desactivar</button> 
                            ) : ( 
                                <button onClick={(event) => handleStatusButton('f', usuarios.pk)}>Activar</button> 
                            )
                            }
                        </td>
                    )}
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
