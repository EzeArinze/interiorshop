"use server";

import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
});

export async function signIn(formData: FormData) {
  const validatedFields = schema.safeParse({
    email: formData.get("email"),
  });

  if (!validatedFields.success) {
    return { error: "Invalid email address" };
  }

  // Here you would typically send a magic link or perform other authentication logic
  // For this example, we'll just simulate a successful sign-in
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return { success: `Magic link sent to ${validatedFields.data.email}` };
}

export async function signInWithGmail() {
  // In a real application, you would initiate the OAuth flow here
  // For this example, we'll just simulate a successful sign-in
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return { success: "Successfully signed in with Gmail" };
}
