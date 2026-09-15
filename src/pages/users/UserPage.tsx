import {useState , 
        useEffect} from 'react'
import ListUsers from '../../components/users/ListUsers'
import FormUser from '../../components/users/FormUser'
import type { IUser, Rol } from '../../interfaces/users/IUser'
import { getAllUsers, createUser } from '../../services/users/UserService'

const UserPage = () => {

    //crear estado de listado de usuarios
    const [listaUsers,
           setlistaUsers
          ] = useState<IUser[]>([])


    useEffect( ( ) => {
            const consultar = async () => {                //llame al servicio
            //para traer datos
            const datos = await getAllUsers()
            //cargar el estado
            //con los datos traidos
            setlistaUsers(datos)
        }
        consultar() 
    }, [ ])

    //crear funcion para añadir
    //nuevo usuario a listaUsers
    //necesita los atributos del nuevo
    //usuario como parametros
    const addUser = async (nombre: string,
                        email: string,
                        rol: Rol) => {
        const Usuario: IUser = {
            //UUID: Tipo de dato de ID unico y universal
            id: crypto.randomUUID(),
            nombre: nombre,
            email: email,
            rol: rol
        }

        //guardar el nuevo usuario
        //en la api
        const nuevaData = await createUser(Usuario)

        //poner el nuevo usuario
        //en la lista
        setlistaUsers((prev) => [...prev, nuevaData])
    }

  return (
    <>
        <FormUser addUser={addUser}/>
        <ListUsers u={listaUsers}/>

    </>
  )
}

export default UserPage