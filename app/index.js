import express from "express";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";

import { connect as mongooseConnect } from "./db/mongoose-connection";
import User from "./models/User";
import Message from "./models/Message"
import Frend from "./models/Frend"
import Like from "./models/Like"

import { secret } from "./config";
import { withAuth } from "./db/middleware";
import { version } from "./config"

const app = express();
app.use(bodyParser.json());

app.get("/api/home", function (req, res) {
  res.status(200).send("Welcome!");
});

app.get("/api/version", function (req, res) {
  res.status(200).send(version);
});
app.get("/addlike", async (req, res) => {
  try {
    const { message, nickname } = req.query;
    //const user = new User({ email, password });
    //await user.save();
    //console.log(from)
    //console.log(to)
    let time = Date.now()
    const frend = new Like({ message, nickname })
    await frend.save()

    const mess = await Message.findOne({ _id: message })
    console.log(mess)
    if (mess.likecount) {
      console.log(mess.likecount)
      mess.likecount += 1
    }
    else {
      console.log("like undefined")
      mess.likecount = 1
    }
    console.log(mess)
    await mess.save()
    //const allMessages = await Message.find()
    time -= 24 * 60 * 60 * 1000

    const allMessages = await Message.find({ time: { $gt: time } })


    res.status(200).json({ data: allMessages })
  } catch (err) {
    console.log(err);
    res.status(500).send("Error registering new user please try again.");
  }
});
app.get("/addfrend", async (req, res) => {
  try {
    const { from, to, nickname } = req.query;
    //const user = new User({ email, password });
    //await user.save();
    console.log(from)
    console.log(to)
    let time = Date.now()
    const frend = new Frend({ from, to, nickname })
    await frend.save()
    //const allMessages = await Message.find()
    time -= 24 * 60 * 60 * 1000

    const allMessages = await Message.find({ time: { $gt: time } })


    res.status(200).json({ data: allMessages })
  } catch (err) {
    console.log(err);
    res.status(500).send("Error registering new user please try again.");
  }
});



app.get("/send", async (req, res) => {
  try {
    const { user, message, city, data, to } = req.query;
    //const user = new User({ email, password });
    //await user.save();
    console.log(user)
    console.log(message)
    console.log(city)

    let time = Date.now()
    if (!data) {
      console.log("data undefiner")
      if (!to) {
        const mess = new Message({ user, message, city, time, data: "", to: "" })
        await mess.save()
      } else {
        const mess = new Message({ user, message, city, time, data: "", to })
        await mess.save()

      }
    } else {
      if (!to) {
        const mess = new Message({ user, message, city, time, data, to: "" })
        await mess.save()
      } else {
        const mess = new Message({ user, message, city, time, data, to })
        await mess.save()

      }

    }

    //const allMessages = await Message.find()
    time -= 24 * 60 * 60 * 1000

    //const allMessages = await Message.find({ time: { $gt: time } })
    const allMessages = await Message.find({ city })

    res.status(200).json({ data: allMessages })
  } catch (err) {
    console.log(err);
    res.status(500).send("Error registering new user please try again.");
  }
});

app.get("/messages", async (req, res) => {
  try {
    let time = Date.now()
    time -= 24 * 60 * 60 * 1000

    const allMessages = await Message.find({ time: { $gt: time } })
    res.status(200).json({ data: allMessages })
  } catch (err) {
    console.log(err);
    res.status(500).send("Error registering new user please try again.");
  }
});

app.get("/getfrends", async (req, res) => {
  try {
    const { to } = req.query;
    //let time = Date.now()
    //time -= 24 * 60 * 60 * 1000

    const all = await Frend.find({ to })
    res.status(200).json({ data: all })
  } catch (err) {
    console.log(err);
    res.status(500).send("Error registering new user please try again.");
  }
});
app.get("/getlikes", async (req, res) => {
  try {
    const { nickname } = req.query;
    //let time = Date.now()
    //time -= 24 * 60 * 60 * 1000

    const all = await Like.find({ nickname })
    res.status(200).json({ data: all })
  } catch (err) {
    console.log(err);
    res.status(500).send("Error registering new user please try again.");
  }
});
app.get("/from_city", async (req, res) => {
  try {
    const { city } = req.query;
    const allMessages = await Message.find({ city })
    res.status(200).json({ data: allMessages })
  } catch (err) {
    console.log(err);
    res.status(500).send("Error registering new user please try again.");
  }
});

