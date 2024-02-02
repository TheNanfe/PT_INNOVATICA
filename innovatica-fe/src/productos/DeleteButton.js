import React from 'react';

function DeleteButton(props) {

    const deleteProduct = async () => {
        try {
        const response = await fetch(`http://localhost:8080/productos/delete_product/${props.productId}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        props.onDeleteSuccess();
        // Optionally, you can handle the response data here if needed
        } catch (error) {
        console.error('Error deleting product:', error);
        }
    };

    return (
        <button style={{ backgroundColor: 'red' }} onClick={deleteProduct}>
        Eliminar
        </button>
    );
}

export default DeleteButton;
