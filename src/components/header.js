'use client'
import React from 'react'
import { signOut } from "firebase/auth"
import { auth } from '../../firebase/config'
// auth
function Header() {
    const logout = () => {
        console.log("signout function")
        signOut(auth)
    }
    return (
        <>
            <header class="text-gray-600 body-font">
                <div class="container mx-auto flex flex-wrap p-5 justify-end flex-col md:flex-row items-center">
                    <button onClick={logout} class="inline-flex text-white items-center bg-red-400 border-0 py-1 px-3 focus:outline-none  rounded text-base mt-4 md:mt-0">Sign Out
                    </button>
                </div>
            </header>
        </>
    )
}

export default Header