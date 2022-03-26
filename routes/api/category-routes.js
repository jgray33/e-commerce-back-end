const router = require("express").Router();
const { Category, Product } = require("../../models");
const { sync } = require("../../models/Product");

// The `/api/categories` endpoint

// find all categories
// be sure to include its associated Products
router.get("/", async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// find one category by its `id` value
// be sure to include its associated Products
router.get("/:id", async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", (req, res) => {
    Category.create({
      name: req.body.title,
    })
    .then((newCategory) => {
      res.json(newCategory)
      .catch((err) => {
        res.json(err)
      })
 });

 // update a category by its `id` value
router.put("/:id", (req, res) => {
 Category.update({
   name: req.body.name,
 }, 
 {
   where: {
     category_id: req.params.id
   },
 }
 )
 .then((updatedCategory) => {
   res.json(updatedCategory);
    })
    .catch((err) => {
      res.json(err)
    })
});

router.delete("/:id", (req, res) => {
Category.destroy({
  where: {
    category_id:req.params.category_id
  },
})
.then((deletedCategory) => {
  res.json(deletedCategory)
})
.catch((err) => res.json(err))
});

module.exports = router;
