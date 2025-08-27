import { withAuthMiddleware } from "@/lib/auth/withAuthMiddleware";
import { getUserById } from "@/lib/db/userRepository";
import { Handler } from "@/types/api/common";
import { UserPublic } from "@/types/db/user";

const getUser: Handler  = async (req, context) => {
    const userId = context?.userId;
    const user: UserPublic | null = await getUserById(userId);
    if(user)
        return Response.json({user}, {status: 200});

    return Response.json({error: `No user with ${userId}!`}, {status: 401});

}
export const GET = withAuthMiddleware(getUser);