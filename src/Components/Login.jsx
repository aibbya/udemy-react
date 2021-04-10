import React, {useState} from 'react'
import { auth } from "../firebaseconfig";
import {useHistory} from 'react-router-dom'


const Login = () => {
    const historial = useHistory()
    const [email, setEmail] = useState('')
    const [password, setPass] = useState('')
    const [msgError, setError] = useState(null)

    const RegistrarUser = (e)=>{
        e.preventDefault()
        auth.createUserWithEmailAndPassword(email, password)
        .then( r =>{            
            alert("usuario Registrado- BIENVENIDO")
            historial.push('/') 
        })
        .catch(e=>{
            console.error(e)
            if (e.code === "auth/email-already-in-use") {
                setError("Ese email ya está registrado")
            }
            if (e.code === "auth/invalid-email") {
                setError("Email invalido")
            }
            if (e.code === "auth/weak-password") {
                setError("El password debe contener mas de 6 caracteres")
            }
        })
    }

    const LoginUser = (e)=>{
        auth.signInWithEmailAndPassword(email, password)
        .then((r) =>{
            historial.push('/')         

        })
        .catch((e) =>{            
            console.error(e)
            if (e.code === "auth/wrong-password"){
                setError("Password incorrecta")
            }
            if (e.code === "auth/invalid-email"){
                setError("Email invalido")
            }
            
        })
    }

// auth/wrong-password


    return (
        <div className="container mt-5 pt-5 col-lg-5">
            <div className="mx-auto">
                <form onSubmit={RegistrarUser} className="form-group">
                    <input onChange={(e)=>{setEmail(e.target.value)}} className="mt-1 form-control" type="email" placeholder="Introduce el email"/>
                    <input onChange={(e)=>{setPass(e.target.value)}} className="mt-1 form-control" type="password" placeholder="Introduce el password"/>
                    <input className="btn btn-dark btn-block mt-2" value="Registrar usuario" type="submit"/>
                </form>
                <button onClick={LoginUser} className="btn btn-success btn-block"> Iniciar sesión</button>
                {
                    msgError !== null ?
                        (
                            <div className="alert alert-danger m-3 d-inline-block">
                                {msgError}
                            </div>
                        )
                        :
                        (
                            <span></span>
                        )
                        
                }
            </div>            
        </div>
    )
}

export default Login
