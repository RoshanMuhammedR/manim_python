import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { useAuthStore } from '../store/useAuthStore.jsx'

const SignUp = () => {
  const navigate = useNavigate()
  const { signup, checkAuth, authUser } = useAuthStore()

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const onRegister = (data) => {
    signup(data)
  }

  return (
    <div className='relative w-full h-screen bg-background overflow-hidden flex items-center justify-center text-[rgb(var(--text))]'>
      <div className='absolute inset-0 z-0 overflow-hidden pointer-events-none'>
        <motion.div
          className='absolute rounded-full bg-primary w-[38rem] h-[38rem] mix-blend-overlay filter blur-[110px] '
          animate={{ y: [-40, 40, -40], scale: [1, 1.3, 1], rotate: [0, 20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          style={{ top: '-5rem', right: '-8rem' }}
        />
        <motion.div
          className='absolute rounded-full bg-secondary w-[32rem] h-[32rem] mix-blend-soft-light filter blur-[120px] '
          animate={{ x: [-25, 25, -25], y: [20, -20, 20], rotate: [0, -15, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          style={{ top: '25%', left: '-10rem' }}
        />
        <motion.div
          className='absolute rounded-full bg-accent w-[36rem] h-[36rem] mix-blend-hard-light filter blur-[150px] '
          animate={{ y: [30, -30, 30], scale: [1, 1.2, 1], rotate: [0, 12, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          style={{ bottom: '-8rem', right: '-6rem' }}
        />
        <motion.div
          className='absolute rounded-full bg-circle-soft w-[26rem] h-[26rem] mix-blend-lighten filter blur-[100px] '
          animate={{ x: [-20, 20, -20], y: [15, -15, 15], scale: [1, 1.1, 1] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
          style={{ bottom: '3rem', left: '8%' }}
        />
        <motion.div
          className='absolute rounded-full bg-primary w-[48rem] h-[48rem] mix-blend-color-dodge filter blur-[200px] '
          animate={{ scale: [1, 1.1, 1], rotate: [0, 360, 0] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          style={{ top: '35%', left: '25%' }}
        />
        <motion.div
          className='absolute rounded-full bg-secondary w-[16rem] h-[16rem] mix-blend-color-burn filter blur-[60px] '
          animate={{ x: [0, 20, 0], y: [0, -20, 0], rotate: [0, 45, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          style={{ top: '10%', left: '40%' }}
        />
      </div>

      <div className='z-10 flex flex-col items-center justify-center p-10 rounded-xl bg-accent/60 backdrop-blur-xl shadow-xl max-w-md w-full'>
        <h1 className='text-4xl font-bold mb-2'>Create an account</h1>
        <p className='text-md mb-8'>Let&apos;s get started!</p>
        <form className='flex flex-col w-full gap-6' onSubmit={handleSubmit(onRegister)}>
          <div>
            <input
              type='text'
              placeholder='Username'
              className='bg-background w-full h-12 p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary'
              {...register('username', {
                required: 'Username is required',
                minLength: { value: 3, message: 'Must be at least 3 characters' }
              })}
            />
            {errors.username && <p className='text-sm text-red-600 mt-1'>{errors.username.message}</p>}
          </div>
          <div>
            <input
              type='email'
              placeholder='Email'
              className='bg-background w-full h-12 p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary'
              {...register('email', {
                required: 'Email is required'
              })}
            />
            {errors.email && <p className='text-sm text-red-600 mt-1'>{errors.email.message}</p>}
          </div>
          <div>
            <input
              type='password'
              placeholder='Password'
              className='bg-background w-full h-12 p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary'
              {...register('password', {
                required: 'Password is required',
                minLength: { value: 8, message: 'Must be at least 8 characters' }
              })}
            />
            {errors.password && <p className='text-sm text-red-600 mt-1'>{errors.password.message}</p>}
          </div>
          <input
            type='submit'
            value='Sign Up'
            className='bg-primary text-white h-12 rounded hover:ring-2 hover:ring-primary hover:bg-opacity-90 transition-all'
          />
        </form>
      </div>
    </div>
  )
}

export default SignUp
