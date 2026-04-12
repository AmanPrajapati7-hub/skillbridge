const Review = require('../models/Review');
const Gig = require('../models/Gig');

const createReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const gig = await Gig.findById(req.params.gigId);
    if (!gig) return res.status(404).json({ message: 'Gig nahi mili!' });

    const review = await Review.create({
      gig: gig._id,
      buyer: req.user._id,
      seller: gig.seller,
      rating, comment
    });

    // Gig ka average rating update karo
    const allReviews = await Review.find({ gig: gig._id });
    gig.totalReviews = allReviews.length;
    gig.rating = allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length;
    await gig.save();

    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getGigReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ gig: req.params.gigId })
      .populate('buyer', 'name profilePic');
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createReview, getGigReviews };