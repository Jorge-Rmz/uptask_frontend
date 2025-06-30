import api from "@/lib/axios";
import type { Project, Task, TaskFormData } from "@/types/index";
import { isAxiosError } from "axios";

interface TaskAPI {
    formData: TaskFormData,
    projectId: Project['_id'],
    taskId: Task['_id'],
}

export async function createTask({formData, projectId}: Pick<TaskAPI, 'formData' | 'projectId'>) {
    try {
        const url = `/projects/${projectId}/tasks`
        const { data } = await api.post(url, formData);

        return data;
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            const errorMessage = error.response.data.error || 'Error creando la tarea';
            throw new Error(errorMessage);

        }
    }
}


export async function getTaskById({projectId, taskId }: Pick<TaskAPI, 'projectId' | 'taskId'>) {
    try {
        const url = `/projects/${projectId}/tasks/${taskId}`
        const { data } = await api.get(url);

        return data;
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            const errorMessage = error.response.data.error || 'Error consultando la tarea';
            throw new Error(errorMessage);

        }
    }
    
}


export async function updateTask({formData, projectId, taskId}: Pick<TaskAPI, 'formData' | 'projectId' | 'taskId'>) {
    try {
        const url = `/projects/${projectId}/tasks/${taskId}`
        const { data } = await api.put<string>(url, formData);

        return data;
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            const errorMessage = error.response.data.error || 'Error actualizando la tarea';
            throw new Error(errorMessage);

        }
    }
}