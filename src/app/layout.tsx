'use client'
import { createContext, useEffect, useState } from "react";
import "./globals.css";
import { usePathname } from "next/navigation";
import Loading from "./loading";

export const UserContext = createContext(null);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
      const isAuthRoutes = pathname.includes('login') || pathname.includes('register');
    fetch('/api/me')
    .then(async res => {
      
      if(res.status === 401) {
        if(!isAuthRoutes)
          window.location.href = '/login'
        else
          setLoading(false)
      }
      else {
        const data = await res.json();
        console.log('data', data)
        if(isAuthRoutes)
          window.location.href = '/'
        else {
          setUser(data.user);
          setLoading(false)
        }
      }
    })
    .catch(err => {
      console.error('ROOT Layout | useEffect ERR', err);
      if(!isAuthRoutes)
        window.location.href = '/login'
      setLoading(false)
    })
  },[])

  return (
    <html lang="en">
      <body>
        {
          loading ? <Loading/>
          :
          <UserContext value={user}>
            {children}
          </UserContext>
        }
      </body>
    </html>
  );
}
