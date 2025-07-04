import React, { useState } from 'react'
import { login } from '../services/userService'
import { useNavigate, Link } from 'react-router-dom'

const LoginPage = () => {
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
      const res = await login(formData)
      setSuccessMessage(res.data.message)
      localStorage.setItem('user', 'true')
      setTimeout(() => navigate('/products'), 1500)
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed')
    }
  }

  return (
    <div className='max-w-md mx-auto mt-10 p-6 border rounded shadow'>
      <h2 className='text-2xl font-bold mb-4'>Login</h2>
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
          className='w-full bg-green-600 text-white py-2 rounded hover:bg-green-700'
        >
          Login
        </button>
      </form>

      <p className='mt-4 text-center text-sm text-gray-600'>
        Don't have an account?{' '}
        <Link to='/register' className='text-green-600 hover:underline'>
          Register here
        </Link>
      </p>
    </div>
  )
}

export default LoginPage
