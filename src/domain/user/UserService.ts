import {UserRepository} from "./UserRepository";
import {User} from "@prisma/client";
import {UserExistsException} from "../exception/UserAlreadyExistException";

export class UserService {
    private userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    getAllUsers = async (): Promise<User[]> => {
        return this.userRepository.findAll();
    }

     addUser = async (username: User['username']):Promise<User> => {
        const existingUser = await this.userRepository.findByUsername(username);

        if(existingUser) {
            throw new UserExistsException();
        }

        return this.userRepository.createUser(username);
     }
}