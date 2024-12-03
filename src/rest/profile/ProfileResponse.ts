import { UserResponse } from "../user/UserResponse";

export interface ProfileResponse {
  id: number;
  user: UserResponse;
  bio?: string | null;
  picture?: string | null;
}
