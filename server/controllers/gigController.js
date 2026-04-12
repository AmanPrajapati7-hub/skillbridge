const Gig = require('../models/Gig');

// Gig banao (seller only)
const createGig = async (req, res) => {
  try {
    const { title, description, category, price, deliveryDays, image } = req.body;
    const gig = await Gig.create({
      seller: req.user._id,
      title, description, category, price, deliveryDays, image
    });
    res.status(201).json(gig);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Saari gigs dekho (buyer browse kare)
const getAllGigs = async (req, res) => {
  try {
    const { category, search } = req.query;
    let filter = {};
    if (category) filter.category = category;
    if (search) filter.title = { $regex: search, $options: 'i' };
    const gigs = await Gig.find(filter).populate('seller', 'name profilePic rating');
    res.json(gigs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Ek gig detail dekho
const getGigById = async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.id).populate('seller', 'name profilePic rating description');
    if (!gig) return res.status(404).json({ message: 'Gig nahi mili!' });
    res.json(gig);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Apni gigs dekho (seller dashboard)
const getMyGigs = async (req, res) => {
  try {
    const gigs = await Gig.find({ seller: req.user._id });
    res.json(gigs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Gig update karo
const updateGig = async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.id);
    if (!gig) return res.status(404).json({ message: 'Gig nahi mili!' });
    if (gig.seller.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Tumhari gig nahi hai!' });
    }
    const updated = await Gig.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Gig delete karo
const deleteGig = async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.id);
    if (!gig) return res.status(404).json({ message: 'Gig nahi mili!' });
    if (gig.seller.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Tumhari gig nahi hai!' });
    }
    await gig.deleteOne();
    res.json({ message: 'Gig delete ho gayi!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createGig, getAllGigs, getGigById, getMyGigs, updateGig, deleteGig };