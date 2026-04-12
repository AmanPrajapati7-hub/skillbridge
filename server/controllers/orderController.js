const Order = require('../models/Order');
const Gig = require('../models/Gig');

// Order place karo
const createOrder = async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.gigId);
    if (!gig) return res.status(404).json({ message: 'Gig nahi mili!' });

    const order = await Order.create({
      gig: gig._id,
      buyer: req.user._id,
      seller: gig.seller,
      price: gig.price
    });
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Apne orders dekho
const getMyOrders = async (req, res) => {
  try {
    let orders;
    if (req.user.role === 'buyer') {
      orders = await Order.find({ buyer: req.user._id })
        .populate('gig', 'title image price')
        .populate('seller', 'name profilePic');
    } else {
      orders = await Order.find({ seller: req.user._id })
        .populate('gig', 'title image price')
        .populate('buyer', 'name profilePic');
    }
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Order status update karo (seller)
const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order nahi mila!' });
    if (order.seller.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Tumhara order nahi hai!' });
    }
    order.status = req.body.status;
    await order.save();
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createOrder, getMyOrders, updateOrderStatus };