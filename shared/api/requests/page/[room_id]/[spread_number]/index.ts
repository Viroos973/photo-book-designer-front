import {instance} from "@/shared/api/instance";

export interface GetSpreadParams {
    roomId: string;
    spreadNumber: number;
}

export type GetSpreadConfig = RequestConfig<GetSpreadParams>;

export const getSpread = async ({ config, params }: GetSpreadConfig) =>
    instance.get<SpreadDTO>(`page/get-spread/${params.roomId}/${params.spreadNumber}`, { params, ...config });