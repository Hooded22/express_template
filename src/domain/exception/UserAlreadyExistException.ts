import {errorMessages} from "../../config/errorMessages";

export class UserExistsException extends Error {
    constructor() {
        super(errorMessages.USER_EXIST);
        this.name = 'UserExistsException';
    }
}