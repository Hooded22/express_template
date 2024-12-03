import { UserResponse } from "../user/UserResponse";
import { ProfileResponse } from "./ProfileResponse";

export interface ProfileWithUserResponse extends ProfileResponse {
  user: UserResponse;
}
