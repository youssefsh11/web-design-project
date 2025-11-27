import React, { useState } from 'react'
import './Auth.css'
import { useNavigate, Link } from 'react-router-dom'

const Signup = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [error, setError] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setError('')
    if (!formData.fullName.trim() || !formData.email.trim() || !formData.password.trim() || !formData.confirmPassword.trim()) {
      setError('All fields are required.')
      return
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError('Please enter a valid email address.')
      return
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords must match.')
      return
    }
    console.log('Signup form', formData)
    navigate('/restaurant')
  }

  return (
    <div className='auth-page'>
      <div className='auth-card'>
        <h1>Create account</h1>
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            name='fullName'
            placeholder='Full name'
            value={formData.fullName}
            onChange={handleChange}
          />
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
          <input
            type='password'
            name='confirmPassword'
            placeholder='Confirm password'
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {error && <p className='auth-error'>{error}</p>}
          <button type='submit'>Create account</button>
        </form>
        <p className='auth-switch'>
          Already have an account? <Link to='/login'><span>Log in</span></Link>
        </p>
      </div>
    </div>
  )
}

export default Signup


