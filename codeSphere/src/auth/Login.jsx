import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './login.css'
import login_Logo from '../assets/Login.png'
import { loginRequest } from './api'
import { saveAuthSession } from './storage'

const Login = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [status, setStatus] = useState({
    loading: false,
    error: '',
  })

  function handleChange(event) {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setStatus({ loading: true, error: '' })

    try {
      const result = await loginRequest(formData)
      saveAuthSession(result)
      navigate('/developer')
    } catch (error) {
      setStatus({ loading: false, error: error.message })
      return
    }

    setStatus({ loading: false, error: '' })
  }

  return (
    <div className='login'>
      <div className='imgBlock'>
        <img src={login_Logo} alt="Login visual" />
      </div>

      <div className='loginBlock'>
        <h1>Login to Code Sphere</h1>

        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Username or email address</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email here..."
            value={formData.email}
            onChange={handleChange}
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
          />

          <button type="submit">
            {status.loading ? 'Signing In...' : 'Sign In'}
          </button>

          {status.error && <p className="auth-error">{status.error}</p>}

          <hr />

          <p className="signupText">
            New to Code Sphere? <Link to="/signUp">Sign Up</Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Login
