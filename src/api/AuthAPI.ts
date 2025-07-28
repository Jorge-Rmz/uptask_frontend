import { ConfirmToken } from './../types/index';
import api from "@/lib/axios";
import type { ConfirmToken, ForgotPasswordForm, NewPasswordForm, RequestConfirmationCodeForm, UserLoginForm, UserRegistrationForm } from "../types";
import { isAxiosError } from "axios";


export async function createAccount( formData: UserRegistrationForm ) {
    try {
        const url = "/auth/create-account";
    
        const { data } = await api.post<string>(url, formData);
        
        return data;
        // throw new Error('Error al obtener el proyecto');
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            const errorMessage = error.response.data.error || 'Error creando la cuenta';
            throw new Error(errorMessage);
        }
    }

}

export async function confirmToken( formData: ConfirmToken ) {
    try {
        const url = "/auth/confirm-account";
    
        const { data } = await api.post<string>(url, formData);
        
        return data;
        // throw new Error('Error al obtener el proyecto');
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            const errorMessage = error.response.data.error || 'Error confirmando la cuenta';
            throw new Error(errorMessage);
        }
    }
}


export async function requestConfirmationCode( formData: RequestConfirmationCodeForm ) {
    try {
        const url = "/auth/request-code";
    
        const { data } = await api.post<string>(url, formData);
        
        return data;
        // throw new Error('Error al obtener el proyecto');
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            const errorMessage = error.response.data.error || 'Error solicitando un nuevo código';
            throw new Error(errorMessage);
        }
    }
}

export async function login( formData: UserLoginForm ) {
    try {
        const url = "/auth/login";
    
        const { data } = await api.post<string>(url, formData);
        localStorage.setItem('AUTH_TOKEN', data);
        return data;
        // throw new Error('Error al obtener el proyecto');
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            const errorMessage = error.response.data.error || 'Error iniciando sesión';
            throw new Error(errorMessage);
        }
    }
}

export async function forgotPassword( formData: ForgotPasswordForm ) {
    try {
        const url = "/auth/forgot-password";
    
        const { data } = await api.post<string>(url, formData);
        
        return data;
        // throw new Error('Error al obtener el proyecto');
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            const errorMessage = error.response.data.error || 'Error solicitando código para restablecer contraseña';
            throw new Error(errorMessage);
        }
    }
}

export async function validateToken( formData: ConfirmToken ) {
    try {
        const url = "/auth/validate-token";
    
        const { data } = await api.post<string>(url, formData);
        
        return data;
        // throw new Error('Error al obtener el proyecto');
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            const errorMessage = error.response.data.error;
            throw new Error(errorMessage);
        }
    }
}

export async function updatePasswordWithToken( {formData, token}: { formData : NewPasswordForm, token : ConfirmToken['token'] } ) {
    try {
        const url = `/auth/update-password/${token}`;
    
        const { data } = await api.post<string>(url, formData);
        
        return data;
        // throw new Error('Error al obtener el proyecto');
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            const errorMessage = error.response.data.error;
            throw new Error(errorMessage);
        }
    }
}


