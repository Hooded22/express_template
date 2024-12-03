import { body } from "express-validator";
import { errorMessages } from "../../config/errorMessages";

export const validateProfileRequest = [
  body("userId")
    .notEmpty()
    .withMessage(errorMessages.PROFILE.USER_ID_REQUIRED)
    .isNumeric()
    .withMessage(errorMessages.PROFILE.USER_ID_NUMERIC),
  body("bio")
    .optional()
    .isString()
    .withMessage(errorMessages.PROFILE.BIO_STRING),
  body("picture")
    .optional()
    .isString()
    .withMessage(errorMessages.PROFILE.PICTURE_STRING),
];
