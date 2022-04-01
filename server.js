const express = require("express")
const app = express();
const mongoose = require("mongoose")

// for client connection
const cors = require("cors")

// models
const Item = require("./models/Item")
const Product = require("./models/Product")
const Sale = require("./models/Sale")

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

//////////////// ITEMS SECTION //////////////////////

app.get("/items", (req, res) => {
  Item.find({}, (err, result) => {
    if (err) {
      res.json(err)
    } else {
      res.json(result)
    }
  })
})

app.post("/items/create", async (req, res) => {
  const item = req.body;
  const newItem = new Item(item);
  await newItem.save();
  res.json(item);
});

app.delete("/items/:id", (req, res) => {
  Item.findByIdAndDelete(req.params.id).then(() => res.json("Item Deleted."))
    .catch(err => res.status(400).json("Error: " + err));
});

app.post("/items/update/:id", (req, res) => {
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

//////////////// PRODUCTS SECTION //////////////////////

app.get("/products", (req, res) => {
  Product.find({}, (err, result) => {
    if (err) {
      res.json(err)
    } else {
      res.json(result)
    }
  })
});

app.post("/products/create", async (req, res) => {
  const product = req.body;
  const newProduct = new Product(product);
  await newProduct.save();
  res.json(product);
});

app.delete("/products/:id", (req, res) => {
  Product.findByIdAndDelete(req.params.id).then(() => res.json("Product Deleted."))
    .catch(err => res.status(400).json("Error: " + err));
});

app.post("/products/update/:id", (req, res) => {
  Product.findById(req.params.id).then(product => {
    product.sku = req.body.sku;
    product.description = req.body.description;
    product.type = req.body.type;
    product.color = req.body.color;
    product.size = req.body.size;
    product.name = req.body.name;
    product.supplier = req.body.supplier;
    product.date = req.body.date;

    product.save()
      .then(() => res.json("Product Updated."))
      .catch(err => res.status(400).json("Error: " + err));
  }).catch(err => res.status(400).json("Error: " + err));
});

//////////////// SALES SECTION //////////////////////

app.get("/sales", (req, res) => {
  Sale.find({}, (err, result) => {
    if (err) {
      res.json(err)
    } else {
      res.json(result)
    }
  })
});

app.post("/sales/create", async (req, res) => {
  const sale = req.body;
  const newSale = new Sale(sale);
  await newSale.save();
  res.json(sale);
});

app.delete("/sales/:id", (req, res) => {
  Sale.findByIdAndDelete(req.params.id).then(() => res.json("Sale Deleted."))
    .catch(err => res.status(400).json("Error: " + err));
});

app.post("/sales/update/:id", (req, res) => {
  Sale.findById(req.params.id).then(sale => {
    sale.sku = req.body.sku;
    sale.description = req.body.description;
    sale.cost = req.body.cost;
    sale.qty = req.body.qty;
    sale.total = req.body.cost * req.body.qty;
    sale.date = req.body.date;

    sale.save()
      .then(() => res.json("Sale Updated."))
      .catch(err => res.status(400).json("Error: " + err));
  }).catch(err => res.status(400).json("Error: " + err));
});

app.listen(8080, () => console.log("Server listening to port 8080"));