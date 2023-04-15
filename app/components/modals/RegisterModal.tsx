'use client'

import React from 'react'
import axios from 'axios'
import { AiFillFacebook, AiFillGithub } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'
import { useCallback, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form' 

import useRegisterModal from '@/app/hooks/useRegisterModal'
import Modal from './Modal'
import Heading from '../Heading'
import Input from '../inputs/Input'
import Button from '../ui/Button'
import toast from 'react-hot-toast'

const RegisterModal = () => {
    const registerModal = useRegisterModal()
    const [isLoading, setIsLoading] = useState(false)

    const { 
        register, 
        handleSubmit, 
        formState: {
            errors,
        }} = useForm<FieldValues>({
            defaultValues: {
                name: '',
                email: '',
                password: '',
            }           
        });
    
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true)

        axios.post('/api/register', data)
                .then(() => {
                    registerModal.onClose()
                })
                .catch((error) => toast.error('something went wrong'))
                .finally(() => setIsLoading(false))
    }

    const onToggle = useCallback(() => {
        registerModal.onClose()
    }, [registerModal])

    const bodyContent = (
        <div className="flex flex-col gap-4">
           <Heading 
                title='Welcome to RENTLY'
                subtitle='Create an account' 
                // center        
           />
           <Input
                type="text" 
                id="name" 
                label='Name' 
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input
                type="text" 
                id="email" 
                label='Email' 
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input
                type="password" 
                id="password" 
                label='Password' 
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
        </div>
    )

    const footerContent = (
        <div className="flex flex-col gap-4 mt-3">
            <hr />
            <Button
                outline
                label='Continue with Google'
                icon={FcGoogle}
                onClick={() => {}}
            />
            <Button
                outline
                label='Continue with Facebook'
                icon={AiFillFacebook}
                onClick={() => {}}
            />
            <div className='justify-center flex flex-row items-center gap-2 text-neutral-500 text-center mt-4 font-light'>
                <div className=''>
                    Already have an account?
                </div>
                <div className='text-neutral-800 cursor-pointer hover:underline' onClick={registerModal.onClose}>
                    Log in
                </div>
            </div>
        </div>
    )

  return (
    <Modal 
        disabled={isLoading}
        isOpen={registerModal.isOpen}
        title="Register"
        actionLabel='Continue'
        onClose={registerModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        body={bodyContent}
        footer={footerContent}
    />
  )
}

export default RegisterModal
