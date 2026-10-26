<script setup lang="ts">
import { ref, computed } from 'vue';
import type { User } from '@/interfaces/user.interface';
import { useFieldValidation } from '@/composables/useFieldValidation';

const user = ref<User>({ name: '', email: '', password: '' });

const { validations } = useFieldValidation(user);
const nameValidation = computed(() => validations.value[0]!);
const emailValidation = computed(() => validations.value[1]!);
const passwordValidation = computed(() => validations.value[2]!);
const errorsFound = () => {
    return validations.value.filter(
        (validation: { valid: boolean; message?: string }) => !validation.valid,
    );
};
</script>

<template>
    <form @submit.prevent="">
        <div class="form-group">
            <label for="name">Nombre</label>
            <input
                type="text"
                class="form-control"
                id="name"
                aria-describedby="nameHelp"
                placeholder="Nombre"
                v-model="user.name"
            />
            <small id="nameHelp" class="form-text text-muted" v-if="nameValidation"
                >El nombre debe tener al menos 2 caracteres</small
            >
        </div>
        <div class="form-group">
            <label for="email">Email address</label>
            <input
                type="email"
                class="form-control"
                id="email"
                aria-describedby="emailHelp"
                placeholder="info@example.com"
                v-model="user.email"
            />
            <small id="emailHelp" class="form-text text-muted" v-if="emailValidation"> </small>
        </div>
        <div class="form-group">
            <label for="password">Contraseña</label>
            <input
                type="password"
                class="form-control"
                id="password"
                aria-describedby="passwordHelp"
                v-model="user.password"
            />
            <small id="passwordHelp" class="form-text text-muted" v-if="passwordValidation"></small>
        </div>
        <input type="submit" value="Registrate" />
        <div class="alert alert-danger" role="alert" v-if="errorsFound().length !== 0">
            <p>
                <strong>Errores de validacion:</strong>
            </p>
            <ul>
                <li v-for="error in errorsFound()" :key="error.message">
                    <span>{{ error.message }}</span>
                </li>
            </ul>
        </div>
    </form>
</template>

<style scoped></style>
