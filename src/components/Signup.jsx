import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Input, Logo } from './index'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import authService from '../appwrite/auth'
import { useDispatch } from 'react-redux'
import { login } from '../store/authSlice'


const Signup = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { register, handleSubmit } = useForm()
    const [error, setError] = useState("")

    const create = async (data) => {
        setError("")
        try {
            const response = await authService.createAccount(data)
            if (response) {
                const userData = await authService.getCurrentUser()
                if (userData) dispatch(login(userData))
                navigate('/')
            }
        } catch (error) {
            setError(error.message)
        }
    }


    return (
        <div
            className='flex  items-center justify-center w-full px-90 '>
            <div
                className={'mx-auto w-full  rounded-lg  bg-gray-100 p-10 border border-black/10'}>
                <div className='flex justify-center'>
                    <span className='inline-block w-full max-w-[100px]'>
                        <Logo width='100px' />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign up to account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary transition duration-200  hover:underline dark:text-blue-500"
                    >
                        Sign In
                    </Link>
                </p>
                {error &&
                    <p className='text-red-500 text-center mt-8'>{error}
                    </p>}
                <form onSubmit={handleSubmit(create)} className='mt-8'>
                    <div
                        className='space-y-5'>
                        <Input
                            label='Full Name'
                            placeholder='Enter your full name'
                            type='text'
                            {...register('name', {
                                required: true,
                            })}
                        />
                        <Input
                            label='Email'
                            placeholder='Enter your email'
                            type='email'
                            {...register('email', {
                                required: true,
                                matchPattern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                    "Email address must be a valid address",
                            })}
                        />
                        <Input
                            label='Password'
                            placeholder='Enter your password'
                            type='password'
                            {...register('password', {
                                required: true,
                                minLength: (value) => value.length >= 8 || "Password must be at least 8 characters long",
                            })}
                        />
                        <Button type='submit' className='w-full '>
                            Create Account  
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup
