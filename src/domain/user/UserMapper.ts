import { User } from '@prisma/client';
import { UserRequest } from '../../rest/user/UserRequest';
import { UserResponse } from '../../rest/user/UserResponse';
import {Request} from 'express'

export class UserMapper {
    toResponse(user: User): UserResponse {
        return {
            username: user.username,
            email: user.email,
            id: user.id
        };
    }

    toEntity(userRequest: UserRequest): Partial<User> {
        return {
            username: userRequest.username,
        };
    }

    toCreateRequest(body: Request['body']): UserRequest {
        return {
            username: body.username,
            email: body.email,
            password: body.password,
            repeatPassword: body.repeatPassword
        }
    }
}