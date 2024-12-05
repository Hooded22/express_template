import { User } from "@prisma/client";
import { UserRepository } from "../UserRepository";
import { UserService } from "../UserService";
import { UserNotFoundException } from "../../exception/UserNotFoundException";
import { UserRequest } from "../../../rest/user/UserRequest";
import { UserExistsException } from "../../exception/UserAlreadyExistException";
import { MockedUserRepository } from "../../../mocks/user/MockedUserRepository";

jest.mock("../UserRepository");

describe("UserService", () => {
  let userRepository: jest.Mocked<UserRepository>;
  let userService: UserService;

  beforeEach(() => {
    // Creating a manual mock of UserRepository
    userRepository = new MockedUserRepository();
    userService = new UserService(userRepository);
  });

  test("should get all users", async () => {
    const users: User[] = [
      {
        id: 1,
        username: "testUser",
        email: "test@example.com",
        password: "password123",
      },
    ];

    userRepository.findAll.mockResolvedValue(users);

    const result = await userService.getAllUsers();

    expect(result).toEqual(users);
    expect(userRepository.findAll).toHaveBeenCalled();
  });

  test("should get user profiles", async () => {
    const userId = 1;
    const profiles = [
      { id: 1, userId: userId, bio: "Test bio", picture: "profile.jpg" },
    ];

    userRepository.findById.mockResolvedValue({
      id: userId,
      username: "testUser",
      email: "test@example.com",
      password: "password123",
    } as User);
    userRepository.findUserProfiles.mockResolvedValue(profiles);

    const result = await userService.getUserProfiles(userId);

    expect(result).toEqual(profiles);
    expect(userRepository.findById).toHaveBeenCalledWith(userId);
    expect(userRepository.findUserProfiles).toHaveBeenCalledWith(userId);
  });

  test("should throw UserNotFoundException when getting profiles for nonexistent user", async () => {
    const userId = 1;
    userRepository.findById.mockResolvedValue(null);

    await expect(userService.getUserProfiles(userId)).rejects.toThrow(
      UserNotFoundException,
    );
    expect(userRepository.findById).toHaveBeenCalledWith(userId);
  });

  test("should add a new user", async () => {
    const userData: UserRequest = {
      username: "newUser",
      email: "new@example.com",
      password: "password123",
      repeatPassword: "password123",
    };
    const userResponse = {
      id: 1,
      username: userData.username,
      email: userData.email,
      password: userData.password,
    } as User;

    userRepository.findByUsername.mockResolvedValue(null);
    userRepository.findByEmail.mockResolvedValue(null);
    userRepository.createUser.mockResolvedValue(userResponse);

    const result = await userService.addUser(userData);

    expect(result).toEqual(userResponse);
    expect(userRepository.findByUsername).toHaveBeenCalledWith(
      userData.username,
    );
    expect(userRepository.findByEmail).toHaveBeenCalledWith(userData.email);
    expect(userRepository.createUser).toHaveBeenCalledWith(userData);
  });

  test("should throw UserExistsException when adding a duplicate user by username", async () => {
    const userData: UserRequest = {
      username: "existingUser",
      email: "new@example.com",
      password: "password123",
      repeatPassword: "password123",
    };

    userRepository.findByUsername.mockResolvedValue({
      id: 1,
      username: "existingUser",
      email: "existing@example.com",
      password: "password123",
    } as User);

    await expect(userService.addUser(userData)).rejects.toThrow(
      UserExistsException,
    );
    expect(userRepository.findByUsername).toHaveBeenCalledWith(
      userData.username,
    );
    expect(userRepository.findByEmail).toHaveBeenCalledWith(userData.email);
  });

  test("should throw UserExistsException when adding a duplicate user by email", async () => {
    const userData: UserRequest = {
      username: "newUser",
      email: "existing@example.com",
      password: "password123",
      repeatPassword: "password123",
    };

    userRepository.findByUsername.mockResolvedValue(null);
    userRepository.findByEmail.mockResolvedValue({
      id: 1,
      username: "existingUser",
      email: "existing@example.com",
      password: "password123",
    } as User);

    await expect(userService.addUser(userData)).rejects.toThrow(
      UserExistsException,
    );
    expect(userRepository.findByUsername).toHaveBeenCalledWith(
      userData.username,
    );
    expect(userRepository.findByEmail).toHaveBeenCalledWith(userData.email);
  });
});
