<template>
  <div class="w-full">
    <h2 class="text-[1.8rem] font-medium text-gray-800 mb-6">Anexos</h2>

    <div class="file-input-wrapper w-full">
      <label
        class="w-full flex flex-col items-center justify-center border-2 border-[#3498db] rounded-lg p-5 text-center cursor-pointer transition-all duration-300 ease-in-out bg-[#f8fafc] hover:bg-[#e3f2fd] hover:shadow-[0_4px_12px_rgba(52,152,219,0.2)] hover:-translate-y-0.5 transform"
        @dragover.prevent
        @dragleave.prevent
        @drop.prevent="handleDrop"
      >
        <div class="text-[2.5rem] text-[#3498db] mb-3">📤</div>
        <span>Arraste ou clique para escolher um arquivo</span>
        <div class="text-sm text-gray-600 mt-3 font-light">
          {{ selectedFile ? selectedFile.name : 'Nenhum arquivo selecionado' }}
        </div>
        <input
          type="file"
          ref="fileInput"
          class="hidden"
          @change="handleFileSelect"
          accept=".pdf,.doc,.docx,.xlsx,.csv,.jpg,.png,.zip,.rar"
        />
      </label>
    </div>

    <div v-if="successMessage" class="mt-4 text-[#2ecc71] font-medium animate-fadeInOut">
      {{ successMessage }}
    </div>
    <div v-if="errorMessage" class="mt-4 text-red-500 font-medium">
      {{ errorMessage }}
    </div>

    <div class="attached-files mt-8">
      <h3 class="text-xl font-semibold mb-4">Documentos Anexados</h3>
      <div v-if="anexos.length" class="flex flex-col gap-3 w-full">
        <div
          v-for="(anexo, index) in anexos"
          :key="anexo.id"
          class="bg-[#f1f8ff] rounded-lg py-3 px-4 flex justify-between items-center transition-all duration-300 ease-in-out transform hover:bg-[#e3f2fd] hover:translate-x-[5px]"
        >
          <div class="flex items-center gap-2 w-full">
            <div v-if="!anexo.isEditing" class="flex items-center gap-2 w-full">
              <a
                :href="anexo.file_url"
                target="_blank"
                class="text-[#3498db] no-underline font-normal flex-grow"
              >
                {{ anexo.fileName }}
              </a>
            </div>
            <div v-else class="flex items-center gap-2 w-full">
              <input
                v-model="anexo.newFileName"
                type="text"
                class="border rounded px-2 py-1 text-base w-full h-[36px] font-sans"
                placeholder="Novo nome do arquivo"
              />
              <button
                @click="updateFileName(anexo)"
                class="text-green-500 hover:text-green-700 transition duration-200 ease-in-out transform hover:scale-110 text-[1.25rem]"
              >
                ✔️
              </button>
              <button
                @click="cancelEditing(anexo)"
                class="text-red-500 hover:text-red-700 transition duration-200 ease-in-out transform hover:scale-110 text-base"
              >
                ❌
              </button>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <button
              v-if="!anexo.isEditing"
              @click="startEditing(anexo)"
              class="text-gray-500 hover:text-gray-700 transition duration-200 ease-in-out transform hover:scale-110 text-base text-[1.25rem]"
            >
              ✏️
            </button>
            <button
              v-if="!anexo.isEditing"
              @click="deleteFile(anexo.id)"
              class="text-[#e74c3c] hover:text-[#c0392b] transition duration-200 ease-in-out transform hover:scale-110 text-[2.5rem]"
            >
              &times;
            </button>
          </div>
        </div>
      </div>
      <div v-else class="text-gray-600">Nenhum documento anexado.</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { api } from '@/services/api';

const selectedFile = ref(null);
const anexos = ref([]);
const successMessage = ref('');
const errorMessage = ref('');

const props = defineProps({
  contratoId: {
    type: Number,
    required: true,
  },
});

const handleFileSelect = (event) => {
  selectedFile.value = event.target.files[0];
  uploadFile();
};

const handleDrop = (event) => {
  selectedFile.value = event.dataTransfer.files[0];
  uploadFile();
};

const uploadFile = async () => {
  if (!selectedFile.value) {
    errorMessage.value = 'Selecione um arquivo antes de enviar.';
    return;
  }

  const formData = new FormData();
  formData.append('file', selectedFile.value);

  try {
    await api.post(`/contratos/${props.contratoId}/anexos`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    successMessage.value = 'Arquivo enviado com sucesso!';
    errorMessage.value = '';
    fetchAnexos();
    selectedFile.value = null;
    setTimeout(() => {
      successMessage.value = '';
    }, 3000);
  } catch (error) {
    errorMessage.value = 'Erro ao enviar o arquivo. Tente novamente.';
    successMessage.value = '';
  }
};

const fetchAnexos = async () => {
  try {
    const response = await api.get(`/contratos/${props.contratoId}/anexos`);
    anexos.value = response.data.anexos.map((anexo) => ({
      ...anexo,
      isEditing: false,
      newFileName: '',
    }));
  } catch (error) {
    errorMessage.value = 'Erro ao carregar os anexos.';
  }
};

const deleteFile = async (id) => {
  try {
    await api.delete(`/contratos/${props.contratoId}/anexos/${id}`);
    successMessage.value = 'Arquivo excluído com sucesso!';
    fetchAnexos();
    setTimeout(() => {
      successMessage.value = '';
    }, 3000);
  } catch (error) {
    errorMessage.value = 'Erro ao excluir o arquivo.';
  }
};

const startEditing = (anexo) => {
  anexo.isEditing = true;
  anexo.newFileName = anexo.fileName;
};

const cancelEditing = (anexo) => {
  anexo.isEditing = false;
  anexo.newFileName = '';
};

const updateFileName = async (anexo) => {
  if (!anexo.newFileName.trim()) {
    errorMessage.value = 'O nome do arquivo não pode ser vazio.';
    return;
  }

  try {
    await api.put(`/contratos/${props.contratoId}/anexos/${anexo.id}`, {
      file_name: anexo.newFileName,
    });
    anexo.fileName = anexo.newFileName;
    anexo.isEditing = false;
    anexo.newFileName = '';
    successMessage.value = 'Nome do arquivo atualizado com sucesso!';
    errorMessage.value = '';
    setTimeout(() => {
      successMessage.value = '';
    }, 3000);
  } catch (error) {
    errorMessage.value = 'Erro ao atualizar o nome do arquivo.';
    successMessage.value = '';
  }
};

onMounted(() => {
  fetchAnexos();
});
</script>

<style>
@keyframes fadeInOut {
  0%,
  100% {
    opacity: 0;
  }
  10%,
  90% {
    opacity: 1;
  }
}

.animate-fadeInOut {
  animation: fadeInOut 3s ease;
}
</style>
