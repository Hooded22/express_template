import { User } from "@prisma/client";
import { Request } from "express";
import { UserResponse } from "../../../rest/user/UserResponse";
import { UserMapper } from "../UserMapper";
import { UserRequest } from "../../../rest/user/UserRequest";

describe("UserMapper", () => {
  const userMapper = new UserMapper();

  test("toResponse should map User to UserResponse", () => {
    const user: User = {
      id: 1,
      username: "testUser",
      email: "test@example.com",
      password: "password123",
    };

    const expectedResponse: UserResponse = {
      id: 1,
      username: "testUser",
      email: "test@example.com",
    };

    const result = userMapper.toResponse(user);

    expect(result).toEqual(expectedResponse);
  });

  test("toEntity should map UserRequest to Partial<User>", () => {
    const userRequest: UserRequest = {
      username: "testUser",
      email: "test@example.com",
      password: "password123",
      repeatPassword: "password123",
    };

    const expectedEntity: Partial<User> = {
      username: "testUser",
    };

    const result = userMapper.toEntity(userRequest);

    expect(result).toEqual(expectedEntity);
  });

  test("toCreateRequest should map request body to UserRequest", () => {
    const body: Request["body"] = {
      username: "testUser",
      email: "test@example.com",
      password: "password123",
      repeatPassword: "password123",
    };

    const expectedRequest: UserRequest = {
      username: "testUser",
      email: "test@example.com",
      password: "password123",
      repeatPassword: "password123",
    };

    const result = userMapper.toCreateRequest(body);

    expect(result).toEqual(expectedRequest);
  });
});
