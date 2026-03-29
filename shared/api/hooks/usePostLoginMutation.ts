import { useMutation } from '@tanstack/react-query';
import {postLogin, type PostLoginConfig} from "@/shared/api/requests/auth/login";

export const usePostLoginMutation = (
    settings?: MutationSettings<PostLoginConfig, typeof postLogin>
) =>
    useMutation({
        mutationKey: ['postLogin'],
        mutationFn: ({ params, config }) =>
            postLogin({ params, config: { ...settings?.config, ...config } }),
        ...settings?.options
    });