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