import { Button } from '@material-ui/core'
import React from 'react'
import './Login.css'
import { auth, provider } from './firebase'

function Login() {
    const signIn = (e) => {
       auth.signInWithPopup(provider)
    }
    return (
        <div className = "login">
                <h1>INDIA GHUMO</h1>
            <Button 
                onClick = {signIn}
                className = "login_button">Sign In</Button>
        </div>
    )
}

export default Login;