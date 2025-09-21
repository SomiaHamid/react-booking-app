import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../contexts/AuthContext'


export default function Login() {
    const [email, setEmail] = useState('')
    const { login } = useContext(AuthContext)
    const nav = useNavigate()
    function submit(e) { e.preventDefault(); login(email); nav('/') }
    return (
        <div className="container">
            <h2>Login</h2>
            <form onSubmit={submit} className="form">
                <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required />
                <button className="btn btn-primary" type="submit">Login</button>
            </form>
        </div>
    )
}