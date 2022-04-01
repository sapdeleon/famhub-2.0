const express = require("express")
const app = express();
const mongoose = require("mongoose")

// for client connection
const cors = require("cors")

const Item = require("./models/Item")

require('dotenv').config();

app.use(express.json());
app.use(cors());

const uri = process.env.LOCAL_URI;
mongoose.connect(uri, { useNewUrlParser: true }
);

const connection = mongoose.connection;

connection.once('open', () => {
  console.log("DB connection successfully");
});

app.get("/items", (req, res) => {
  Item.find({}, (err, result) => {
    if (err) {
      res.json(err)
    } else {
      res.json(result)
    }
  })
})

app.post("/create", async (req, res) => {
  const item = req.body;
  const newItem = new Item(item);
  await newItem.save();
  res.json(item);
});

app.delete("/items/:id", (req, res) => {
  Item.findByIdAndDelete(req.params.id).then(() => res.json("Item Deleted."))
    .catch(err => res.status(400).json("Error: " + err));
});

app.post("/update/:id", (req, res) => {
  Item.findById(req.params.id).then(item => {
    item.sku = req.body.sku;
    item.description = req.body.description;
    item.supplier = req.body.supplier;
    item.qty = req.body.qty;
    item.date = req.body.date;

    item.save()
      .then(() => res.json("Item Updated."))
      .catch(err => res.status(400).json("Error: " + err));
  }).catch(err => res.status(400).json("Error: " + err));
});

app.listen(8080, () => console.log("Server listening to port 8080"));