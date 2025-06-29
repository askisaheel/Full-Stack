import React, { useState } from 'react'
import { register } from '../services/userService'
import { useNavigate, Link } from 'react-router-dom'

const RegisterPage = () => {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  })

  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccessMessage('')

    try {
      const res = await register(formData)
      setSuccessMessage(res.data.message || 'Registered successfully')
      setTimeout(() => navigate('/login'), 1500)
    } catch (err) {
      const errorMsg = err.response?.data?.error
      if (errorMsg?.toLowerCase().includes('username')) {
        setError('This username is already taken. Please try another.')
      } else {
        setError(errorMsg || 'Registration failed. Please try again.')
      }
    }
  }

  return (
    <div className='max-w-md mx-auto mt-10 p-6 border rounded shadow'>
      <h2 className='text-2xl font-bold mb-4'>Register</h2>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <div>
          <label className='block mb-1'>Username</label>
          <input
            type='text'
            name='username'
            value={formData.username}
            onChange={handleChange}
            className='w-full border px-3 py-2 rounded'
            required
          />
        </div>
        <div>
          <label className='block mb-1'>Password</label>
          <input
            type='password'
            name='password'
            value={formData.password}
            onChange={handleChange}
            className='w-full border px-3 py-2 rounded'
            required
          />
        </div>
        {error && <p className='text-red-500'>{error}</p>}
        {successMessage && <p className='text-green-500'>{successMessage}</p>}
        <button
          type='submit'
          className='w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700'
        >
          Register
        </button>
      </form>

      <p className='mt-4 text-center text-sm text-gray-600'>
        Already have an account?{' '}
        <Link to='/login' className='text-blue-600 hover:underline'>
          Login here
        </Link>
      </p>
    </div>
  )
}

export default RegisterPage
