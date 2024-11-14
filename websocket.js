import { io } from 'socket.io-client';
import { toast } from "vue3-toastify";

const API_URL = import.meta.env.VITE_APP_API_URL || 'http://localhost:3333';
// Configurações do socket.io-client
const socket = io(API_URL, {
  transports: ['websocket'], // Usa somente WebSocket
  reconnectionAttempts: 3, // Tentativas de reconexão
  timeout: 10000, // Timeout de 10 segundos
});

socket.on('connect', () => {
  console.log('Conectado ao WebSocket:', socket.id);
});

socket.on('medicao:update', (data) => {
  console.log('Notificação recebida:', data);
  // Exibir notificação para o usuário
  toast.info(data.message, {
    timeout: 5000,
    closeOnClick: true,
  });
});

socket.on('disconnect', () => {
  console.log('Desconectado do WebSocket');
});

socket.on('connect_error', (error) => {
  console.error('Erro ao conectar ao WebSocket:', error);
});

export default socket;
