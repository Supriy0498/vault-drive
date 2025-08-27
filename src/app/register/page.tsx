'use client'

import { useRouter } from "next/navigation";
import { ChangeEventHandler, FormEventHandler, useState } from "react";

export default function Register() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    const handleOnSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        console.log(email, password)
        setIsSubmitting(true);
        fetch('/api/register', {
            method: 'POST',
            body: JSON.stringify({
                email, password
            })
        })
        .then(async res => {
            const data = await res.json();
            if(res.ok) {
                console.log('Register page.tsx | Register Succcess');
                // window.location.href = '/';
                router.replace('/login')
            }
            else {
                console.log('Register page.tsx | Register Failed', data.error);
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
            <button type="submit" disabled={isSubmitting}>Register</button>
        </form>
    )
}