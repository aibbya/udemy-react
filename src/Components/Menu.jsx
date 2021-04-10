import React, {useEffect, useState} from 'react'
import {Link, useHistory} from 'react-router-dom';
import {auth} from '../firebaseconfig'


const Menu = () => {
    const [usuario, setUser]= useState(null)
    const historial = useHistory() 

    useEffect( ()=>{
        auth.onAuthStateChanged( (user)=>{
            if (user){
                setUser(user.email)     
            }
        })
    })

    const CerrarSes = () =>{
        auth.signOut()
        setUser(null)
        historial.push('/')

    }

    return (
        <div>            
            <nav className="fixed-top mt-2 navbar navbar-expand navbar-dark bg-dark">
                <ul className="navbar-nav mr-auto">
                {
                    !usuario ?
                    (
                        <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
                    )
                    :
                    (
                        
                        <span></span>
                    )
                }
                    
                    <li className="nav-item"><Link className="nav-link" to="/">Inicio</Link></li>                    
                {
                    usuario ?
                    (
                        <li className="nav-item"><Link className="nav-link" to="/admin">Admin</Link></li>
                    )
                    :
                    (
                        
                        <span></span>
                    )
                }
                <li className="nav-item"><Link className="nav-link" to="/usuarios">Contactos</Link></li>
                </ul>
                {
                    usuario ?
                    (
                        <button onClick={CerrarSes} className="btn btn-info btn-sm">Cerrar Sesión</button>
                    )
                    :
                    (
                        
                        <span></span>
                    )
                }
            </nav>
        </div>
    )
}

export default Menu
