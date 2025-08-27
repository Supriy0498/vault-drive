import { clearCookies } from "@/lib/auth/cookies"

export const POST = async (req: Request) => {
    await clearCookies();
    return Response.json({message: 'Logged out successfully!'}, {status: 200});
}