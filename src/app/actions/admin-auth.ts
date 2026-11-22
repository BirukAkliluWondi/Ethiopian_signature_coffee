"use server";

import { cookies } from "next/headers";

const ADMIN_COOKIE_NAME = "ethiopian_sig_admin";
const DEFAULT_EMAIL = "henoktessma111@gmail.com";
const DEFAULT_PASSWORD = "254517";

/**
 * Validates admin email and password credentials and sets an HTTP-only session cookie upon success.
 */
export async function loginAdminAction(
  emailOrPasscode: string,
  password?: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const validEmail = (process.env.ADMIN_EMAIL || DEFAULT_EMAIL).trim().toLowerCase();
    const validPassword = (process.env.ADMIN_PASSWORD || process.env.ADMIN_PASSCODE || DEFAULT_PASSWORD).trim();

    if (password !== undefined) {
      const email = (emailOrPasscode || "").trim().toLowerCase();
      const pwd = (password || "").trim();

      if (!email || !pwd) {
        return { success: false, error: "Please enter both email address and password." };
      }

      if (email !== validEmail || pwd !== validPassword) {
        return { success: false, error: "Incorrect admin email or password. Please try again." };
      }
    } else {
      // Direct passcode fallback
      const code = (emailOrPasscode || "").trim();
      if (!code || (code !== validPassword && code !== validEmail)) {
        return { success: false, error: "Incorrect admin credentials. Please try again." };
      }
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
