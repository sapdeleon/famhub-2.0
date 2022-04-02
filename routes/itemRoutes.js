const router = require("express").Router();
const Item = require("../models/Item");

//////////////// ITEMS SECTION //////////////////////

router.route("/").get((req, res) => {
  Item.find()
    .then(items => res.json(items))
    .catch(err => res.status(404).json("Error: " + err));
})

router.route("/create").post(async (req, res) => {
  const item = req.body;
  const newItem = new Item(item);
  await newItem.save()

  res.json(item);
});

router.route("/:id").get((req, res) => {
  Item.findById(req.params.id)
    .then(item => res.json(item))
    .catch(err => res.status(404).json("Error: " + err));
})

router.route("/:id").delete((req, res) => {
  Item.findByIdAndDelete(req.params.id)
    .then(() => res.json("Item Deleted."))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
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

module.exports = router;