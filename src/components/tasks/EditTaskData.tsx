import { getTaskById } from '@/api/TaskAPI';
import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { Navigate, useLocation, useParams } from 'react-router-dom'
import EditTaskModal from './EditTaskModal';

export default function EditTaskData() {

    const params = useParams();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search)
    const taskId = queryParams.get('editTask')!;
    const projectId = params.projectId!; 

    const dataFind = {
        projectId: projectId,
        taskId: taskId
    }

    const { data, isLoading, isError } = useQuery({
        queryKey: ['task', taskId],
        queryFn: () => getTaskById(dataFind),
        enabled: !!taskId,
        retry: false,
    })

    if(isError) return <Navigate to={'/404'}/>

    if(data) return <EditTaskModal data={data} projectId={projectId} taskId={taskId}/>
}
