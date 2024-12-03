export const errorMessages = {
  USER_EXIST: "User already exists",
  USER_NOT_FOUND: "User not found",
  SERVER_ERROR: "Server error occurred",
  USERNAME_REQUIRED: "Username is required",
  EMAIL_INVALID: "Valid email is required",
  PASSWORD_LENGTH: "Password must be at least 8 characters long",
  PASSWORDS_MISMATCH: "Passwords do not match",
  PROFILE: {
    USER_ID_REQUIRED: "User id is required",
    USER_ID_NUMERIC: "User id has to be a number",
    BIO_STRING: "Profile bio has to be a text",
    PICTURE_STRING: "Profile picture has to be a text",
  },
} as const;
