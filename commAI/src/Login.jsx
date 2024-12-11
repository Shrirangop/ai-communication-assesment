import { Link } from "react-router-dom";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';
import './Login.css';
import { useEffect, useState } from "react";
const Login = () => {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const handleSubmit = async (e)=>{
        e.preventDefault();
        try{
            await signInWithEmailAndPassword(auth,email,password);
            alert("User logged in successfuly ! ");
            window.location.href = "/profile";
            localStorage.setItem("testlink","profile");
        } catch (error){
            console.log(error.message);
            alert("Incorrect Email id or Password. Please try again !");
        }
        
    }

    useEffect(()=>{
        let logbutton = document.getElementById('auth-button');
        if (logbutton){
            logbutton.innerText = "Log in";
        }
    },[]);

    return ( 
        <>
            <form className="reg-form" onSubmit={(e)=>{handleSubmit(e)}}>
                <label>Email ID: </label>
                <input type="email"
                    required
                    name="email"
                    value={email}
                    onChange={(event)=>setEmail(event.target.value)}
                />
                <label>Password: </label>
                <input type="password"
                    required
                    name="password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                />
                <button type="submit">Log in</button>
                <div className="reg-span">New User ? <Link to="/register" className="register-login">Register</Link></div>
            </form>
        </>
    );
}
 
export default Login;
