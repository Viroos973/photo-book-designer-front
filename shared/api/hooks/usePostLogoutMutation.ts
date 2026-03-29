import { useMutation } from '@tanstack/react-query';
import {postLogout, type PostLogoutConfig} from "@/shared/api/requests/auth/logout";

export const usePostLogoutMutation = (
    settings?: MutationSettings<PostLogoutConfig, typeof postLogout>
) =>
    useMutation({
        mutationKey: ['postLogout'],
        mutationFn: ({ params, config }) =>
            postLogout({ params, config: { ...settings?.config, ...config } }),
        ...settings?.options
    });