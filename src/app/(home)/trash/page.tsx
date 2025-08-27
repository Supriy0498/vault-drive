'use client'

import { UserContext } from "@/app/layout";
import { useContext, useEffect } from "react";

const Trash = () => {
    const user = useContext(UserContext)

    useEffect(() => {
        console.log('Trash useEffect', user);
    }, [])



    return(
        <div>
            Trash File/Folders
        </div>
    )
}

export default Trash;