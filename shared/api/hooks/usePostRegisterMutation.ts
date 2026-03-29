import { useMutation } from '@tanstack/react-query';
import {postRegister, type PostRegisterConfig} from "@/shared/api/requests/auth/register";

export const usePostRegisterMutation = (
    settings?: MutationSettings<PostRegisterConfig, typeof postRegister>
) =>
    useMutation({
        mutationKey: ['postRegister'],
        mutationFn: ({ params, config }) =>
            postRegister({ params, config: { ...settings?.config, ...config } }),
        ...settings?.options
    });