import React, {useState} from "react"
import '../../App.css'
import './Login.css'
import { Link, useNavigate } from "react-router-dom"
import Axios from "axios"
import Swal from 'sweetalert2'

// Importar assets
import video from '../../LoginAssets/videologin.mp4'
import logo from '../../LoginAssets/logo.png'
import { FaUser } from "react-icons/fa"
import { BsFillKeyFill } from "react-icons/bs"
import { AiOutlineSwapRight } from "react-icons/ai";
  
const Login = () => {

    const [loginUserName, setLoginUserName]= useState('')
    const [loginPassword, setLoginPassword]= useState('')
    const navigateTo = useNavigate()

    const  [loginStatus, setLoginStatus] = useState()

    const loginUser = (e)=>{
      
        //Prevent submitting
        e.preventDefault();
        //we shall require axios to create an API that connects to the server
        Axios.post('http://localhost:3000/login', {
          //create variables to send to the server through the router
          LoginUserName: loginUserName,
          LoginPassword: loginPassword
        }).then((response)=>{
          console.log()
  
            if(response.data.message || loginUserName == '' || loginPassword == ''){ //if credentials dont match
                setLoginStatus('Usuario o contraseña incorrectos')

                Swal.fire({
                    title: "Error de inicio de sesión",
                    text: "Usuario o contraseña incorrectos",
                    icon: "error",
                    timer: 3000
                });
                setTimeout(function(){
                    window.location.href = '/';
                }, 3000);
            } else {
            navigateTo('/dashboard') // if the credentials match
            }
        })
      }

  const onSubmit = ()=>{
    setLoginUserName('')
    setLoginPassword('')

  }

    return (
        <div className="loginPage flex">
            <div className="container flex">
                
                <div className="container videoDiv">
                    <video src={video} autoPlay muted loop></video>

                    <div className="textDiv">
                        <h2 className='title'>Servicio Comunitario de la Escuela de Bioanálisis</h2>
                        <h3>Facultad de Medicina</h3>
                        <p>Universidad Central de Venezuela</p>
                    </div>

                    <div className="footerDiv flex">
                        <span className="text">¿No estás registrado?</span>
                        <Link to="/register">
                            <button className="btn" id="/register">Registrarse</button>
                        </Link>
                    </div>
                </div>

                <div className="formDiv flex">
                    <div className="headerDiv">
                        <img src={logo} alt="Logo Image" />
                        <h3>Inicio de Sesión</h3>
                    </div>
                    <form action="" className='form grid'>

                        <div className="inputDiv">
                            <label htmlFor="username">Usuario</label>
                            <div className="input flex">
                                <FaUser className='icon' />
                                <input type="text" id='username' placeholder='Ingresar Usuario' onChange={(event)=>{
                                    setLoginUserName(event.target.value)
                                }}/>
                            </div>
                        </div>

                        <div className="inputDiv">
                            <label htmlFor="password">Contraseña</label>
                            <div className="input flex">
                                <BsFillKeyFill className='icon' />
                                <input type="password" id='password' placeholder='Ingresar Contraseña' onChange={(event)=>{
                                    setLoginPassword(event.target.value)
                                }}/>
                            </div>
                        </div>

                        <button type="submit" className="btn flex" onClick={ loginUser }>
                                <span>Iniciar Sesión</span>
                                <AiOutlineSwapRight className='icon'/>
                        </button>

                        <span className='forgotPassword'>
                            <a href='/resetpass'>¿Olvidaste tu contraseña?</a>
                        </span>
                    </form>
                </div>
                
            </div>
        </div>
    )
}

export default Login