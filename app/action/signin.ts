"use server";

import { signIn } from "@/auth";
//import { AuthError } from "next-auth";

type formData = {
  username: string;
  password: string;
};

// type ErrorType = "INVALID_CREDENTIALS" | "TOKEN_EXPIRED" | "SERVER_ERROR" | "UNKNOWN_ERROR";

// class AuthError extends Error {
//   type: ErrorType;

//   constructor(message: string, type: ErrorType) {
//     super(message);
//     this.name = "AuthError";
//     this.type = type;
//   }
// }

export const signInCredentials = async (formData: formData) => {
  const { username, password } = formData;

  try {
    await signIn("credentials", { username, password, redirect: false });
  } catch (error) {
    console.log(error);
    return error instanceof Error ? "Invalid username or password" : "An error occurred.";
  }
};
