import axios from "axios";
import { useState } from "react";

export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const submit = async e => {
    e.preventDefault();
    const user = {
      username: username,
      password: password
    };

    try {
      const { data } = await axios.post(
        'http://localhost:8080/authentification/token/',
        user,
        {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true
        }
      );
      localStorage.setItem('access_token', data.access);
      localStorage.setItem('refresh_token', data.refresh);
      localStorage.setItem('user_id', data.user_id);
      localStorage.setItem('username', data.username);
      localStorage.setItem('is_superuser', data.is_superuser);
      axios.defaults.headers.common['Authorization'] = `Bearer ${data['access']}`;
      window.location.href = '/all'; // Redirect to homepage after successful login
    } catch (error) {
      alert("Usuario no activo o credenciales invalidas");
      console.error('Error occurred during login:', error);
    }
  };

  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={submit}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In</h3>
          <div className="form-group mt-3">
            <label>Username</label>
            <input
              className="form-control mt-1"
              placeholder="Enter Username"
              name='username'
              type='text'
              value={username}
              required
              onChange={e => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              name='password'
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
              value={password}
              required
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">Submit</button>
          </div>
        </div>
      </form>
    </div>
  );
};
