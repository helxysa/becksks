import { defineStore } from "pinia";

export const useProfileStore = defineStore("profileUser", {
  state: () => ({
    id: 0,
    nome: "",
    cargo: "",
    setor: "",
    email: "",
    createdAt: "",
    updatedAt: "",
    passwordExpiredAt: "",
    passwordResetToken: null,
    passwordChanged: false,
    profile: {
      id: 0,
      name: "",
      permissions: [],
    },
  }),
  persist: {
    enabled: true,
    strategies: [
      {
        key: "profileUser",
        storage: localStorage,
      },
    ],
  },
  getters: {
    hasPasswordChanged(state) {
      return state.passwordChanged;
    },
  },
  actions: {
    updateProfile(userData) {
      this.$patch(userData);
    },
    resetProfile() {
      this.$reset();
    },
    setPasswordChanged(value) {
        this.passwordChanged = value;
        // Atualiza manualmente o localStorage
        const updatedState = JSON.stringify(this.$state);
        localStorage.setItem("profileUser", updatedState);
      }

  },
});
