const express = require("express");
const app = express();
require("./connection");
const colors = require("colors");
const item = require("./schema");

const PORT = process.env.PORT || 8000;

app.use(express.json());

app.get("/hello", (req, res) => {
  res.status(200).send("HELLO WORLD");
});

app.get("/", async (req, res) => {
  try {
    const data = await item.find();
    console.log("Data: ".black.bold, data)
    res.status(200).send({
      success: true,
      Data: data,
    });
  } catch (e) {
    res.status(400).send({
      success: false,
      Response: "Something went wrong!",
    });
  }
});

app.post("/item", async (req, res) => {
  try {
    const {key} = req.query;
    console.log("apiKey: ", key);

    if (key !== "testApiKey") {
      return res.status(400).send({
        success: false,
        Response: "Key is needeed to access this api",
      });
    }

    const Itemdata = new item(req.body);
    console.log("Daa: ".black.bold, Itemdata);
    const data = await Itemdata.save();
    res.status(200).send({
      success: true,
      Data: data,
    })

  } catch (e) {
    res.status(400).send({
      success: false,
      Response: "Something went wrong!",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server connection at port ${PORT}`.blue.bold);
});
