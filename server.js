const express = require("express")
const app = express();
const mongoose = require("mongoose")

// for client connection
const cors = require("cors")

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

const itemRouter = require("./routes/itemRoutes");
const productRouter = require("./routes/productRoutes");
const saleRouter = require("./routes/saleRoutes");

app.use("/items", itemRouter);
app.use("/products", productRouter);
app.use("/sales", saleRouter);

app.listen(8080, () => console.log("Server listening to port 8080"));