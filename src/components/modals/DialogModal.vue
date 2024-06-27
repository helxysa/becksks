<template>
    <Modal
    :show="show"
    :max-width="maxWidth"
    :closeable="closeable"
    @close="close"
    :withouHeader="withoutHeader"
    :modalTitle="modalTitle"
>
    <div class="px-6 py-4">
        <div class="mt-2">
            <slot name="content" />
        </div>
    </div>

    <div :class="showFooter && 'flex flex-row justify-end px-6 py-4 bg-gray-100 text-right'">
        <slot name="footer" />
    </div>
</Modal>

</template>

<script setup >
import Modal from './Modal.vue';

const emit = defineEmits(['close']);

defineProps({
    show: {
        type: Boolean,
        default: false,
    },
    maxWidth: {
        type: String,
        default: '2xl',
    },
    closeable: {
        type: Boolean,
        default: true,
    },
    showFooter: {
        type: Boolean,
        default: true,
    },
    modalTitle: String,
});

const close = () => {
    emit('close');
};


</script>

<style scoped>

</style>
