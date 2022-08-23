const express = require("express");
const app = express();
require("./connection");
const colors = require("colors");
const item = require("./schema");
const faker= require("faker");
const carName = require('car-names')
const cors = require('cors');
const { v4: uuidv4 } = require("uuid");

const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(cors());
app.disable("x-powered-by");
app.set("trust proxy", true);

app.get("/hello", (req, res) => {
  res.status(200).send("HELLO WORLD");
});

app.get("/", async (req, res) => {
  try {
    const data = await item.find().select('-_id');
    res.status(200).send({
      success: true,
      count: data.length,
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
    const { key } = req.query;
    console.log("apiKey: ", key);

    if (key !== "testApiKey") {
      return res.status(400).send({
        success: false,
        Response: "Key is needeed to access this api",
      });
    }

    for(var i=0; i<20; i++){
      const JsonData = {
        Customer: {
          id: uuidv4(),
          firstname: faker.name.firstName(),
          lastname: faker.name.lastName(),
          avatarUrl: faker.image.avatar(),
          email: faker.internet.email(),
          phone: faker.phone.phoneNumber(),
          hasPremium: true,
          bids: [
            Math.floor(Math.random() * 100) + 1,
            Math.floor(Math.random() * 100) + 1,
            Math.floor(Math.random() * 100) + 1,
          ],
        },
        Bid: {
          id: uuidv4(),
          carTitle: carName.random(),
          amount: faker.finance.amount(),
        },
      };

      // console.log("jsonData: ", JsonData);

      const Itemdata = new item(JsonData);
      const data = await Itemdata.save();

      if(data) console.log("data pushed")
      else console.log("data error")
    }
    
    // const Itemdata = new item(req.body);
    // console.log("Daa: ".black.bold, Itemdata);
    // const data = await Itemdata.save();
    res.status(200).send({
      success: true,
      Data: "JsonData"
    });
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
