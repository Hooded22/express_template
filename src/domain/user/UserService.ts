import { UserRepository } from "./UserRepository";
import { Profile, User } from "@prisma/client";
import { UserExistsException } from "../exception/UserAlreadyExistException";
import { UserRequest } from "../../rest/user/UserRequest";
import { UserNotFoundException } from "../exception/UserNotFoundException";

export class UserService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  getAllUsers = async (): Promise<User[]> => {
    return this.userRepository.findAll();
  };

  getUserProfiles = async (userId: number): Promise<Profile[]> => {
    const existingUserById = await this.userRepository.findById(userId);

    if (!existingUserById) {
      throw new UserNotFoundException();
    }

    return this.userRepository.findUserProfiles(userId);
  };

  addUser = async (userData: UserRequest): Promise<User> => {
    const existingUserByUsername = await this.userRepository.findByUsername(
      userData.username,
    );
    const existingUserByEmail = await this.userRepository.findByEmail(
      userData.email,
    );

    if (existingUserByUsername || existingUserByEmail) {
      throw new UserExistsException();
    }

    return this.userRepository.createUser(userData);
  };
}
