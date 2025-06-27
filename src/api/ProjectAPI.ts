import api from "@/lib/axios";
import { dashboardProjectSchema, projectSchema, type Project, type ProjectFormData } from "@/types/index";
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


export async function getProjectById( id: Project['_id'] ) {
    try {
    
        const { data } = await api(`/projects/${id}`);
        const response = projectSchema.safeParse(data);
        
        if (response.success) {
            return response.data;
        }
        throw new Error('Error al obtener el proyecto');
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            console.error('Error consultado el proyecto:', error);
            const errorMessage = error.response.data.error || 'Error consultando el proyecto';
            throw new Error(errorMessage);

        }
    }

}

interface EditProjectApi {
    formData: ProjectFormData;
    projectId: Project['_id'];
}

export async function updateProject({formData, projectId}: EditProjectApi) {
    try {
        const { data } = await api.put<string>(`/projects/${projectId}`, formData);
        return data;
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            const errorMessage = error.response.data.error || 'Error actualizando el proyecto';
            throw new Error(errorMessage);

        }
    }

}

export async function deleteProject(projectId: Project['_id']) {
    try {
        const { data } = await api.delete<string>(`/projects/${projectId}`);
        return data;
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            const errorMessage = error.response.data.error || 'Error actualizando el proyecto';
            throw new Error(errorMessage);

        }
    }

}
