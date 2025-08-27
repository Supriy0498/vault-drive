import { useRouter } from "next/navigation"
import { useEffect } from "react";
import { validate as isUUID } from "uuid";

export const useValidUUID = (id: string) => {
    const router = useRouter();

    useEffect(() => {
        const isValid = isUUID(id);
        console.log(id, 'useValidUUID useEffect isValid', isValid);
        if(!isValid) {
            router.replace('/404');
        }

    }, [id, router])

    return isUUID(id);
}