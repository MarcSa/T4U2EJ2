<script setup lang="ts">
import { ref } from 'vue';
import SignUpForm from '@/components/SignUpForm.vue';
const registeredUser = ref<string>('');
const reset = ref<boolean>(false);
const changeResetStatus = () => {
    reset.value = true;
    registeredUser.value = '';
};
</script>

<template>
    <main class="container">
        <div
            v-if="registeredUser.length === 0"
            class="alert alert-warning d-flex justify-content-start"
            role="alert"
        >
            <div class="icon-container me-2" style="font-size: 3rem">
                <i class="bi bi-journal-text"></i>
            </div>
            <div class="text-alert-container">
                <p class="mb-0 fs-2"><strong>Pendiente de registrarse</strong></p>
                <p class="lead mb-0">Completa el formulario para registrarse</p>
            </div>
        </div>
        <div v-else class="alert alert-success d-flex justify-content-between" role="alert">
            <div class="text-continer-success d-flex justify-content-start">
                <div class="icon-container me-2" style="font-size: 3rem">
                    <i class="bi bi-file-earmark-check-fill"></i>
                </div>
                <div class="text-alert-container">
                    <p class="mb-0 fs-2"><strong>Registro completado</strong></p>
                    <p class="lead mb-0">Bienvenido {{ registeredUser }}!</p>
                </div>
            </div>
            <div class="btn-container">
                <button class="btn bg-white rounded-1" @click="changeResetStatus">
                    <strong class="alert-success">Nuevo registro</strong>
                </button>
            </div>
        </div>
        <h1 class="text-center">Registro usuarios</h1>
        <SignUpForm
            @register="registeredUser = $event"
            @resetStatus="reset = $event"
            :reset="reset"
        />
    </main>
</template>

<style scoped></style>
