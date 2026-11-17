export async function isAdmin(token: string): Promise<boolean> {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/users/admin`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  if (!res.ok) {
    throw new Error(`Unable to check admin access (${res.status})`)
  }
  const data: unknown = await res.json()
  if (typeof data !== "boolean") {
    throw new Error("Invalid admin access response")
  }
  return data
}
