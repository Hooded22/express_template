import { ProfileResponse } from "../../rest/profile/ProfileResponse";
import { ProfileWithUser } from "./ProfileWithUser";
import { Request } from "express";
import { ProfileRequest } from "../../rest/profile/ProfileRequest";
import { UserMapper } from "../user/UserMapper";

export class ProfileMapper {
  private userMapper: UserMapper;

  constructor() {
    this.userMapper = new UserMapper();
  }

  toResponse = (profile: ProfileWithUser): ProfileResponse => {
    return {
      bio: profile.bio || undefined,
      picture: profile.picture || undefined,
      user: this.userMapper.toResponse(profile.user),
      id: profile.id,
    };
  };

  toResponseArray = (profiles: ProfileWithUser[]): ProfileResponse[] => {
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
