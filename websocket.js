import { io } from 'socket.io-client';
import { toast } from "vue3-toastify";
import { ref } from 'vue';

const API_URL = import.meta.env.VITE_APP_API_URL || 'http://localhost:3333';
// Configurações do socket.io-client
const socket = io(API_URL, {
  transports: ['websocket'],
  reconnectionAttempts: 3,
  timeout: 10000,
});

export const notificacoes = ref([]);

socket.on('connect', () => {
  // console.log('Conectado ao WebSocket:', socket.id);
});

socket.on('medicao:update', (data) => {
  // Adicionar notificação na lista
  notificacoes.value.push({
    id: data.id,
    texto: `O status da medição ${data.id} foi alterado para: <strong>${data.status}</strong>.`,
    tipo: 'medicao',
    contratoId: data.contratoId,
  });
});

socket.on('disconnect', () => {
  console.log('WS desconectado');
});

socket.on('connect_error', (error) => {
  console.error('Erro ao conectar ao WS:', error);
});

export default socket;
