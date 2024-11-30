import { User } from '@prisma/client';
import { UserRequest } from '../../rest/user/UserRequest';
import { UserResponse } from '../../rest/user/UserResponse';

export class UserMapper {
    toResponse(user: User): UserResponse {
        return new UserResponse(user);
    }

    toEntity(userRequest: UserRequest): Partial<User> {
        return {
            username: userRequest.username,
        };
    }
}