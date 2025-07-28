import { Link } from "react-router-dom";
import { PinInput, PinInputField } from "@chakra-ui/pin-input";
import { useState } from "react";
import type { ConfirmToken } from "@/types/index";
import { confirmToken } from "@/api/AuthAPI";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";

export default function ConfirmAccountView() {

    const [token, setToken] = useState<ConfirmToken['token']>('');

    const  { mutate } = useMutation({
        mutationFn: confirmToken,
        onSuccess: (data) => {
            toast.success(data);
            setToken('');

        },
        onError: (error) => {
            toast.error(error.message)
        }
    })

    const handleChange = (value: ConfirmToken['token']) => {
        setToken(value);
    };

    const handleComplete = (value: ConfirmToken['token']) => {
        mutate({token: value});
    };


    return (
        <>
            <h1 className="text-5xl font-black text-white">Restablecer password</h1>
            <p className="text-2xl font-light text-white mt-5">
                Ingresa el código que recibiste {''}
                <span className=" text-fuchsia-500 font-bold"> por e-mail</span>
            </p>
            <form
                className="space-y-8 p-10 bg-white mt-10"
            >
                <label
                    className="font-normal text-2xl text-center block"
                >Código de 6 dígitos</label>
                <div className="flex justify-center gap-5">

                    <PinInput value={token} onChange={handleChange} onComplete={handleComplete}> 
                        <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
                        <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
                        <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
                        <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
                        <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
                        <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
                    </PinInput>
                </div>

            </form>

            <nav className="mt-10 flex flex-col space-y-4">
                <Link
                    to='/auth/request-code'
                    className="text-center text-gray-300 font-normal"
                >
                    Solicitar un nuevo Código
                </Link>
            </nav>

        </>
    )
}