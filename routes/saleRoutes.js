const router = require("express").Router();
const Sale = require("../models/Sale");

//////////////// SALES SECTION //////////////////////

router.route("/").get((req, res) => {
  Sale.find({}, (err, result) => {
    if (err) {
      res.json(err)
    } else {
      res.json(result)
    }
  })
});

router.route("/create").post(async (req, res) => {
  const sale = req.body;
  const newSale = new Sale(sale);
  await newSale.save()

  res.json(sale);
});

router.route("/:id").delete((req, res) => {
  Sale.findByIdAndDelete(req.params.id).then(() => res.json("Sale Deleted."))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
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

module.exports = router;