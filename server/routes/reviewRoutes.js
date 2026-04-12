const express = require('express');
const router = express.Router();
const { createReview, getGigReviews } = require('../controllers/reviewController');
const { protect } = require('../middleware/authMiddleware');

router.post('/:gigId', protect, createReview);
router.get('/:gigId', getGigReviews);

module.exports = router;