import express from "express";
import Cors from "cors";
import mongoose from "mongoose";
const connection_url =
  "mongodb+srv://admin:ZIik5MD3R6Z0HEGp@cluster0.tn9zd.mongodb.net/tinderdb?retryWrites=true&w=majority";
import Cards from "./dbcard.js";

// App config
const app = express();
const port = process.env.PORT || 8001;

// Middleware
app.use(express.json())
app.use(Cors())

// DB Config
mongoose.connect(connection_url, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

// API Endpoint
app.get("/", (req, res) => res.status(200).send("hello world...!!!"));

app.post("/tinder/card", (req, res) => {
  const dbCard = req.body;

  Cards.create(dbCard, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

app.get("/tinder/card", (req, res) => {
  Cards.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

// Listener
app.listen(port, () => console.log(`listening on localhost:  ${port}`));