app.get("/from_city_last_day", async (req, res) => {
  try {
    const { city } = req.query;
    let time = Date.now()
    time -= 24 * 60 * 60 * 1000
    const allMessages = await Message.find({ city, time: { $gt: time } })
    res.status(200).json({ data: allMessages })
  } catch (err) {
    console.log(err);
    res.status(500).send("Error registering new user please try again.");
  }
});

app.get("/count_messages", async (req, res) => {
  try {
    const allMessages = await Message.find()
    res.status(200).json({ count: allMessages.length })
  } catch (err) {
    console.log(err);
    res.status(500).send("Error registering new user please try again.");
  }
});

app.get("/count_from_city", async (req, res) => {
  try {
    const { city } = req.query;
    const allMessages = await Message.find({ city })
    res.status(200).json({ count: allMessages.length })
  } catch (err) {
    console.log(err);
    res.status(500).send("Error registering new user please try again.");
  }
});

app.get("/count_from_city_last_day", async (req, res) => {
  try {
    const { city } = req.query;
    let time = Date.now()
    time -= 24 * 60 * 60 * 1000
    const allMessages = await Message.find({ city, time: { $gt: time } })
    res.status(200).json({ count: allMessages.length })
  } catch (err) {
    console.log(err);
    res.status(500).send("Error registering new user please try again.");
  }
});

app.get("/info", async (req, res) => {
  try {
    let time = Date.now()
    time -= 24 * 60 * 60 * 1000

    const allCity = await Message.distinct('city')
    console.log(allCity)
    let result = []

    for (const city of allCity) {
      const allMessages = await Message.find({ city })
      const allMessagesLastDay = await Message.find({ city, time: { $gt: time } })
      result.push({ city, all: allMessages.length, lastDay: allMessagesLastDay.length })
    }

    res.status(200).json({ data: result })
  } catch (err) {
    console.log(err);
    res.status(500).send("Error registering new user please try again.");
  }
});


// POST route to register a user
app.post("/api/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = new User({ email, password });
    await user.save();
    res.status(200).send("Welcome to the club!");
  } catch (err) {
    console.log(err);
    res.status(500).send("Error registering new user please try again.");
  }
});

app.post("/api/authenticate", async (req, res) => {
  const { email, password } = req.body;
  console.log(`email:${email} password:${password}`);
  try {
    const user = await User.findOne({ email }).exec();
    if (!user) {
      res.status(401).json({
        error: "Incorrect email or password (44)",
      });
      return;
    }
    const same = await user.isCorrectPassword(password);
    if (!same) {
      res.status(401).json({
        error: "Incorrect email or password (56)",
      });
      return;
    }
    const payload = { email };
    const token = jwt.sign(payload, secret, {
      expiresIn: "1h",
    });
    res.status(200).send({ token });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Internal error please try again",
    });
  }
});

app.get("/api/secret", withAuth, (req, res) => {
  res.status(200).send("The password is potato, but this secret");
  console.log(req.email);
});

app.get("/api/checkToken", withAuth, (req, res) => {
  res.sendStatus(200);
});

app.get("/api/getUserProfile", withAuth, async (req, res) => {
  const user = await User.findOne({ email: req.email }).exec();
  if (!user) {
    res.status(404).json({
      error: "User not found",
    });
    return;
  }
  res.status(200).json(user);
});

app.get("/api/updateUserProfile", withAuth, async (req, res) => {
  const user = await User.findOne({ email: req.email }).exec();
  if (!user) {
    res.status(404).json({
      error: "User not found",
    });
    return;
  }
  const { profile } = req.body;
  user.profile = profile;
  await user.save();
  res.status(200).json(user);
});

const connect = async () => {
  try {
    await mongooseConnect();
    let port = process.env.PORT;
    if (!port) {
      port = 3001;
    }
    await app.listen(port);

    console.log("listening on port 3001");
  } catch (err) {
    console.log(err);
  }
};
console.log("Hello")
connect();
