import { UsernamePasswordInput } from "src/resolvers/UsernamePasswordInput";

export const validateRegister = (options: UsernamePasswordInput) => {
  if (options.username.length <= 2) {
    return [
      {
        field: "username",
        message: "Length must be greater than 2",
      },
    ];
  }

  if (options.username.includes("@")) {
    return [
      {
        field: "username",
        message: "Cannot include '@' symbol",
      },
    ];
  }

  if (options.name.length <= 2) {
    return [
      {
        field: "name",
        message: "Length must be greater than 2",
      },
    ];
  }

  if (!options.email.includes("@")) {
    [
      {
        field: "email",
        message: "Not a valid email",
      },
    ];
  }

  if (options.password.length <= 3) {
    return [
      {
        field: "password",
        message: "Length must be greater than 3",
      },
    ];
  }
  return null;
};
