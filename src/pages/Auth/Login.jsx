import React, { useState } from 'react'
import './Auth.css'
import { useNavigate, Link } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setError('')
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      setError('Please enter a valid email address.')
      return
    }
    if (!formData.password.trim()) {
      setError('Password is required.')
      return
    }
    console.log('Login form', formData)
    navigate('/restaurant')
  }

  return (
    <div className='auth-page'>
      <div className='auth-card'>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <input
            type='email'
            name='email'
            placeholder='Email address'
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type='password'
            name='password'
            placeholder='Password'
            value={formData.password}
            onChange={handleChange}
          />
          {error && <p className='auth-error'>{error}</p>}
          <button type='submit'>Login</button>
        </form>
        <p className='auth-switch'>
          Don’t have an account? <Link to='/signup'><span>Sign up</span></Link>
        </p>
      </div>
    </div>
  )
}

export default Login



