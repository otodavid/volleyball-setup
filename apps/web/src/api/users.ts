import type { CurrentUserResponse } from "@volleyball/types"

export async function getMe(
  token: string | null
): Promise<CurrentUserResponse> {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!res.ok) {
    throw new Error(`Unable to load your profile ${res.status}`)
  }

  const data: unknown = await res.json()

  if (
    typeof data !== "object" ||
    data === null ||
    !("isAdmin" in data) ||
    typeof data.isAdmin !== "boolean"
  ) {
    throw new Error("Invalid user profile response")
  }

  return { isAdmin: data.isAdmin }
}
