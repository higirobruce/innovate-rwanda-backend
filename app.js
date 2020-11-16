const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv/config');

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// enable cors
app.use(cors());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
    );
  
    if (req.method === "OPTIONS") {
      res.header("Access-Control-Allow-Methods", "PUT, POST, GET");
      return res.status(400).json({
        status: 400,
        accepted: "PUT, POST, GET",
      });
    }
    return next();
  });

const routes = require('./routes');
app.use(routes);

app.listen(process.env.PORT);