'use client'

import { UserContext } from "@/app/layout";
import { useContext, useEffect } from "react";

const Recent = () => {
    const user = useContext(UserContext)

    useEffect(() => {
        console.log('Recent useEffect', user);
    }, [])



    return(
        <div>
            Recent File/Folders
        </div>
    )
}

export default Recent;