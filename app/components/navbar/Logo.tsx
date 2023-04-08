'use client'

import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const Logo = () => {
    const router = useRouter()
  return (
    <>
        <Image src='/images/logo.png' alt='' className='hidden md:block cursor-pointer' height="100" width="100" />
        <Image src='/images/logo-sm.png' alt='' className='md:hidden cursor-pointer' height="30" width="30" />
    </>    
  )
}

export default Logo
