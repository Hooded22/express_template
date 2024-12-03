import { body, param, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";
import { errorMessages } from "../../config/errorMessages";

export const validateUserRequest = [
  body("username").notEmpty().withMessage(errorMessages.USERNAME_REQUIRED),
  body("email").isEmail().withMessage(errorMessages.EMAIL_INVALID),
  body("password")
    .isLength({ min: 8 })
    .withMessage(errorMessages.PASSWORD_LENGTH),
  body("repeatPassword")
    .custom((value, { req }) => value === req.body.password)
    .withMessage(errorMessages.PASSWORDS_MISMATCH),
  (req: Request, res: Response, next: NextFunction): void => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    next();
  },
];

export const validateUserIdParam = [
  param("id").isInt().withMessage(errorMessages.USER_ID_PARAM),
];
