import axios from "axios";

let refresh = false;

axios.interceptors.response.use(
  (resp) => resp,
  async (error) => {
    if (error.response.status === 401 && !refresh) {
      refresh = true;
      console.log(localStorage.getItem('refresh_token'));
      try {
        const response = await axios.post(
          'http://localhost:8000/token/refresh/',
          { refresh: localStorage.getItem('refresh_token') },
          {
            headers: {
              'Content-Type': 'application/json'
            },
            withCredentials: true
          }
        );
        if (response.status === 200) {
          axios.defaults.headers.common['Authorization'] = `Bearer ${response.data['access']}`;
          localStorage.setItem('access_token', response.data.access);
          localStorage.setItem('refresh_token', response.data.refresh);
          refresh = false;
          return axios(error.config);
        }
      } catch (refreshError) {
        console.error('Error occurred during token refresh:', refreshError);
        refresh = false;
        // Handle token refresh error appropriately
        // e.g., redirect to login page, display error message, etc.
      }
    }
    refresh = false;
    return Promise.reject(error);
  }
);

export default axios;