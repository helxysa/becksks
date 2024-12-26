<template>
    <teleport to="body">
        <transition leave-active-class="duration-200">
            <div
                v-show="show"
                :class="['fixed inset-0 px-4 py-6 sm:px-0 z-50', centered ? 'flex items-center justify-center' : 'overflow-y-auto']"
                scroll-region
            >
                <transition
                    enter-active-class="ease-out duration-300"
                    enter-from-class="opacity-0"
                    enter-to-class="opacity-100"
                    leave-active-class="ease-in duration-200"
                    leave-from-class="opacity-100"
                    leave-to-class="opacity-0"
                >
                    <div
                        v-show="show"
                        class="fixed inset-0 transform transition-all"
                    >
                        <div class="absolute inset-0 bg-gray-500 opacity-75" />
                    </div>
                </transition>

                <transition
                    enter-active-class="ease-out duration-300"
                    enter-from-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    enter-to-class="opacity-100 translate-y-0 sm:scale-100"
                    leave-active-class="ease-in duration-200"
                    leave-from-class="opacity-100 translate-y-0 sm:scale-100"
                    leave-to-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                    <div
                        v-show="show"
                        class="mb-6 bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:w-full sm:mx-auto"
                        :class="maxWidthClass"
                    >
                        <div :class="!props.withouHeader ? 'mt-6' : 'mt-4'">
                            <div
                                v-if="!props.withouHeader"
                                class="px-6 flex justify-between items-center"
                            >
                                <div
                                    class="flex justify-between items-center w-full"
                                >
                                    <h1
                                        class="font-bold"
                                        style="font-size: 24px; color: #374151"
                                    >
                                       {{ props.modalTitle }}
                                    </h1>

                                    <svg
                                        @click="close"
                                        class="cursor-pointer"
                                        width="16"
                                        height="16"
                                        viewBox="0 0 16 16"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M9.87992 7.99996L15.6132 2.27996C15.8643 2.02889 16.0054 1.68836 16.0054 1.3333C16.0054 0.978227 15.8643 0.637701 15.6132 0.386629C15.3622 0.135557 15.0217 -0.00549316 14.6666 -0.00549316C14.3115 -0.00549316 13.971 0.135557 13.7199 0.386629L7.99992 6.11996L2.27992 0.386629C2.02885 0.135557 1.68832 -0.00549317 1.33325 -0.00549316C0.978183 -0.00549316 0.637657 0.135557 0.386585 0.386629C0.135514 0.637701 -0.00553703 0.978227 -0.00553703 1.3333C-0.00553704 1.68836 0.135514 2.02889 0.386585 2.27996L6.11992 7.99996L0.386585 13.72C0.261614 13.8439 0.162422 13.9914 0.0947304 14.1539C0.0270388 14.3163 -0.0078125 14.4906 -0.0078125 14.6666C-0.0078125 14.8426 0.0270388 15.0169 0.0947304 15.1794C0.162422 15.3419 0.261614 15.4893 0.386585 15.6133C0.510536 15.7383 0.658004 15.8375 0.820483 15.9052C0.982962 15.9728 1.15724 16.0077 1.33325 16.0077C1.50927 16.0077 1.68354 15.9728 1.84602 15.9052C2.0085 15.8375 2.15597 15.7383 2.27992 15.6133L7.99992 9.87996L13.7199 15.6133C13.8439 15.7383 13.9913 15.8375 14.1538 15.9052C14.3163 15.9728 14.4906 16.0077 14.6666 16.0077C14.8426 16.0077 15.0169 15.9728 15.1794 15.9052C15.3418 15.8375 15.4893 15.7383 15.6132 15.6133C15.7382 15.4893 15.8374 15.3419 15.9051 15.1794C15.9728 15.0169 16.0076 14.8426 16.0076 14.6666C16.0076 14.4906 15.9728 14.3163 15.9051 14.1539C15.8374 13.9914 15.7382 13.8439 15.6132 13.72L9.87992 7.99996Z"
                                            fill="#4B5563"
                                        />
                                    </svg>
                                </div>
                            </div>
                            <div
                            v-else
                            class="px-6 flex justify-between items-center"
                        >
                            <div
                                class="flex justify-end items-center w-full"
                            >
                                <!-- <h1
                                    class="font-bold"
                                    style="font-size: 24px; color: #374151"
                                >
                                   Adição de  Items
                                </h1> -->

                                <svg
                                    @click="close"
                                    class="cursor-pointer"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M9.87992 7.99996L15.6132 2.27996C15.8643 2.02889 16.0054 1.68836 16.0054 1.3333C16.0054 0.978227 15.8643 0.637701 15.6132 0.386629C15.3622 0.135557 15.0217 -0.00549316 14.6666 -0.00549316C14.3115 -0.00549316 13.971 0.135557 13.7199 0.386629L7.99992 6.11996L2.27992 0.386629C2.02885 0.135557 1.68832 -0.00549317 1.33325 -0.00549316C0.978183 -0.00549316 0.637657 0.135557 0.386585 0.386629C0.135514 0.637701 -0.00553703 0.978227 -0.00553703 1.3333C-0.00553704 1.68836 0.135514 2.02889 0.386585 2.27996L6.11992 7.99996L0.386585 13.72C0.261614 13.8439 0.162422 13.9914 0.0947304 14.1539C0.0270388 14.3163 -0.0078125 14.4906 -0.0078125 14.6666C-0.0078125 14.8426 0.0270388 15.0169 0.0947304 15.1794C0.162422 15.3419 0.261614 15.4893 0.386585 15.6133C0.510536 15.7383 0.658004 15.8375 0.820483 15.9052C0.982962 15.9728 1.15724 16.0077 1.33325 16.0077C1.50927 16.0077 1.68354 15.9728 1.84602 15.9052C2.0085 15.8375 2.15597 15.7383 2.27992 15.6133L7.99992 9.87996L13.7199 15.6133C13.8439 15.7383 13.9913 15.8375 14.1538 15.9052C14.3163 15.9728 14.4906 16.0077 14.6666 16.0077C14.8426 16.0077 15.0169 15.9728 15.1794 15.9052C15.3418 15.8375 15.4893 15.7383 15.6132 15.6133C15.7382 15.4893 15.8374 15.3419 15.9051 15.1794C15.9728 15.0169 16.0076 14.8426 16.0076 14.6666C16.0076 14.4906 15.9728 14.3163 15.9051 14.1539C15.8374 13.9914 15.7382 13.8439 15.6132 13.72L9.87992 7.99996Z"
                                        fill="#4B5563"
                                    />
                                </svg>
                            </div>
                        </div>
                            <slot v-if="show" />
                        </div>
                    </div>
                </transition>
            </div>
        </transition>
    </teleport>

