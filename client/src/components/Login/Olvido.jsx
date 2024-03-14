import React, { useState } from "react";
import { Link } from "react-router-dom";
import './olvido.css'
import { FaHome } from "react-icons/fa";

const Olvido = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí puedes agregar la lógica para enviar el correo de restablecimiento de contraseña
        setMessage(`Se ha enviado un correo a ${email} con instrucciones para restablecer la contraseña.`);
        setEmail('');
    };

    return (
        <div className="container">
            <div className="mainContent">
                <div className="progressbar">
                    <div className="bloque">
                        <div className="adminDiv flex">
                            <Link to='/'>
                                <FaHome className="icon" />
                            </Link>
                        </div>
                        <h3>Olvidé mi contraseña</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="inputDiv">
                                <label htmlFor="email">Correo electrónico:</label>
                                <input className="input flex"
                                    id="email"
                                    value={email}
                                    onChange={handleEmailChange}
                                    required
                                />
                            </div>
                            <button className="btn" type="submit">Enviar correo de restablecimiento</button>
                        </form>
                        {message && <p>{message}</p>}
                    </div>
                </div>
            </div>
        </div>    
    );
}

export default Olvido;
