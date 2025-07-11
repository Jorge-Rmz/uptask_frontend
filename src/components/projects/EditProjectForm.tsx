
import ProjectForm from './ProjectForm'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import type { Project, ProjectFormData } from '@/types/index';
import { updateProject } from '@/api/ProjectAPI';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

interface EditProjectFormProps {
    data: ProjectFormData;
    projectId: Project['_id'];
}
export default function EditProjectForm({data, projectId}: EditProjectFormProps) {

    const navigate = useNavigate();

    const initialValues: ProjectFormData = {
        projectName: data.projectName,
        clienteName: data.clienteName,
        description: data.description
    }

    const queryClient = useQueryClient();

    const { mutate } = useMutation({ 
        mutationFn: updateProject,
        onSuccess: (response) => {
            toast.success(response);
            queryClient.invalidateQueries({ queryKey: ['projects'] });
            queryClient.invalidateQueries({ queryKey: ['editProject', projectId] });
            navigate("/");
        },
        onError: (error) => {
            toast.error(error.message);
        }
    });

    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues });

    const handleForm = (formData: ProjectFormData) => {
        const data = {
            formData,
            projectId
        }
        mutate(data);
    };
    return (
        <>
            <div className="max-w-3xl mx-auto">


                <h1 className="text-5xl font-black">Editar Proyecto</h1>
                <p className="text-2xl font-light text-gray-500 mt-5">LLena el siguiente formulario para editar el proyecto</p>

                <nav className="my-5">
                    <Link className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors" to="/">
                        Volver a Proyectos
                    </Link>
                </nav>

                <form className="mt-10 bg-white shadow-lg rounded-lg p-10" onSubmit={handleSubmit(handleForm)} noValidate>
                    <ProjectForm register={register} errors={errors} />

                    <input
                        type="submit"
                        value="Guardar Cambios"
                        className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors rounded-lg"
                    />
                </form>
            </div>
        </>
    )
}
