import { defineStore } from "pinia";

export  const useProfileStore = defineStore('profileUser', {
    state: () => (
        {
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
        permissions: [
         
        ]
    }
        }
    ),
    persist: {
        enabled: true,
        strategies: [
            {
                key: 'profileUser', //o nome do seu store
                storage: localStorage, // onde você quer salvar localStorage ou sessionStorage
            },
        ],
    },
}
    
)