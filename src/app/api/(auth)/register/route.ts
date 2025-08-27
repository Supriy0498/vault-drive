import db from "@/lib/db/config";
import { createUser, getUserByEmail } from "@/lib/db/userRepository";
import { internalServerErrorResponse, INVALID_EMAIL_OR_PASSWORD } from "@/utils/responses";
import { UserRequest } from "@/types/api/auth";
import { User } from "@/types/db/user";
import { hashPassword } from "@/utils/hashPassword";

export async function POST(req: Request): Promise<Response> {

    try {
        const {email, password} : UserRequest = await req.json();
        if(typeof email != 'string' || typeof password != 'string') {
            return Response.json({error: INVALID_EMAIL_OR_PASSWORD}, {status: 400})
        }

        //Check with DB if username already exists
        const user : User | null = await getUserByEmail(email);
        if(user) {
            return Response.json({error: 'User already exists!'}, {status: 409});
        }

        //hash the password
        const hashedPassword = await hashPassword(password);

        //Create row in user table
        await createUser(email, hashedPassword);

        //Return successs
        return Response.json({message: 'Account created successfully!'}, {status: 201});
    } catch (error) {
        console.error('register:POST err', error);
        return internalServerErrorResponse;
    }
}