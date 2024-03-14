//dependencias
const express = require('express')
const app = express()
const mysql = require('mysql')
const cors = require('cors')
const crypto = require('crypto'); // Import crypto for MD5

// ... other code remains the same ...

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