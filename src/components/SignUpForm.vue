<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import type { User } from '@/interfaces/user.interface';
import { useFieldValidation } from '@/composables/useFieldValidation';

const user = ref<User>({ name: '', email: '', password: '' });
const emit = defineEmits<{
    (e: 'register', value: string): void;
    (e: 'resetStatus', value: boolean): void;
}>();
const props = withDefaults(defineProps<{ reset?: boolean }>(), { reset: false });
const isSubmitted = ref<boolean>(false);

const { validations } = useFieldValidation(user);
const nameValidation = computed(() => validations.value[0]!);
const emailValidation = computed(() => validations.value[1]!);
const passwordValidation = computed(() => validations.value[2]!);
const errorsFound = computed(() => validations.value.filter((validation) => !validation.valid));
const errors = computed(() => errorsFound.value.length > 0);

const onSubmitForm = () => {
    if (errors.value) return;
    isSubmitted.value = true;
    emit('register', user.value.name);
};

watch(
    () => props.reset,
    (reset) => {
        if (reset) {
            user.value = { name: '', email: '', password: '' };
            isSubmitted.value = false;
            emit('resetStatus', false);
        }
    },
);
</script>

<template>
    <form @submit.prevent="onSubmitForm">
        <div class="form-group mb-2">
            <label for="name">Nombre</label>
            <input
                type="text"
                class="form-control"
                id="name"
                aria-describedby="nameHelp"
                placeholder="Nombre"
                v-model="user.name"
            />
            <div
                id="nameHelp"
                class="form-text text-muted alert alert-danger py-1"
                v-if="!nameValidation.valid"
            >
                {{ nameValidation.message }}
            </div>
        </div>
        <div class="form-group mb-2">
            <label for="email">Email address</label>
            <input
                type="email"
                class="form-control"
                id="email"
                aria-describedby="emailHelp"
                placeholder="info@example.com"
                v-model="user.email"
            />
            <div
                id="emailHelp"
                class="form-text text-muted alert alert-danger py-1"
                v-if="!emailValidation.valid"
            >
                {{ emailValidation.message }}
            </div>
        </div>
        <div class="form-group mb-3">
            <label for="password">Contraseña</label>
            <input
                type="password"
                class="form-control"
                id="password"
                aria-describedby="passwordHelp"
                v-model="user.password"
            />
            <div
                id="passwordHelp"
                class="form-text text-muted alert py-1"
                :class="!passwordValidation.valid ? 'alert-danger' : 'alert-success'"
            >
                {{ !passwordValidation.valid ? passwordValidation.message : 'Seguridad: Fuerte' }}
            </div>
        </div>
        <div class="submit-container mb-4 d-grid gap-2">
            <input
                class="btn btn-outline-success"
                type="submit"
                :value="isSubmitted ? ' Ya registrado' : 'Registrate'"
                :disabled="errors || isSubmitted"
            />
        </div>
        <div class="alert alert-danger py-1" role="alert" v-if="errors">
            <p>
                <strong>Errores de validacion:</strong>
            </p>
            <ul>
                <li v-for="error in errorsFound" :key="error.message">
                    <span>{{ error.message }}</span>
                </li>
            </ul>
        </div>
    </form>
</template>

<style scoped></style>