</template>

<script setup>
import { computed, onMounted, onUnmounted, watch } from "vue"

const props = defineProps({
    show: {
        type: Boolean,
        default: false,
    },
    maxWidth: {
        type: String,
        default: "2xl",

    },
    closeable: {
        type: Boolean,
        default: true,
    },
    withouHeader: {
        type: Boolean,
        default: false,
    },
    modalTitle: {
        type: String,
        default: 'Modal Title',
    },
    centered: {
        type: Boolean,
        default: false,
    },
})

const emit = defineEmits(["close"])

watch(
    () => props.show,
    () => {
        if (props.show) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = null
        }
    }
)

const close = () => {
    if (props.closeable) {
        emit("close")
    } else {
        emit("close")
    }
}

const closeOnEscape = (e) => {
    if (e.key === "Escape" && props.show) {
        close()
    }
}

onMounted(() => document.addEventListener("keydown", closeOnEscape))

onUnmounted(() => {
    document.removeEventListener("keydown", closeOnEscape)
    document.body.style.overflow = null
})

const maxWidthClass = computed(() => {
    return {
        sm: "sm:max-w-sm",
        md: "sm:max-w-md",
        lg: "sm:max-w-lg",
        xl: "sm:max-w-xl",
        "2xl": "sm:max-w-2xl",
        "3xl": "sm:max-w-3xl",
        "4xl": "sm:max-w-4xl",
        "5xl": "sm:max-w-5xl",
        "6xl": "sm:max-w-6xl",
        "7xl": "sm:max-w-7xl",
        "8xl": "sm:max-w-[1100px]",

    }[props.maxWidth]
})


</script>

<style  scoped>

</style>
