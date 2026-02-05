// src/context/authStore.js
import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: null,
  loading: false,
  error: null,

  // REGISTER
  register: async (data) => {
    set({ loading: true, error: null });
    try {
      const res = await fetch("http://localhost:8090/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // send cookies/session
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const errMsg = await res.text();
        throw new Error(errMsg || "Registration failed");
      }
      const user = await res.json();
      set({ user, loading: false });
      return user;
    } catch (err) {
      set({ error: err.message, loading: false });
      return null;
    }
  },

  // LOGIN
  login: async (data) => {
    set({ loading: true, error: null });
    try {
      const res = await fetch("http://localhost:8090/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const errMsg = await res.text();
        throw new Error(errMsg || "Login failed");
      }
      const user = await res.json();
      set({ user, loading: false });
      return user;
    } catch (err) {
      set({ error: err.message, loading: false });
      return null;
    }
  },

  // GET CURRENT USER
  fetchUser: async () => {
    set({ loading: true, error: null });
    try {
      const res = await fetch("http://localhost:8090/auth/me", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      if (!res.ok) {
        const errMsg = await res.text();
        throw new Error(errMsg || "Failed to fetch user");
      }
      const user = await res.json();
      set({ user, loading: false });
      return user;
    } catch (err) {
      set({ error: err.message, loading: false });
      return null;
    }
  },

  // LOGOUT
  logout: async () => {
    set({ loading: true, error: null });
    try {
      const res = await fetch("http://localhost:8090/auth/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      if (!res.ok) {
        const errMsg = await res.text();
        throw new Error(errMsg || "Logout failed");
      }
      set({ user: null, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },
}));
