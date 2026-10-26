<script setup lang="ts">
import { ref } from 'vue';
import SignUpForm from '@/components/SignUpForm.vue';
const message = ref<string>('');
console.log(message);
</script>

<template>
    <main class="container">
        <h1 v-once class="text-center">Registro usuarios</h1>
        <SignUpForm />
        <p class="message"></p>
    </main>
</template>

<style scoped></style>
