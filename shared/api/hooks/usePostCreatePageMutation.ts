import { useMutation } from '@tanstack/react-query';
import {postCreatePage, type PostCreatePageConfig} from "@/shared/api/requests/page/create";

export const usePostCreatePageMutation = (
    settings?: MutationSettings<PostCreatePageConfig, typeof postCreatePage>
) =>
    useMutation({
        mutationKey: ['postCreatePage'],
        mutationFn: ({ params, config }) =>
            postCreatePage({ params, config: { ...settings?.config, ...config } }),
        ...settings?.options
    });