import {User} from "@prisma/client";

export class UserResponse {
    id: number;
    username: string;

    constructor(user: User) {
        this.id = user.id;
        this.username = user.username;
    }
}