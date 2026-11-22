"use server";

import { cookies } from "next/headers";

const ADMIN_COOKIE_NAME = "ethiopian_sig_admin";
const DEFAULT_PASSCODE = "signature2026";

/**
 * Validates the admin passcode and sets an HTTP-only session cookie upon success.
 */
export async function loginAdminAction(passcode: string): Promise<{ success: boolean; error?: string }> {
  try {
    const validPasscode = process.env.ADMIN_PASSCODE || DEFAULT_PASSCODE;

    if (!passcode || passcode.trim() !== validPasscode.trim()) {
      return { success: false, error: "Incorrect admin passcode. Please try again." };
    }

    const cookieStore = await cookies();
    cookieStore.set(ADMIN_COOKIE_NAME, "authenticated", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return { success: true };
  } catch (err: unknown) {
    console.error("Login action error:", err);
    return { success: false, error: "An unexpected error occurred during login." };
  }
}

/**
 * Clears the admin session cookie.
 */
export async function logoutAdminAction(): Promise<{ success: boolean }> {
  try {
    const cookieStore = await cookies();
    cookieStore.delete(ADMIN_COOKIE_NAME);
    return { success: true };
  } catch {
    return { success: true };
  }
}

/**
 * Checks whether the current request holds an authenticated admin cookie.
 */
export async function isAdminAuthenticated(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const cookie = cookieStore.get(ADMIN_COOKIE_NAME);
    return cookie?.value === "authenticated";
  } catch {
    return false;
  }
}
