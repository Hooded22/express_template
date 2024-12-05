import { mockDeep, DeepMockProxy } from "jest-mock-extended";
import { PrismaClient, User } from "@prisma/client";
import { UserRepository } from "../UserRepository";
import { UserRequest } from "../../../rest/user/UserRequest";

jest.mock("@prisma/client", () => ({
  PrismaClient: jest.fn().mockImplementation(() => ({
    user: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      delete: jest.fn(),
    },
    profile: {
      findMany: jest.fn(),
    },
  })),
}));

describe("UserRepository", () => {
  let prismaMock: DeepMockProxy<PrismaClient>;
  let userRepository: UserRepository;

  beforeEach(() => {
    prismaMock = mockDeep<PrismaClient>();
    userRepository = new UserRepository(prismaMock);
  });

  test("should create a new user", async () => {
    const userData: UserRequest = {
      username: "testUser",
      email: "test@example.com",
      password: "password123",
      repeatPassword: "password123",
    };

    const userResponse = {
      id: 1,
      username: userData.username,
      email: userData.email,
      password: userData.password,
    } as User;

    prismaMock.user.create.mockResolvedValue(userResponse);

    const user = await userRepository.createUser(userData);

    expect(user).toEqual(userResponse);
    expect(prismaMock.user.create).toHaveBeenCalledWith({
      data: {
        username: userData.username,
        email: userData.email,
        password: userData.password,
      },
    });
  });

  test("should find a user by id", async () => {
    const userResponse = {
      id: 1,
      username: "testUser",
      email: "test@example.com",
      password: "password123",
    } as User;

    prismaMock.user.findUnique.mockResolvedValue(userResponse);

    const user = await userRepository.findById(1);

    expect(user).toEqual(userResponse);
    expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
      where: { id: 1 },
    });
  });

  test("should delete a user", async () => {
    const userResponse = {
      id: 1,
      username: "testUser",
      email: "test@example.com",
      password: "password123",
    } as User;

    prismaMock.user.delete.mockResolvedValue(userResponse);

    const deletedUser = await userRepository.deleteUser(1);

    expect(deletedUser).toEqual(userResponse);
    expect(prismaMock.user.delete).toHaveBeenCalledWith({
      where: { id: 1 },
    });
  });

  test("should find a user by username", async () => {
    const userResponse = {
      id: 1,
      username: "testUser",
      email: "test@example.com",
      password: "password123",
    } as User;

    prismaMock.user.findUnique.mockResolvedValue(userResponse);

    const user = await userRepository.findByUsername("testUser");

    expect(user).toEqual(userResponse);
    expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
      where: { username: "testUser" },
    });
  });

  test("should find a user by email", async () => {
    const userResponse = {
      id: 1,
      username: "testUser",
      email: "test@example.com",
      password: "password123",
    } as User;

    prismaMock.user.findUnique.mockResolvedValue(userResponse);

    const user = await userRepository.findByEmail("test@example.com");

    expect(user).toEqual(userResponse);
    expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
      where: { email: "test@example.com" },
    });
  });

  test("should find user profiles", async () => {
    const profilesResponse = [
      { id: 1, bio: "Test bio", picture: "profile.jpg", userId: 1 },
    ];

    prismaMock.profile.findMany.mockResolvedValue(profilesResponse);

    const profiles = await userRepository.findUserProfiles(1);

    expect(profiles).toEqual(profilesResponse);
    expect(prismaMock.profile.findMany).toHaveBeenCalledWith({
      where: { userId: 1 },
    });
  });
});
