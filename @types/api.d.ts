interface Token {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
}

interface RoomDTO {
    id: string;
    name: string;
    authorId: string;
    inviteCode: string;
    pagesNum: number;
    widthTemplate: number;
    heightTemplate: number;
}

interface User {
    id: string;
    email: string;
    name: string;
}

interface CertainRoom extends RoomDTO {
    users: User[]
}

interface PageResponse {
    roomId: string;
    pageNumber: number;
    shapes: Shape[];
}

interface SpreadDTO {
    pageOne: PageResponse | null;
    pageTwo: PageResponse | null;
}

interface RoomPhotoDTO {
    imageId: string;
    imageUrl: string;
    roomId: string;
}

interface Pagination {
    totalCount: number,
    page: number,
    totalPages: number,
    pageSize: number
}

interface RoomPhotos {
    roomPhotos: RoomPhotoDTO[];
    pagination: Pagination;
}