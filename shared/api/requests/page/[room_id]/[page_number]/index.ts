import {instance} from "@/shared/api/instance";

export interface GetPageByNumberParams {
    roomId: string;
    pageNumber: number;
}

export type GetPageByNumberConfig = RequestConfig<GetPageByNumberParams>;

export const getPageByNumber = async ({ config, params }: GetPageByNumberConfig) =>
    instance.get<PageResponse>(`page/get-by-number/${params.roomId}/${params.pageNumber}`, { params, ...config });