const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "root",
  database: "the sense",
});

app.get("/getUsers", (req, res) => {
  db.query("SELECT * FROM users", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result)
      res.send(result);
    }
  });
});

app.post("/login", (req, res) => {

  const email = req.body.email;
  const password = req.body.password;

  db.query("SELECT * FROM users WHERE password=? AND email=?",[password,email], (err, result) => {
    if (err) {
      console.log(err);
    } else if (result=="") {
      console.log("pas d'utilisateur trouvé")
    } else {
      console.log(result)
      res.send(result);
    }
  });
});

app.post("/getRoom", (req, res) => {

  const roomName = req.body.roomName;

  db.query("SELECT * FROM salle WHERE RoomName=?",[roomName], (err, result) => {
    if (err) {
      console.log(err);
    } else if (result=="") {
      console.log("pas de salle trouvé")
    } else {
      console.log(result)
      res.send(result);
    }
  });
});

app.post("/createUsers", (req, res) => {
  const prenom = req.body.prenom;
  const nom = req.body.nom;
  const email = req.body.email;
  const password = req.body.password;

  db.query(
    "INSERT INTO users (prenom, nom, email, password) VALUES (?,?,?,?)",
    [prenom, nom, email, password],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
        console.log("Succesfully insert Users")
      }
    }
  );
});

app.put("/updateUser", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const prenom = req.body.prenom;
  const nom = req.body.nom;
  const emailUser = req.body.emailUser;
  const passwordUser = req.body.passwordUser;
  db.query(
    "UPDATE users SET email = ?, password = ?, prenom = ?, nom = ? WHERE email = ? AND password = ?",
    [email, password, prenom, nom, emailUser, passwordUser],
    (err, result) => {
      if (err) {
        console.log(err);
      } else if (result=="") {
        console.log("pas de d'utilisateur trouvé")
      } else {
        res.send(result);
        console.log(result)
      }
    }
  );
});

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM employees WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.listen(3001, () => {
  console.log("Yey, your server is running on port 3001");
});
