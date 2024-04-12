//dependencias
const express = require('express')
const app = express()
const mysql = require('mysql')
const cors = require('cors')
const bodyParser = require('body-parser');
const crypto = require('crypto'); // Import crypto for MD5

app.use(express.json())
app.use(cors())

//run server
app.listen(3000, ()=>{
    console.log('El servidor se encuentra en el puerto 3000')
})

//crear base de datos
const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: '',
    database: 'proyectodb',
    
})


// Route for user registration

app.post('/register', async (req, res) => {
    const sentEmail = req.body.Email;
    const sentUserName = req.body.UserName;
    const sentPassword = req.body.Password;

    // Generate MD5 hash of the password
    const passwordHash = crypto.createHash('md5').update(sentPassword).digest('hex');
  
    const SQL = 'INSERT INTO users (email, username, password) VALUES (?,?,?)';
    const Values = [sentEmail, sentUserName, passwordHash];
  
    db.query(SQL, Values, async (err, results) => {
        if (err) {
          res.send(err);
        } else {
          console.log('Usuario insertado exitosamente');
          res.send({ message: '¡Usuario agregado!' });
        }
      });
      
      try {
        if (!sentEmail || !sentUserName || !sentPassword) {
          res.render('login', {
            showAlert: true,
            alertTitle: "Advertencia",
            alertMessage: "Ingrese usuario y contraseña",
            alertIcon: 'info',
            showConfirmButton: true,
            timer: false,
            ruta: 'login',
          });
        }
      } catch (error) {
        // Handle errors
      }
  });
  
  // Route for login
  app.post('/login', (req, res) => {
    const sentLoginUserName = req.body.LoginUserName;
    const sentLoginPassword = req.body.LoginPassword;
  
    // Generate MD5 hash of the entered password for comparison
    const hashedLoginPassword = crypto.createHash('md5').update(sentLoginPassword).digest('hex');
  
    const SQL = 'SELECT * FROM users WHERE username = ? and password = ?';
    const Values = [sentLoginUserName, hashedLoginPassword];
  
    db.query(SQL, Values, (err, results) => {
      if (err) {
        res.send({ error: err });
      } else if (results.length > 0) {
        res.send(results);
      } else {
        res.send({ message: 'Usuario o contraseña incorrectos' });
      }
    });
  });

  db.connect((err) => {
    if (err) {
      console.error("Error al conectar a la base de datos:", err);
    } else {
      console.log("Conexión exitosa a la base de datos");
    }
  });

// Ruta para el registro de pacientes
app.post("/registro-paciente", (req, res) => {
  const { firstName, lastName, dob, gender, nationality, idCard, birthplace, civilStatus, phoneNumber, educationLevel } = req.body;
  const query = "INSERT INTO paciente (nombres, apellidos, fecha_nacimiento, genero, nacionalidad, cedula, lugar_nacimiento, estado_civil, telefono, nivel_instruccion) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  const values = [firstName, lastName, dob, gender, nationality, idCard, birthplace, civilStatus, phoneNumber, educationLevel];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error("Error al insertar paciente:", err);
      return res.status(500).json({ error: "Error al insertar paciente en la base de datos." });
    }
    console.log("Paciente registrado:", result);
    res.json({ message: "Paciente registrado correctamente." });
  });
});

// Ruta para actualizar datos de pacientes
app.put("/actualizar-paciente/:id", (req, res) => {
  const pacienteId = req.params.id;
  const { firstName, lastName, dob, gender, nationality, idCard, birthplace, civilStatus, phoneNumber, educationLevel } = req.body;
  const query = "UPDATE paciente SET nombres=?, apellidos=?, fecha_nacimiento=?, genero=?, nacionalidad=?, cedula=?, lugar_nacimiento=?, estado_civil=?, telefono=?, nivel_instruccion=? WHERE id=?";
  const values = [firstName, lastName, dob, gender, nationality, idCard, birthplace, civilStatus, phoneNumber, educationLevel, pacienteId];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error("Error al actualizar paciente:", err);
      return res.status(500).json({ error: "Error al actualizar paciente en la base de datos." });
    }
    console.log("Paciente actualizado:", result);
    res.json({ message: "Paciente actualizado correctamente." });
  });
});

// Ruta para consultar todos los pacientes
app.get("/consultar-pacientes", (req, res) => {
  const query = "SELECT * FROM paciente";

  db.query(query, (err, result) => {
    if (err) {
      console.error("Error al consultar pacientes:", err);
      return res.status(500).json({ error: "Error al consultar pacientes en la base de datos." });
    }
    console.log("Pacientes consultados:", result);
    res.json({ pacientes: result });
  });
});

// Ruta para consultar un paciente por ID
app.get("/consultar-pacientes/:id", (req, res) => {
  const pacienteId = req.params.id;
  console.log("2121121", pacienteId)
  const query = "SELECT * FROM paciente WHERE id=?";
  
  db.query(query, [pacienteId], (err, result) => {
    if (err) {
      console.error("Error al consultar paciente:", err);
      return res.status(500).json({ error: "Error al consultar paciente en la base de datos." });
    }
    console.log("Paciente consultado:", result);
    if (result.length === 0) {
      return res.status(404).json({ error: "Paciente no encontrado." });
    }
    res.json(result[0]); // Devolver el primer resultado (único paciente con ese ID)
  });
});

// Ruta para eliminar un paciente por ID
app.delete("/eliminar-paciente/:id", (req, res) => {
  const pacienteId = req.params.id;
  const query = "DELETE FROM paciente WHERE id=?";
  
  db.query(query, [pacienteId], (err, result) => {
    if (err) {
      console.error("Error al eliminar paciente:", err);
      return res.status(500).json({ error: "Error al eliminar paciente en la base de datos." });
    }
    console.log("Paciente eliminado correctamente.");
    res.json({ message: "Paciente eliminado correctamente." });
  });
});


