<template>
  <div class="w-full mt-6">
    <h2 class="font-bold text-3xl mb-6">Anexos :</h2>

    <div v-if="!isViewOnly" class="file-input-wrapper w-full">
      <label
        class="w-full flex flex-col items-center justify-center border-2 border-[#3498db] rounded-lg p-5 text-center cursor-pointer transition-all duration-300 ease-in-out bg-[#f8fafc] hover:bg-[#e3f2fd] hover:shadow-[0_4px_12px_rgba(52,152,219,0.2)] hover:-translate-y-0.5 transform"
        @dragover.prevent
        @dragleave.prevent
        @drop.prevent="handleDrop"
      >
        <div class="text-[2.5rem] text-[#3498db] mb-3">📤</div>
        <span>Arraste ou clique para escolher um arquivo</span>
        <div class="text-sm text-gray-600 mt-3 font-light">
          {{ selectedFiles ? selectedFiles.name : 'Nenhum arquivo selecionado' }}
        </div>
        <input
          type="file"
          ref="fileInput"
          class="hidden"
          @change="handleFileSelect"
          multiple
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
                :href="convertUrl(anexo.file_url)"
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
                type="button"
                @click="updateFileName(anexo)"
                class="text-green-500 hover:text-green-700 transition duration-200 ease-in-out transform hover:scale-110 text-[1.25rem]"
              >
                ✔️
              </button>
              <button
                type="button"
                @click="cancelEditing(anexo)"
                class="text-red-500 hover:text-red-700 transition duration-200 ease-in-out transform hover:scale-110 text-base"
              >
                ❌
              </button>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <div class="flex items-center gap-2" v-if="!isViewOnly">
              <button
                type="button"
                v-if="!anexo.isEditing"
                @click="startEditing(anexo)"
                class="text-gray-500 hover:text-gray-700 transition duration-200 ease-in-out transform hover:scale-110 text-base text-[1.25rem] mt-[2px]"
              >
                ✏️
              </button>
              <button
                type="button"
                v-if="!anexo.isEditing"
                @click="deleteFile(anexo.id)"
                class="text-[#e74c3c] hover:text-[#c0392b] transition duration-200 ease-in-out transform hover:scale-110 text-[2.5rem] mt-[2px]"
              >
                &times;
              </button>
          </div>
            <button
              type="button"
              v-if="!anexo.isEditing"
              @click.prevent="downloadAnexo(anexo)"
              title="Download"
              aria-label="Download Anexo"
            >
            <Icon icon="material-symbols:download-rounded" width="19" class="text-[#3498db] hover:text-[#2980b9] transition duration-200 ease-in-out transform hover:scale-110 text-[2.5rem]"/>
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
import { Icon } from '@iconify/vue';
import Swal from 'sweetalert2';

const selectedFiles = ref(null);
const anexos = ref([]);
const successMessage = ref('');
const errorMessage = ref('');

const props = defineProps({
  resourceId: {
    type: Number,
    required: true,
  },
  variant: {
    type: String,
    required: true,
    validator: value => ['contrato', 'medicao', 'faturamento', 'pj'].includes(value)
  },
  isViewOnly: {
    type: Boolean,
    default: false
  }
});

const  convertUrl = (fileUrl) => {
   if (String(fileUrl).includes('https')) {
       return fileUrl
   } else {
     return  'https://api-boss.msbtec.app' + fileUrl
   }
}

const handleFileSelect = (event) => {
  selectedFiles.value = Array.from(event.target.files);
  uploadFiles();
};

const handleDrop = (event) => {
  selectedFiles.value = Array.from(event.dataTransfer.files);
  uploadFiles();
};

const uploadFiles = async () => {
  if (selectedFiles.value.length === 0) {
    errorMessage.value = 'Selecione um ou mais arquivos antes de enviar.';
    return;
  }

  if (!props.resourceId) {
    errorMessage.value = 'O ID do recurso não foi fornecido.';
    return;
  }

  let variantUrl = getVariantUrl();

  for (const file of selectedFiles.value) {
    const formData = new FormData();
    formData.append('file', file);

    try {
      if (!props.resourceId) {
        const novoAnexo = {
          id: Date.now(),
          file: file,
          fileName: file.name,
          file_url: URL.createObjectURL(file),
          isEditing: false,
          newFileName: '',
        };
        props.localAnexos.push(novoAnexo);
      } else {
        await api.post(`/${variantUrl}/${props.resourceId}/anexos`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        successMessage.value = `Arquivo "${file.name}" enviado com sucesso!`;
      }
    } catch (error) {
      errorMessage.value = `Erro ao enviar o arquivo "${file.name}". Tente novamente.`;
    }
  }

  selectedFiles.value = [];
  fetchAnexos();
  setTimeout(() => {
    successMessage.value = '';
  }, 3000);
};

const fetchAnexos = async () => {
  try {
    let variantUrl = getVariantUrl();

    const response = await api.get(`/${variantUrl}/${props.resourceId}/anexos`);

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
  const result = await Swal.fire({
    title: 'Tem certeza?',
    text: 'Esta ação irá deletar o anexo permanentemente.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#e74c3c',
    cancelButtonColor: '#3498db',
    confirmButtonText: 'Sim, deletar!',
    cancelButtonText: 'Cancelar',
  }).then(async (result)=>{
    if (result.isConfirmed){
      try {
        let variantUrl = getVariantUrl()

        await api.delete(`/${variantUrl}/anexos/${id}`);
        successMessage.value = 'Arquivo excluído com sucesso!';
        fetchAnexos();
        setTimeout(() => {
          successMessage.value = '';
        }, 3000);
      } catch (error) {
        errorMessage.value = 'Erro ao excluir o arquivo.';
      }
    }
  })


};

const downloadAnexo = async (anexo) => {
  try {
    const fileUrl = convertUrl(anexo.file_url);

    const response = await fetch(fileUrl);
    if (!response.ok) {
      throw new Error('Erro ao baixar o arquivo');
    }
    const blob = await response.blob();

    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = anexo.fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
  } catch (error) {
    console.error('Erro ao baixar o anexo:', error);
    errorMessage.value = 'Erro ao baixar o anexo. Tente novamente.';
    setTimeout(() => {
      errorMessage.value = '';
    }, 3000);
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
  let variantUrl = getVariantUrl();
  try {
    await api.put(`/${variantUrl}/${props.resourceId}/anexos/${anexo.id}`, {
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

const getVariantUrl = () => {
  switch (props.variant) {
    case 'contrato':
      return 'contratos';
    case 'medicao':
      return 'medicao';
    case 'faturamento':
      return 'faturamento';
    case 'pj':
      return 'pj';
    default:
      return '';
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
