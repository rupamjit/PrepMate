"use server";

import { auth, db } from "@/firebase/server";
import { SignIn, SignUp, User } from "@/types/type";
import { cookies } from "next/headers";





export async function setSessionCookie(idToken: string) {
  const cookieStore = await cookies();

  const sessionCookie = await auth.createSessionCookie(idToken, {
    expiresIn: 60 * 60 * 24 * 7 * 1000, 
  });


  cookieStore.set("session", sessionCookie, {
    maxAge:  60 * 60 * 24 * 7 ,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "lax",
  });
}

export async function signUp(params: SignUp) {
  const { id, name, email } = params;

  try {

    const userRecord = await db.collection("users").doc(id).get();
    if (userRecord.exists)
      return {
        success: false,
        message: "User already exists. Please sign in.",
      };

   
    await db.collection("users").doc(id).set({
      name,
      email,
    });

    return {
      success: true,
      message: "Account created successfully. Please sign in.",
    };
  } catch (error) {
    console.error("Error in signup:", error);

    if ((error as { code?: string }).code === "auth/email-already-exists") {
      return {
        success: false,
        message: "This email is already used",
      };
    }

    return {
      success: false,
      message: "Failed to create account. Please try again.",
    };
  }
}

export async function signIn(params: SignIn) {
  const { email, token } = params;

  try {
    const userRecord = await auth.getUserByEmail(email);
    if (!userRecord)
      return {
        success: false,
        message: "User does not exist. Create an account.",
      };

    await setSessionCookie(token);
  } catch (error) {
    console.log("Error in sign in", error);

    return {
      success: false,
      message: "Failed to log into account. Please try again.",
    };
  }
}


export async function signOut() {
  const cookieStore = await cookies();

  cookieStore.delete("session");
}

export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = await cookies();

  const sessionCookie = cookieStore.get("session")?.value;
  if (!sessionCookie) return null;

  try {
    const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);


    const userRecord = await db
      .collection("users")
      .doc(decodedClaims.uid)
      .get();
    if (!userRecord.exists) return null;

    return {
      ...userRecord.data(),
      id: userRecord.id,
    } as User;
  } catch (error) {
    console.log(error);

    return null;
  }
}


export async function isAuthenticated() {
  const user = await getCurrentUser();
  return !!user;
}
