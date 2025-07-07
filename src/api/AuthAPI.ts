import api from "@/lib/axios";
import type { ConfirmToken, UserRegistrationForm } from "../types";
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

