import express from "express";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";

import { connect as mongooseConnect } from "./db/mongoose-connection";
import User from "./models/User";

import { secret } from "./config";
import { withAuth } from "./db/middleware";

const app = express();
app.use(bodyParser.json());

app.get("/api/home", function(req, res) {
  res.send("Welcome!");
});

// POST route to register a user
app.post("/api/register", function(req, res) {
  const { email, password } = req.body;
  const user = new User({ email, password });
  user.save(err => {
    if (err) {
      res.status(500).send("Error registering new user please try again.");
    } else {
      res.status(200).send("Welcome to the club!");
    }
  });
});

app.post("/api/authenticate", function(req, res) {
  const { email, password } = req.body;
  User.findOne({ email }, function(err, user) {
    if (err) {
      console.error(err);
      res.status(500).json({
        error: "Internal error please try again"
      });
    } else if (!user) {
      res.status(401).json({
        error: "Incorrect email or password (44)"
      });
    } else {
      user.isCorrectPassword(password, function(err, same) {
        if (err) {
          res.status(500).json({
            error: "Internal error please try again"
          });
        } else if (!same) {
          res.status(401).json({
            error: "Incorrect email or password (56)"
          });
        } else {
          // Issue token
          const payload = { email };
          const token = jwt.sign(payload, secret, {
            expiresIn: "1h"
          });
          //res.cookie('token', token, { httpOnly: true })
          // .sendStatus(200);
          res.status(200).send({ token });
        }
      });
    }
  });
});

app.get("/api/secret", withAuth, function(req, res) {
  res.status(200).send("The password is potato, but this secret");
  console.log(req.email);
});

app.get("/checkToken", withAuth, function(req, res) {
  res.sendStatus(200);
});

mongooseConnect()
  .then(() => {
    app.listen(3001, async () => {
      console.log("listening on port 3001");
    });
  })
  .catch(error => console.error(error));
