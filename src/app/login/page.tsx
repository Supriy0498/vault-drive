'use client'

import { ChangeEventHandler, FormEventHandler, useContext, useState } from "react";
// import { UserContext } from "../layout";
// import { useRouter } from "next/navigation";

export default function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    // const user = useContext(UserContext);
    // const router = useRouter();

    // if(user) {
    //     return router.replace('/')
    // }

    const handleOnSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        console.log(email, password)
        setIsSubmitting(true);
        fetch('/api/login', {
            method: 'POST',
            body: JSON.stringify({
                email, password
            })
        })
        .then(async res => {
            const data = await res.json();
            if(res.ok) {
                console.log('Login page.tsx | Login Succcess');
                window.location.href = '/';
            }
            else {
                console.log('Login page.tsx | Login Failed', data.error);
            }
            setIsSubmitting(false);
        })
    }

    const handleOnChangePassword: ChangeEventHandler = e => {
        setPassword(e.target.value)
    }

    const handleOnChangeEmail: ChangeEventHandler = e => {
        setEmail(e.target.value)
    }


    return (
        <form action="" onSubmit={handleOnSubmit}>
            <label htmlFor="email">Email</label>
            <input type="text" id="email" onChange={handleOnChangeEmail} value={email} />
            <label htmlFor="password">Password</label>
            <input type="text" id="password" onChange={handleOnChangePassword} value={password} />
            <button type="submit" disabled={isSubmitting}>Login</button>
        </form>
    )
}