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

app.post("/getReservation", (req, res) => {

  const idUser = req.body.idUser;

  db.query("SELECT * FROM reservation WHERE id_user=?",[idUser], (err, result) => {
    if (err) {
      console.log(err);
    } else if (result=="") {
      console.log("pas de reservations trouvé")
      console.log(idUser)
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

app.post("/createReservation", (req, res) => {
  const horaire = req.body.horaire;
  const day = req.body.day;
  const month = req.body.month;
  const idUser = req.body.idUser;
  const idSalle = req.body.idSalle;
  const idExperience = req.body.idExperience;

  db.query(
    "INSERT INTO reservation (id_user, horaire, day, month, id_salle, id_experience) VALUES (?,?,?,?,?,?)",
    [idUser, horaire, day, month, idSalle, idExperience],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
        console.log("Succesfully insert Reservation")
      }
    }
  );
});

app.post("/idExp", (req, res) => {

  const expName = req.body.expName;

  db.query("SELECT * FROM experience WHERE nom=?",[expName], (err, result) => {
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

app.post("/searchReserv", (req, res) => {

  const idSalle = req.body.idSalle;
  const horaire = req.body.horaire;
  const day = req.body.day;
  const month = req.body.month;

  db.query("SELECT * FROM reservation WHERE id_salle=? AND month=? AND day=? AND horaire=?",[idSalle, month, Number(day), horaire], (err, result) => {
    if (err) {
      console.log(err);
    } else if (result=="") {
      console.log("pas de reservation trouvé")
      console.log(result)
      res.send(result);
    } else {
      console.log("reservation déja prise")
      res.send("Réservation déja prise");
    }
  });
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
