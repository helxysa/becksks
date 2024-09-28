<template>
  <button
    type="button"
    @click="$emit('update:currentTab', tab)"
    :class="[buttonClass, 'px-4 py-2 focus:outline-none transition-colors duration-200']"
  >
    {{ tab }}
  </button>
</template>

<script setup>
  import { computed } from 'vue';

  const props = defineProps({
    tab: {
      type: String,
      required: true,
    },
    currentTab: {
      type: String,
      required: true,
    },
  });

  const buttonClass = computed(() => {
    return props.currentTab === props.tab
      ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-100 rounded-t-lg'
      : 'hover:bg-gray-100';
  });
  </script>
