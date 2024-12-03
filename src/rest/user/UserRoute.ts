import { Router } from "express";
import { UserRepository } from "../../domain/user/UserRepository";
import prisma from "../../utils/prismaClient";
import { UserService } from "../../domain/user/UserService";
import { UserController } from "./UserController";
import { validateUserRequest } from "./UserValidation";

const userRoute = Router();
const userRepository = new UserRepository(prisma);
const userService = new UserService(userRepository);
const userController = new UserController(userService);

userRoute.get("/", userController.getAllUsers);
userRoute.post(
  "/",
  validateUserRequest,
  userController.addUser.bind(userController),
);

export default userRoute;
