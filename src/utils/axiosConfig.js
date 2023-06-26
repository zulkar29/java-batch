import axios from "axios";

const instance = axios.create({
  baseURL:
    import.meta.env.VITE_ROOT_URL || "https://zulkar.me/api",
});


// Add an interceptor to handle 401 responses
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status == 401) {
      localStorage.removeItem('bjitToken');
      window.location.replace('/login');
    }
    return Promise.reject(error);
  }
);

export default instance;


