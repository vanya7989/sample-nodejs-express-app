const express = require('express');
const app = express();
const port = 3000;

const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

const serviceAccount = require('./key.json');

initializeApp({
    credential: cert(serviceAccount)
});

const db = getFirestore();

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.render("home");
});

app.get('/signin', (req, res) => {
  res.render("signin");
});

app.get('/signinsubmit', (req, res) => {
  const email = req.query.email;
  const password = req.query.password;

  db.collection("users")
    .where("email", "==", email)
    .where("password", "==", password)
    .get()
    .then((docs) => {
      if (docs.size > 0) {
      
        res.redirect('https://sky-boiled-homburg.glitch.me/gym.html');
      } else {
        res.render("error");
      }
    });
});

app.get('/signup', (req, res) => {
  res.render("signup");
});

app.post('/signupsubmit', (req, res) => {
  const Enter_full_name = req.body.Enter_full_name;
  const email = req.body.email;
  const password = req.body.password;
  const phone = req.body.phone;
  const birth_date = req.body.birth_date;
  const gender = req.body.gender;
  const height_cm = req.body.height_cm;
  const weight_kg = req.body.weight_kg;
  const branch = req.body.branch;
  const year_of_study = req.body.year_of_study;
  const reg_number = req.body.reg_number;
  const college = req.body.college;

  db.collection('users')
    .add({
      name: Enter_full_name,
      email: email,
      phone: phone,
      password: password,
      birth_date: birth_date,
      gender: gender,
      height_cm: height_cm,
      weight_kg: weight_kg,
      branch: branch,
      year_of_study: year_of_study,
      reg_number: reg_number,
      college: college
    })
    .then(() => {
      res.render("signin");
    });
});

app.get("/end", (req, res) => {
  res.render('end');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
