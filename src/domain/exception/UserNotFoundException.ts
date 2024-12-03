import { errorMessages } from "../../config/errorMessages";

export class UserNotFoundException extends Error {
  constructor() {
    super(errorMessages.USER_NOT_FOUND);
    this.name = "UserNotFoundException";
  }
}
