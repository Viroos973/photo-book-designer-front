import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {registerSchema, RegisterSchema} from "../constants/RegisterSchema";
import {usePostRegisterMutation} from "@/shared/api/hooks";
import {useAuth} from "@/shared/contexts";
import {toast} from "sonner";

export const useRegisterForm = (setIsOpen: (isOpen: boolean) => void) => {
    const register = usePostRegisterMutation()
    const { login } = useAuth()

    const registerForm = useForm<RegisterSchema>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
    });

    const onSubmit = registerForm.handleSubmit(async (values) => {
        try {
            const token = await register.mutateAsync({
                params: {
                    email: values.email,
                    name: values.name,
                    password: values.password
                }
            })

            login(token.data.accessToken, token.data.refreshToken)
            registerForm.reset()
            setIsOpen(false)
        } catch {
            toast.error(`Неверные данные`);
        }
    })

    return {
        form: registerForm,
        functions: { onSubmit }
    }
}