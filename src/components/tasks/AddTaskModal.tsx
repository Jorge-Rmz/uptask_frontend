import { Fragment } from "react";
import {
    Dialog,
    Transition,
    TransitionChild,
    DialogPanel,
    DialogTitle,
} from "@headlessui/react";
import { useForm } from 'react-hook-form'
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import TaskForm from "./TaskForm";
import type { Task, TaskFormData } from "@/types/index";
import { createTask } from "@/api/TaskAPI";
import { toast } from "react-toastify";

export default function AddTaskModal() {
    /** Leer si el modal existe **/
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const modalTask = queryParams.get("newTask");
    const isOpen = modalTask ? true : false;

    /** Obtener el projectId **/

    const params = useParams(); 
    const projectId = params.projectId!;

    const initialValues: TaskFormData = {
        taskName: "",
        description: ""
    }

    const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues: initialValues });
    const { mutate } = useMutation({
        mutationFn: createTask,
        onSuccess(message) {
            toast.success(message);
            reset();
            navigate(location.pathname, { replace: true } )
        },
        onError(error) {
            toast.error(error.message);
        }
    })

    const handleCreateTask = (formData: TaskFormData) => {
        const data = {
            formData: formData,
            projectId: projectId,
        }

        mutate(data);
    }

    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => { navigate(location.pathname, { replace: true }) }}>
                    <TransitionChild
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/60" />
                    </TransitionChild>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <TransitionChild
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <DialogPanel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-16">
                                    <DialogTitle as="h3" className="font-black text-4xl  my-5">
                                        Nueva Tarea
                                    </DialogTitle>

                                    <p className="text-xl font-bold">
                                        Llena el formulario y crea {""}
                                        <span className="text-fuchsia-600">una tarea</span>
                                    </p>

                                    <form className="mt-10 space-y-3" noValidate onSubmit={handleSubmit(handleCreateTask)}>
                                        <TaskForm register={register} errors={errors} />
                                        <button
                                            type='submit'
                                            className='bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors'
                                        >
                                            Guardar Tarea
                                        </button>
                                    </form>
                                </DialogPanel>
                            </TransitionChild>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
}