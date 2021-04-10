import React, {useState, useEffect} from 'react'
import {auth, store} from '../firebaseconfig'


const Usuarios = () => {
    const [id, setId] = useState('')
    const [nombre, setNombre] = useState('')
    const [tel, setTel] = useState ('')
    const [error, setError] = useState(null)
    const [contactos, setContactos] = useState([])
    const [modoEdit, setModoEdit] = useState(null)
    const [usuarioLog, setUser]= useState(null)
    

    useEffect( () => {
        const getContactos = async () => {
            const {docs} = await store.collection('agenda').get()
            const allContact = docs.map( item => ({id: item.id, ...item.data()}))
            setContactos(allContact)
        }

        getContactos()

        auth.onAuthStateChanged( (user)=>{
            if (user){
                setUser(user.email)     
            }
        })

    },[])

    const Agendar = async (e) =>{
        e.preventDefault()
        if (!nombre.trim()){
            setError('Nombre vacio')
        }
        if (!tel.trim()){
            setError('Telefono vacio')
        }
        try{
            const contacto = {
                nombre: nombre,
                telefono: tel
            }
            await store.collection('agenda').add(contacto)
            alert(`Contacto ${contacto.nombre} agregado`)
            const {docs} = await store.collection('agenda').get()
            const allContact = docs.map( item => ({id: item.id, ...item.data()}))
            setContactos(allContact)
            setNombre('')
            setTel('')
        }catch(e){
            console.error(e)
        }
        
    }

    const BorrarContacto = async (id) =>{
        try {
            await store.collection('agenda').doc(id).delete()
            const {docs} = await store.collection('agenda').get()
            const allContact = docs.map( item => ({id: item.id, ...item.data()}))
            setContactos(allContact)

        } catch (error) {
            
        }
    }

    const Editar = async (id) => {
        
        try {
            const data = await store.collection('agenda').doc(id).get()           
            const {nombre, telefono} = data.data()  
            setNombre(nombre)
            setTel(telefono)
            setId(id)            
            setModoEdit(true)
        } catch (error) {
            console.error(error);
        }
        
    }

    const EditarContact = async (e)=>{
        e.preventDefault()
        if (!nombre.trim()){
            setError('Nombre vacio')
            return
        }
        if (!tel.trim()){
            setError('Telefono vacio')
            return
        }
        const contactoUpdate = {
            nombre: nombre,
            telefono: tel
        }

        try{
            await store.collection('agenda').doc(id).set(contactoUpdate)
            alert(`Contacto ${contactoUpdate.nombre} Actualizado`)
            const {docs} = await store.collection('agenda').get()
            const allContact = docs.map( item => ({id: item.id, ...item.data()}))
            setContactos(allContact)
            setNombre('')
            setTel('')
            setId('')
            setModoEdit(null)
            setError('')
        }catch(e){
            console.error(e)
        }
    }


    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md p-4">
                    <h2>Agregar Contactos</h2>
                        <form id="formulario" onSubmit={modoEdit ? EditarContact : Agendar} className="form-group mt-3">
                            <input value={nombre} onChange={(e)=>{setNombre(e.target.value)}} placeholder="Introduce el Nombre" type="text" className="mt-2 form-control"/>
                            <input value={tel} onChange={(e)=>{setTel(e.target.value)}} placeholder="Introduce el numero de telefono" type="phone" className="mt-2 form-control"/>
                            {
                                modoEdit ? 
                                (
                                    <input type="submit" value="Editar Contacto" className="btn btn-info btn-block mt-2"/>
                                )
                                :
                                (
                                    <input type="submit" value="Registrar Contacto" className="btn btn-dark btn-block mt-2"/>
                                )
                            }
                            
                            {
                                error ?
                                ( <span className="text-danger alert ">{error}</span>)
                                :
                                ( <span></span> )
                            }
                        </form>
                        
                </div>
                <div className="col-md p-4">
                    <h2>AGENDA</h2>
                    <ul className="list-group">                    
                    {
                        usuarioLog ? 
                        (
                            contactos.length > 0 ?
                            ( 
                                contactos.map( item => (
                                    <li key={item.id} className="list-group-item mt-2 pl-1" >
                                    {item.nombre}, {item.telefono}
                                    
                                    <button onClick={ (id) => (BorrarContacto(item.id))} className="btn btn-danger float-right btn-sm"> Borrar</button>
                                    <button onClick={ (id) => (Editar(item.id))} className="btn btn-info mr-2 float-right btn-sm" href="#formulario"> Editar</button>
                                    </li>
                                ))
                            )
                            :
                            ( <li>No hay contactos en la agenda</li> ) 
                        )
                        :
                        (
                            contactos.length > 0 ?
                        ( 
                            contactos.map( item => (
                                <li key={item.id} className="list-group-item mt-2" >
                                {item.nombre}, {item.telefono}
                                </li>
                            ))
                        )
                        :
                        ( <li>No hay contactos en la agenda</li> )
                        ) 
                        
                    }
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Usuarios
