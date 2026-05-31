const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Order = require('../models/Order');
const { protect } = require('../middleware/auth');

router.get('/', async (req, res) => {
  const products = await Product.find().populate('seller', 'name');
  res.json(products);
});

router.post('/', protect, async (req, res) => {
  const product = await Product.create({ ...req.body, seller: req.user.id });
  res.status(201).json(product);
});

router.post('/orders', protect, async (req, res) => {
  const order = await Order.create({ ...req.body, buyer: req.user.id });
  res.json(order);
});

module.exports = router;
