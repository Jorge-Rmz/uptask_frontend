import api from "@/lib/axios";
import { taskSchema, type Project, type Task, type TaskFormData } from "@/types/index";
import { isAxiosError } from "axios";

interface TaskAPI {
    formData: TaskFormData,
    projectId: Project['_id'],
    taskId: Task['_id'],
    status: Task['status'],
}

export async function createTask({ formData, projectId }: Pick<TaskAPI, 'formData' | 'projectId'>) {
    try {
        const url = `/projects/${projectId}/tasks`
        const { data } = await api.post(url, formData);

        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            const errorMessage = error.response.data.error || 'Error creando la tarea';
            throw new Error(errorMessage);

        }
    }
}


export async function getTaskById({ projectId, taskId }: Pick<TaskAPI, 'projectId' | 'taskId'>) {
    try {
        const url = `/projects/${projectId}/tasks/${taskId}`
        const { data } = await api.get(url);
        const response = taskSchema.safeParse(data);

        if (response.success) {
            return response.data;
        }
        // const errorMessage = 'Error consultando la tarea';
        // throw new Error(errorMessage);

    } catch (error) {
        if (isAxiosError(error) && error.response) {
            const errorMessage = error.response.data.error || 'Error consultando la tarea';
            throw new Error(errorMessage);

        }
    }

}

export async function updateTask({ formData, projectId, taskId }: Pick<TaskAPI, 'formData' | 'projectId' | 'taskId'>) {
    try {
        const url = `/projects/${projectId}/tasks/${taskId}`
        const { data } = await api.put<string>(url, formData);

        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            const errorMessage = error.response.data.error || 'Error actualizando la tarea';
            throw new Error(errorMessage);

        }
    }
}

export async function deleteTask({ projectId, taskId }: Pick<TaskAPI, 'projectId' | 'taskId'>) {
    try {
        const url = `/projects/${projectId}/tasks/${taskId}`
        const { data } = await api.delete<string>(url);

        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            const errorMessage = error.response.data.error || 'Error al eliminar la tarea';
            throw new Error(errorMessage);

        }
    }
}

export async function updateStatus({ projectId, taskId, status }: Pick<TaskAPI, 'projectId' | 'taskId' | 'status'>) {
    try {
        const url = `/projects/${projectId}/tasks/${taskId}/status`
        const { data } = await api.put<string>(url, {status});

        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            const errorMessage = error.response.data.error || 'Error al actualizar la tarea';
            throw new Error(errorMessage);

        }
    }
}

