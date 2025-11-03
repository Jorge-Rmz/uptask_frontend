import api from "@/lib/axios";
import { isAxiosError } from "axios";
import { teamMembersSchema, type Project, type TeamMember, type TeamMemberForm } from "@/types/index";


export async function findUserByEmail({projectId, formData}: {projectId: Project['_id'], formData: TeamMemberForm}) {
    try {
        const url = `/projects/${projectId}/team/find`
        const { data } = await api.post(url, formData);

        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            const errorMessage = error.response.data.error || 'Error al buscar el usuario';
            throw new Error(errorMessage);

        }
    }
}


export async function addUserToProject({projectId, id}: {projectId: Project['_id'], id: TeamMember['_id']}) {
    try {
        const url = `/projects/${projectId}/team`
        const { data } = await api.post(url, {id});

        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            const errorMessage = error.response.data.error || 'Error al buscar el usuario';
            throw new Error(errorMessage);

        }
    }
}

export async function getProjectTeam(projectId: Project['_id']) {
    try {
        const url = `/projects/${projectId}/team`
        const { data } = await api.get(url);

        const response = teamMembersSchema.safeParse(data);
        if(response.success){
            return response.data;
        }
        // const errorMessage = 'Error al buscar los miembros del equipo';
        // throw new Error(errorMessage);
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            const errorMessage = error.response.data.error || 'Error al buscar el usuario';
            throw new Error(errorMessage);

        }
    }
}

export async function removeUserFromProyect({projectId, userId}: {projectId: Project['_id'], userId: TeamMember['_id']}) {
    try {
        const url = `/projects/${projectId}/team/${userId}`
        const { data } = await api.delete<string>(url);

        return data;
    } catch (error) {   
        if (isAxiosError(error) && error.response) {
            const errorMessage = error.response.data.error || 'Error al buscar el usuario';
            throw new Error(errorMessage);

        }
    }
}