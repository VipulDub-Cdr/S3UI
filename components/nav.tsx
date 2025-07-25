"use client"
import * as React from 'react'
import {UserProfile, UserButton} from '@clerk/nextjs'

const NavBar: React.FC = () =>{


    return (
        <nav className='p-4 flex justify-between items-center'>
            <div className='font-bold'>S3 UI</div>
            <div>
                <UserButton/>        
            </div>
        </nav>
    )
}

export default NavBar;