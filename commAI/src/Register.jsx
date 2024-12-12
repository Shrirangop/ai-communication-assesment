import { useState } from 'react';
import './Register.css';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth,db } from './firebase.jsx';
import { setDoc, doc } from 'firebase/firestore';
import { Link } from 'react-router-dom';
const Register = () => {
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const handleSubmit = async (e)=>{
        e.preventDefault();
        try{
            await createUserWithEmailAndPassword(auth,email,password);
            const user = auth.currentUser;
            console.log(user);
            if (user){
                await setDoc(doc(db,"Users",user.uid),{
                    email: user.email,
                    name: name 
                });
            }
            alert("user registered successfuly ! ");
        } catch (error){
            if (error.message==="Firebase: Error (auth/email-already-in-use)."){
                alert("User Already Registered !");
            }
            else if (error.message==="Firebase: Password should be at least 6 characters (auth/weak-password)."){
                alert("Password should be atleast 6 characters long !");
            }
            else{
                console.log(error.message);
                alert("There was some problem with registration");
            }
        }
        window.location.href = "/profile";
        localStorage.setItem("testlink","profile");
    }

    

    return ( 
        <div className='register-container'>
            <form className="reg-form" onSubmit={(e)=>{handleSubmit(e)}}>
                <label>Name: </label>
                <input type="text"
                    required
                    name="name"
                    value={name}
                    onChange={(event)=>setName(event.target.value)}
                />
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
                <button type="submit">Register</button>
                <div className="reg-span">Already Registered ? <Link to="/login" className="register-login">Login</Link></div>
            </form>
        </div>
    );
}
 
export default Register;