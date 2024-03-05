import { check } from "express-validator";

export namespace UserValidator {
  export const validateCreateUser = () => {
    return [
      check("name")
        .notEmpty()
        .withMessage("Field 'name' is required")
        .isString()
        .withMessage("Invalid name"),
      check("address")
        .notEmpty()
        .withMessage("Field 'address' is required")
        .isString()
        .withMessage("Invalid address"),
      check("email")
        .notEmpty()
        .withMessage("Field 'email' is required")
        .isEmail()
        .withMessage("Must be an email format"),
      check("password")
        .notEmpty()
        .withMessage("Field 'password' is required")
        .isString()
        .withMessage("Invalid password"),
      check("creditcard_type")
        .notEmpty()
        .withMessage("Field 'creditcard_type' is required")
        .isString()
        .isIn(["visa", "mastercard", "amex", "discover"])
        .withMessage("Invalid creditcard_type"),
      check("creditcard_number")
        .notEmpty()
        .withMessage("Field 'creditcard_number' is required")
        .isString()
        .withMessage("Invalid creditcard_number"),
      check("creditcard_name")
        .notEmpty()
        .withMessage("Field 'creditcard_name' is required")
        .isString()
        .withMessage("Invalid creditcard_name"),
      check("creditcard_expired")
        .notEmpty()
        .withMessage("Field 'creditcard_expired' is required")
        .isString()
        .withMessage("Invalid creditcard_expired"),
      check("creditcard_cvv")
        .notEmpty()
        .withMessage("Field 'creditcard_cvv' is required")
        .isLength({ min: 3, max: 4 })
        .isNumeric()
        .withMessage("Invalid creditcard_cvv"),
    ];
  };

  export const validateUpdateUser = () => {
    return [
      check("user_id")
        .notEmpty()
        .withMessage("Field 'user_id' is required")
        .isString()
        .withMessage("Invalid user_id"),
      check("name").optional().isString().withMessage("Invalid name"),
      check("address").optional().isString().withMessage("Invalid address"),
      check("email")
        .optional()
        .isEmail()
        .withMessage("Must be an email format"),
      check("password").optional().isString().withMessage("Invalid password"),
      check("creditcard_type")
        .optional()
        .isString()
        .isIn(["visa", "mastercard", "amex", "discover"])
        .withMessage("Invalid creditcard_type"),
      check("creditcard_number")
        .optional()
        .isString()
        .withMessage("Invalid creditcard_number"),
      check("creditcard_name")
        .optional()
        .isString()
        .withMessage("Invalid creditcard_name"),
      check("creditcard_expired")
        .optional()
        .isString()
        .withMessage("Invalid creditcard_expired"),
      check("creditcard_cvv")
        .optional()
        .isLength({ min: 3, max: 4 })
        .isNumeric()
        .withMessage("Invalid creditcard_cvv"),
    ];
  };
}
