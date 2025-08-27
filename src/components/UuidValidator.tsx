'use client'

import { useParams, useRouter } from "next/navigation"
import { validate as isUUID } from "uuid";

export const UuidValidator = ({children}) => {
    return null;
    const params = useParams();
    const router = useRouter();

    if(isUUID(params.id)) {
        return children;
    }
    else {
        return router.replace('/404')
    }
}