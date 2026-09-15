import { useState } from 'react'
import type { ChangeEvent } from 'react'
import type { IUserForm, Rol } from '../../interfaces/users/IUser'

//interface en la cual 
//definimos un prop funcion 
interface FormUserProps {
    addUser: (nombre: string, email: string, rol: Rol) => void
}

const FormUser = ({ addUser }: FormUserProps) => {

    const [formulario, setFormulario] =
                  useState<IUserForm>({
                    nombre: '',
                    email: '',
                    rol: 'Dev'
                  })

    //function para tratar el form
    const inputChange = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        //separar: nombre del control y valor 
        //         en dos variables
        const { name, value } = event.target

        //asignar los valores del formulario 
        //al estado
        setFormulario({
            ...formulario,
            [name]: value
        })
    }

    //funcion para tratar el submit 
    const envioForm = (event: any) => {
        //quitar el comportamiento
        //por defecto del form
        event.preventDefault()
        addUser(formulario.nombre,
                formulario.email,
                formulario.rol)
        //limpiar el formulario
        setFormulario({
            nombre: '',
            email: '',
            rol: 'Dev'
        })
    }

    return (
        <section>
            <h1 style={{
                            fontSize: "35px",
                            color: "#000000",
                            fontWeight: "600",
                            letterSpacing: "0.5px",
                            margin: "10px 0 20px",
                            paddingLeft: "12px",
                            borderRadius: "4px",
                        }
                       }>Registrar un nuevo usuario</h1>
            <form onSubmit={envioForm} className="form">
                <div>
                    <label>Nombre</label> <br/>
                    <input
                          type="text"
                          id="nombre"
                          placeholder="p.ej Camilo Cifuentes"
                          name="nombre"
                          onChange={inputChange}
                          value={formulario.nombre}
                     />
                </div>
                <div>
                    <label>Email</label> <br/>
                    <input
                          type="email"
                          id="email"
                          placeholder="p.ej camilo@gmail.com"
                          name="email"
                          onChange={inputChange}
                          value={formulario.email}
                     />
                </div>
                <div>
                  <label htmlFor='rol'>Rol:</label>
                  <select
                      id="rol"
                      name="rol"
                      onChange={inputChange}
                      value={formulario.rol}
                  >
                    <option value="Admin">Admin</option>
                    <option value="Dev">Dev</option>
                  </select>
                </div>
                <div><br/>
                  <button type='submit'>
                    Crear usuario
                  </button>
                </div>
            </form>
        </section>
    )
}

export default FormUser