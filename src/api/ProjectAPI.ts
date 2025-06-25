import api from "@/lib/axios";
import { dashboardProjectSchema, type ProjectFormData } from "@/types/index";
import { isAxiosError } from "axios";

export async function createProject(formData: ProjectFormData) {
    try {
        const { data } = await api.post('/projects', formData);

        return data;
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            console.error('Error creating project:', error);
            const errorMessage = error.response.data.error || 'Error creando el proyecto';
            throw new Error(errorMessage);

        }
    }

}

export async function getProjects() {
    try {
        const { data } = await api('/projects');
        const response = dashboardProjectSchema.safeParse(data);
        
        if (response.success) {
            return response.data;
        }
        throw new Error('Error al obtener los proyectos');
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            console.error('Error creating project:', error);
            const errorMessage = error.response.data.error || 'Error creando el proyecto';
            throw new Error(errorMessage);

        }
    }

}