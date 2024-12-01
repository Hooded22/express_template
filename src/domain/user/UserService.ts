import {UserRepository} from "./UserRepository";
import {User} from "@prisma/client";
import {UserExistsException} from "../exception/UserAlreadyExistException";
import {UserRequest} from "../../rest/user/UserRequest";

export class UserService {
    private userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    getAllUsers = async (): Promise<User[]> => {
        return this.userRepository.findAll();
    }

     addUser = async (userData: UserRequest):Promise<User> => {
        const existingUserByUsername = await this.userRepository.findByUsername(userData.username);
        const existingUserByEmail = await this.userRepository.findByEmail(userData.email);

        if(existingUserByUsername || existingUserByEmail) {
            throw new UserExistsException();
        }

        return this.userRepository.createUser(userData);
     }
}