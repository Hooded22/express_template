import {Router} from "express";
import {UserRepository} from "../../domain/user/UserRepository";
import prisma from "../../utils/prismaClient";
import {UserService} from "../../domain/user/UserService";
import {UserController} from "./UserController";

const userRoute = Router();
const userRepository = new UserRepository(prisma);
const userService = new UserService(userRepository);
const userController = new UserController(userService);

userRoute.get("/", userController.getAllUsers);
userRoute.post("/", userController.addUser);

export default userRoute