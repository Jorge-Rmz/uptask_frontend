import api from "@/lib/axios";
import type { Project, TaskFormData } from "@/types/index";
import { isAxiosError } from "axios";

interface TaskAPI {
    formData: TaskFormData,
    projectId: Project['_id'],
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