import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import React, { useState, useEffect} from 'react';
import './navigationCss.css';

export function Navigation() {
   const [isAuth, setIsAuth] = useState(false);
   useEffect(() => {
     if (localStorage.getItem('access_token') !== null) {
        setIsAuth(true); 
      }
    }, [isAuth]);
     return ( 
      <div>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="/users">Usuarios</Navbar.Brand>            
          <Nav className="me-auto"> 
          {isAuth ? <Nav.Link href="/all">Productos</Nav.Link> : 
                    <Nav.Link href="/">Productos</Nav.Link>}
          </Nav>
          <Nav>
          {isAuth ? <Nav.Link href="/logout">Logout</Nav.Link> :  
                    <Nav.Link href="/login">Login</Nav.Link>}
           {isAuth ? 
            <span style={{float: 'right', marginRight: '10px', color: 'white'}}>
              {localStorage.getItem('username')}{localStorage.getItem('is_superuser') === 'true' && <span>(root)</span>}
            </span> 
            : 
            <span style={{float: 'right', marginRight: '10px', color: 'white'}}
              >Anonymous User
            </span>
          }
          </Nav>
        </Navbar>
       </div>
     );
}