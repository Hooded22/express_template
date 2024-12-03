import { ProfileRepository } from "./ProfileRepository";
import { UserRepository } from "../user/UserRepository";
import { Profile } from "@prisma/client";
import { ProfileRequest } from "../../rest/profile/ProfileRequest";
import { UserNotFoundException } from "../exception/UserNotFoundException";
import { ProfileWithUser } from "./ProfileWithUser";

export class ProfileService {
  private profileRepository: ProfileRepository;
  private userRepository: UserRepository;

  constructor(
    profileRepository: ProfileRepository,
    userRepository: UserRepository,
  ) {
    this.profileRepository = profileRepository;
    this.userRepository = userRepository;
  }

  getAllProfiles = async (): Promise<ProfileWithUser[]> => {
    return this.profileRepository.findAll();
  };

  addProfile = async (
    profileData: ProfileRequest,
  ): Promise<ProfileWithUser> => {
    const existingUser = this.userRepository.findById(profileData.userId);

    if (!existingUser) {
      throw new UserNotFoundException();
    }

    return this.profileRepository.createProfile(profileData);
  };
}
