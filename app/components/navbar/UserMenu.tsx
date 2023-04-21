'use client'

import React, { useCallback, useState } from 'react'
import { AiOutlineMenu } from 'react-icons/ai'
import Avatar from '../Avatar'
import MenuItem from './MenuItem'
import useRegisterModal from '@/app/hooks/useRegisterModal'
import useLoginModal from '@/app/hooks/useLoginModal'
import { User } from '@prisma/client'
import { signOut } from 'next-auth/react'


interface UserMenuProps {
  currentUser: User | undefined
}

const UserMenu = ({currentUser}: UserMenuProps) => {
  const registerModal = useRegisterModal()
  const loginModal = useLoginModal()
  
    const [isOpen, setIsOpen ] = useState(false);

    const toggleOpen = useCallback(() => {
        setIsOpen((value) => !value);
    }, [])

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer" onClick={() => {}}>
            Rent your home
        </div>
        <div onClick={toggleOpen} className="p-4 md:py-1 md:px-2 border-[1px] hover:border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-sm transition">
            <AiOutlineMenu />
            <div className="hidden md:block">
                <Avatar />
            </div>
        </div>
      </div>

      {isOpen && (
        <div className='absolute rounded-xl shadow-md w-[40vw] md:w-3/4 transition bg-white overflow-hidden right-0 top-12 text-sm'>
            <div className='flex flex-col cursor-pointer'>
              {currentUser ? (
                <>
                  <MenuItem onClick={()=>{}              //   throw new Error('Function not implemented.')
                           } label={'My Profile'} />
                  <MenuItem onClick={()=>{}              //   throw new Error('Function not implemented.')
                  } label={'My Reservatoin'} />

                  <MenuItem onClick={()=>{}              //   throw new Error('Function not implemented.')
                  } label={'My Properties'} />

                  <hr />

                  <MenuItem onClick={() => {signOut()}} label={'Sign Out'} />
                </>
              ) : (
                <>
                    <MenuItem onClick={loginModal.onOpen              //   throw new Error('Function not implemented.')
                           } label={'Sign In'} />
                    <MenuItem onClick={registerModal.onOpen} label={'Sign Up'} />
                </>
              )}

                
            </div>
        </div>
      )}
    </div>
  )
}

export default UserMenu
