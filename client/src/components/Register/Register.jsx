import React, { useState } from "react"
import '../../App.css'
import './Register.css'
import { Link, useNavigate } from "react-router-dom"
import Axios from 'axios'
import Swal from 'sweetalert2'

// Importar assets

import video from '../../LoginAssets/videologin.mp4'
import logo from '../../LoginAssets/logo.png'
import { FaUser } from "react-icons/fa"
import { BsFillKeyFill } from "react-icons/bs"
import { AiOutlineSwapRight } from "react-icons/ai"
import { MdEmail } from "react-icons/md"


const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  });
  
  const Register = () => {
    const [email, setEmail] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const navigateTo = useNavigate();
  
    const createUser = (e) => {
      e.preventDefault();
      Axios.post('http://localhost:3000/register', {
        Email: email,
        UserName: userName,
        Password: password
      })
      .then(() => {
        navigateTo('/dashboard');
        setEmail('');
        setUserName('');
        setPassword('');
        Toast.fire({
          icon: "success",
          title: "Usuario registrado exitosamente"
        });
      })
      .catch((error) => {
        // Manejar errores de registro aquí
        console.error(error);
        Toast.fire({
          icon: "error",
          title: "Error al registrar usuario"
        });
      });
    };

    return (
        <div className="registerPage flex">
            <div className="container flex">
                
                <div className="container videoDiv">
                    <video src={video} autoPlay muted loop></video>

                    <div className="textDiv">
                        <h2 className='title'>Servicio Comunitario de la Escuela de Bioanálisis</h2>
                        <p>Universidad Central de Venzuela</p>
                    </div>

                    <div className="footerDiv flex">
                        <span className="text">¿Ya estás registrado?</span>
                        <Link to="/">
                            <button className="btn" id="/register">Inicia Sesión</button>
                        </Link>
                    </div>
                </div>

                <div className="formDiv flex">
                    <div className="headerDiv">
                        <img src={logo} alt="Logo Image" />
                        <h3>Registro</h3>
                    </div>
                    <form action="" className='form grid'>

                        <div className="inputDiv">
                            <label htmlFor="email">Correo</label>
                            <div className="input flex">
                                <MdEmail className='icon' />
                                <input type="email" id='email' placeholder='Ingresar Correo' onChange={(event)=>{
                                    setEmail(event.target.value)
                                }}/>
                            </div>
                        </div>

                        <div className="inputDiv">
                            <label htmlFor="username">Usuario</label>
                            <div className="input flex">
                                <FaUser className='icon' />
                                <input type="text" id='username' placeholder='Ingresar Usuario' onChange={(event)=>{
                                    setUserName(event.target.value)
                                }}/>
                            </div>
                        </div>

                        <div className="inputDiv">
                            <label htmlFor="password">Contraseña</label>
                            <div className="input flex">
                                <BsFillKeyFill className='icon' />
                                <input type="password" id='password' placeholder='Ingresar Contraseña' onChange={(event)=>{
                                    setPassword(event.target.value)
                                }}/>
                            </div>
                        </div>

                            <button type="submit" className="btn flex" onClick={ createUser }>
                                <span>Registrarme</span>
                                <AiOutlineSwapRight className='icon'/>
                            </button>


                    </form>
                </div>
                
            </div>
        </div>
    )
}

export default Register