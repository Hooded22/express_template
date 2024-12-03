import { ProfileWithUserResponse } from "../../rest/profile/ProfileWithUserResponse";
import { ProfileWithUser } from "./ProfileWithUser";
import { Request } from "express";
import { ProfileRequest } from "../../rest/profile/ProfileRequest";
import { UserMapper } from "../user/UserMapper";
import { Profile } from "@prisma/client";
import { ProfileResponse } from "../../rest/profile/ProfileResponse";

export class ProfileMapper {
  private userMapper: UserMapper;

  constructor() {
    this.userMapper = new UserMapper();
  }

  toProfileWithUserResponse = (
    profile: ProfileWithUser,
  ): ProfileWithUserResponse => {
    return {
      bio: profile.bio || undefined,
      picture: profile.picture || undefined,
      user: this.userMapper.toResponse(profile.user),
      id: profile.id,
    };
  };

  toResponse = (profile: Profile): ProfileResponse => {
    return {
      bio: profile.bio || undefined,
      picture: profile.picture || undefined,
      id: profile.id,
    };
  };

  toProfileWithUserResponseArray = (
    profiles: ProfileWithUser[],
  ): ProfileWithUserResponse[] => {
    return profiles.map((profile) => this.toProfileWithUserResponse(profile));
  };

  toResponseArray = (profiles: Profile[]): ProfileResponse[] => {
    return profiles.map((profile) => this.toResponse(profile));
  };

  toCreateRequest = (body: Request["body"]): ProfileRequest => {
    return {
      bio: body.bio,
      userId: body.userId,
      picture: body.picture,
    };
  };
}
