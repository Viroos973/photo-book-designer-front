import { instance } from '@/shared/api/instance';
import {Shape} from "@/utils/shapes/shapeTypes";

export type PostCreatePageParams = {
    roomId: string;
    pageNumber: number;
    htmlContent: string;
    shapes: Shape[];
};

export type PostCreatePageConfig = RequestConfig<PostCreatePageParams>;

export const postCreatePage = async ({ config, params }: PostCreatePageConfig) =>
    instance.post<PageResponse>(`page/create-update-page`, params, config);