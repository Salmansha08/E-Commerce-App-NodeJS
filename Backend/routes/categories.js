const { Category } = require('../models/category');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    Category.find()
      .then(categoryList => {
        if (!categoryList) {
          return res.status(500).json({ success: false });
        }
        res.send(categoryList);
      })
      .catch(error => {
        // Tangani kesalahan jika terjadi
        res.status(500).json({ success: false, error: error.message });
      });
  });

router.post('/', async (req, res) => {
    let category = new Category({
        name: req.body.name,
        icon: req.body.icon,
        color: req.body.color
    })

    category = await category.save();

    if (!category)
        return res.status(404).send('the category cannot be created!')

    res.send(category);
})

router.delete('/:id', (req, res) => {
    Category.findByIdAndRemove(req.params.id).then(category => {
        if (category) {
            return res.status(200).json({ success: true, message: 'the category has been deleted!' });
        } else {
            return res.status(404).json({ success: false, message: 'the category not found!' });
        }
    }).catch(err => {
        return res.status(400).json({ success: false, error: err })
    })
})

module.exports = router;