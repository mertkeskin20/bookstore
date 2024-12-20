import { defineStore } from "pinia";
import axios from "axios";

export const useAuthStore = defineStore("authStore", {
  state: () => ({
    user: null,
  }),

  getters: {
    isLoggedIn: (state) => {
      return !!state.user;
    },
  },

  actions: {
    async register(newUserData) {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/v1/auth/register",
          newUserData
        );
        return response.data;
      } catch (error) {
        throw error.response.data;
      }
    },

    async login(userData) {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/v1/auth/login",
          userData
        );
        this.user = response.data.user;
        localStorage.setItem("user", JSON.stringify(response.data.user));
      } catch (error) {
        console.log("error at login user: ", error);
      }
    },
    logout() {
      this.user = null;
      localStorage.removeItem("user");
      location.reload();
    },
  },
});
