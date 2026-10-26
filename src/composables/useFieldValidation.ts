import { computed, type Ref } from 'vue';
import * as EmailValidator from 'email-validator';
import type { User } from '@/interfaces/user.interface';

const useValidateName = (name: string): { valid: boolean; message?: string } => {
    const valid: boolean = name.length >= 2;
    if (valid) return { valid };
    return { valid, message: 'El nombre debe tener al menos 2 caracteres' };
};
const useValidateEmail = (email: string): { valid: boolean; message?: string } => {
    const valid: boolean = EmailValidator.validate(email);
    if (valid) return { valid };
    return { valid, message: 'El correo electrónico debe tener un usuario, @ y un dominio' };
};
const useValidatePassword = (password: string) => {
    const valid: boolean = password.length >= 8;
    if (valid) return { valid };
    return { valid, message: 'La contraseña debe tener una longitud mínima de 8 caracteres' };
};

export const useFieldValidation = (user: Ref<User>) => {
    const validations = computed(() => [
        useValidateName(user.value.name),
        useValidateEmail(user.value.email),
        useValidatePassword(user.value.password),
    ]);

    return { validations };
};
