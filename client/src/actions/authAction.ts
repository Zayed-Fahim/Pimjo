import { signIn, signOut } from "next-auth/react";

type CredentialsProps = {
  email: string;
  username: string;
  accessToken: string;
  _id: string;
};

export async function credentialsLogin(data: CredentialsProps) {
  try {
    const response = await signIn("credentials", {
      ...data,
      redirect: false,
    });

    return response;
  } catch (error) {
    throw error;
  }
}

export async function logout() {
  await signOut({
    redirectTo: "/login",
  });
}
