import { UserRepository } from "../../domain/user/UserRepository";
import { PrismaClient, Profile, User } from "@prisma/client";
import { UserRequest } from "../../rest/user/UserRequest";

export class MockedUserRepository extends UserRepository {
  constructor() {
    super({} as PrismaClient); // Use a type-cast empty object for constructor
  }

  findAll = jest.fn<Promise<User[]>, []>();
  findById = jest.fn<Promise<User | null>, [number]>();
  createUser = jest.fn<Promise<User>, [UserRequest]>();
  deleteUser = jest.fn<Promise<User>, [number]>();
  findByUsername = jest.fn<Promise<User | null>, [string]>();
  findByEmail = jest.fn<Promise<User | null>, [string]>();
  findUserProfiles = jest.fn<Promise<Profile[]>, [number]>();
}
