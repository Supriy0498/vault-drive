'use client'

import { UserContext } from "@/app/layout";
import { useContext, useEffect } from "react";

const Starred = () => {
    const user = useContext(UserContext)

    useEffect(() => {
        console.log('Starred useEffect', user);
    }, [])



    return(
        <div>
            Starred File/Folders
        </div>
    )
}

export default Starred;