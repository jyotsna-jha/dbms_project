const express = require('express')
const mysql=require('mysql')
const cors= require('cors')

const app = express()
app.use(cors());
app.use(express.json());

const db =mysql.createConnection({
    host:'localhost',
    port: 3306,
    user:"root",
    password:'jyotsna123@xy%6',
    database:'signup'
})

app.post('/signup', (req, res) => {
    const sql = "INSERT INTO login (name, email, password) VALUES (?, ?, ?)";
    const values = [
      req.body.name,
      req.body.email,
      req.body.password,
    ];
  
    db.query(sql, values, (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
      }
      db.commit();
      // Successful insertion
      return res.json({ message: 'Signup successful' });
    });
  });
  
app.listen(8001,()=>{
    console.log("Listening...");
})

