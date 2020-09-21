//import modules installed at the previous step. We need them to run Node.js server and send emails
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

// create a new Express application instance 
const app = express();

//configure the Express middleware to accept CORS requests and parse request body into JSON
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());


app.post("/", (req, res) => {

  if (!req.body) return res.sendStatus(400);
  // Все данные из формы сохраняются в req.body
  // console.log(req.body);


  var transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "afffa11a1ae811",
      pass: "8725bfee51f0d1"
    }
  });

  

  let complect = 'Косультация';

  if (req.body.complect) {
    complect = req.body.complect;
  }

  const info = `<ul>  
  <li>Имя: ${req.body.name}</li>
  <li>Телефон: ${req.body.phone}</li>
  <li>Комплект: ${complect}</li>
</ul>`;

  const mailOptions = {
    from: `ilmir2007@inbox.ru`,
    to: `ilmir2007@inbox.ru`,
    subject: 'Счастливчик',
    html: info
  };

  let result = transport.sendMail(mailOptions, function (err) {
    console.log('email sent')
    if (err) {
      console.log(err)
    }
  });

});

app.listen(3000, "127.0.0.1", () => {
  console.log("The server started on 3000");
});