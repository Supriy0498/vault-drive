'use client'

import Link from "next/link";
import { usePathname } from "next/navigation"

import './layout.css'
import React from "react";
import NewUpload from "./NewUpload";

const MENU_ROUTES = {
    HOME: '/',
    RECENT: '/recent',
    STARRED: '/starred',
    TRASH: '/trash'
}

const MenuLink = ({
    href,
    linkText
}: {href: string, linkText: string}) => {
    const pathname = usePathname();

    return(
        <Link 
            href={href} 
            className={pathname === href && 'home-layout-menu-current' || ''}
        >
            {linkText}
        </Link>
    )
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <div>
        <NewUpload/>
        <div style={{display: 'flex'}}>
            <div className="home-layout-menu">
                <MenuLink href={MENU_ROUTES.HOME} linkText="Home"/>
                <MenuLink href={MENU_ROUTES.RECENT} linkText="Recent"/>
                <MenuLink href={MENU_ROUTES.STARRED} linkText="Starred"/>
                <MenuLink href={MENU_ROUTES.TRASH} linkText="Trash"/>
            </div>
            {children}
        </div>
    </div>
  )
}
