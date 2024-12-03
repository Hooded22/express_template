import { Router } from "express";
import { ProfileRepository } from "../../domain/profile/ProfileRepository";
import { UserRepository } from "../../domain/user/UserRepository";
import { ProfileService } from "../../domain/profile/ProfileService";
import { ProfileController } from "./ProfileController";
import { validateProfileRequest } from "./ProfileValidation";
import prisma from "../../utils/prismaClient";

const profileRoute = Router();
const profileRepository = new ProfileRepository(prisma);
const userRepository = new UserRepository(prisma);
const profileService = new ProfileService(profileRepository, userRepository);
const profileController = new ProfileController(profileService);

profileRoute.get("/", profileController.getAllProfiles);
profileRoute.post("/", validateProfileRequest, profileController.addProfile);

export default profileRoute;
