import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {registerSchema, RegisterSchema} from "../constants/RegisterSchema";

export const useRegisterForm = (setIsOpen: (isOpen: boolean) => void) => {
    const registerForm = useForm<RegisterSchema>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
    });

    const onSubmit = registerForm.handleSubmit(async (values) => {
        console.log(values)
        setIsOpen(false);
    })

    return {
        form: registerForm,
        functions: { onSubmit }
    }
}