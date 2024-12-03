import { PrismaClient, Profile, User } from "@prisma/client";
import { ProfileRequest } from "../../rest/profile/ProfileRequest";
import { ProfileWithUser } from "./ProfileWithUser";

export class ProfileRepository {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  findAll = async (): Promise<ProfileWithUser[]> => {
    return this.prisma.profile.findMany({
      include: { user: true },
    });
  };

  findById = async (id: number): Promise<ProfileWithUser | null> => {
    return this.prisma.profile.findUnique({
      where: {
        id: id,
      },
      include: { user: true },
    });
  };

  createProfile = async (
    profileData: ProfileRequest,
  ): Promise<ProfileWithUser> => {
    return this.prisma.profile.create({
      data: {
        userId: profileData.userId,
        bio: profileData.bio,
        picture: profileData.picture,
      },
      include: { user: true },
    });
  };

  deleteProfile = async (id: number): Promise<Profile> => {
    return this.prisma.profile.delete({
      where: {
        id: id,
      },
    });
  };

  updateProfile = async (
    id: number,
    profileData: ProfileRequest,
  ): Promise<ProfileWithUser | null> => {
    return this.prisma.profile.update({
      where: { id: id },
      data: {
        userId: profileData.userId,
        bio: profileData.bio,
        picture: profileData.picture,
      },
      include: { user: true },
    });
  };
}
