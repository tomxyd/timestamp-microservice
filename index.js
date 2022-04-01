const express = require("express");
const Joi = require("joi");
const app = express();

app.use(express.static("public"));

const checkHex = (string) => {
     let re = /[0-9A-Fa-f]{6}/g;
     if (re.test(string)) {
          return parseInt(string);
     } else {
          return string;
     }
};

app.get("/", (req, res) => {
     res.sendFile(__dirname + "/views/index.html");
});

app.get("/api/hello", (req, res) => {
     res.json(json);
});

app.get("/api", (req, res) => {
     let unix = new Date().getTime();
     let utc = new Date().toUTCString();
     res.json({ unix: unix, utc: utc });
});

app.get("/api/:date", (req, res) => {
     let userDate = req.params.date;

     const schema = Joi.string().allow("").regex(/^\d+$/);
     const result = schema.validate(userDate);

     if (result.error) res.json({ error: "Invalid Date" });
     //parsing Hex code
     userDate = checkHex(userDate);

     let unix = new Date(userDate).getTime();
     let utc = new Date(userDate).toUTCString();

     res.json({ unix: unix, utc: utc });
});

app.listen(3000, () => "Listening..");
