import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:3000" : "";

// Configure axios to include credentials (cookies)
axios.defaults.withCredentials = true;

export const useAuthStore = create((set, get) => ({
  user: null,
  loading: false,
  error: null,
  isAuthenticated: false,

  // Auth form data
  authFormData: {
    username: "",
    email: "",
    password: "",
  },

  setAuthFormData: (formData) => set({ authFormData: formData }),
  resetAuthForm: () => set({ authFormData: { username: "", email: "", password: "" } }),

  register: async (e) => {
    e.preventDefault();
    set({ loading: true, error: null });

    try {
      const { authFormData } = get();
      const response = await axios.post(`${BASE_URL}/api/auth/register`, authFormData);
      
      set({ 
        user: response.data.user, 
        isAuthenticated: true,
        error: null 
      });
      
      get().resetAuthForm();
      toast.success(response.data.message);
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Registration failed";
      set({ error: errorMessage });
      toast.error(errorMessage);
    } finally {
      set({ loading: false });
    }
  },

  login: async (e) => {
    e.preventDefault();
    set({ loading: true, error: null });

    try {
      const { authFormData } = get();
      const response = await axios.post(`${BASE_URL}/api/auth/login`, {
        email: authFormData.email,
        password: authFormData.password,
      });
      
      set({ 
        user: response.data.user, 
        isAuthenticated: true,
        error: null 
      });
      
      get().resetAuthForm();
      toast.success(response.data.message);
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Login failed";
      set({ error: errorMessage });
      toast.error(errorMessage);
    } finally {
      set({ loading: false });
    }
  },

  logout: async () => {
    set({ loading: true });

    try {
      await axios.post(`${BASE_URL}/api/auth/logout`);
      set({ 
        user: null, 
        isAuthenticated: false,
        error: null 
      });
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error("Logout failed");
    } finally {
      set({ loading: false });
    }
  },

  checkAuth: async () => {
    set({ loading: true });

    try {
      const response = await axios.get(`${BASE_URL}/api/auth/profile`);
      set({ 
        user: response.data.user, 
        isAuthenticated: true,
        error: null 
      });
    } catch (error) {
      set({ 
        user: null, 
        isAuthenticated: false,
        error: null 
      });
    } finally {
      set({ loading: false });
    }
  },
}));
