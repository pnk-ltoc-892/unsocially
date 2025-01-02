

export const cookieOptions = {
    httpOnly: true,
    secure: true,   // Only in production
    sameSite: "none",
    partitioned: true,
}