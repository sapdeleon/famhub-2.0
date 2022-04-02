const router = require("express").Router();
const Product = require("../models/Product");

//////////////////// PRODUCTS SECTION //////////////////////

router.route("/").get((req, res) => {
  Product.find({}, (err, result) => {
    if (err) {
      res.json(err)
    } else {
      res.json(result)
    }
  })
});

router.route("/create").post(async (req, res) => {
  const product = req.body;
  const newProduct = new Product(product);
  await newProduct.save();
  res.json(product);
});

router.route("/:id").delete((req, res) => {
  Product.findByIdAndDelete(req.params.id).then(() => res.json("Product Deleted."))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
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

module.exports = router;