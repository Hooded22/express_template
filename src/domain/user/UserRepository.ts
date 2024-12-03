import { PrismaClient, Profile, User } from "@prisma/client";
import { UserRequest } from "../../rest/user/UserRequest";

export class UserRepository {
  private prisma: PrismaClient;

  constructor(prismaClient: PrismaClient) {
    this.prisma = prismaClient;
  }

  findAll = async (): Promise<User[]> => {
    return this.prisma.user.findMany();
  };

  findById = async (id: number): Promise<User | null> => {
    return this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });
  };

  createUser = async (userData: UserRequest): Promise<User> => {
    return this.prisma.user.create({
      data: {
        username: userData.username,
        email: userData.email,
        password: userData.password,
      },
    });
  };

  deleteUser = async (id: number): Promise<User> => {
    return this.prisma.user.delete({
      where: {
        id: id,
      },
    });
  };

  findByUsername = async (username: string): Promise<User | null> => {
    return this.prisma.user.findUnique({
      where: {
        username: username,
      },
    });
  };

  findByEmail = async (email: string): Promise<User | null> => {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  };

  async findUserProfiles(userId: number): Promise<Profile[]> {
    return this.prisma.profile.findMany({
      where: { userId: userId },
    });
  }
}
