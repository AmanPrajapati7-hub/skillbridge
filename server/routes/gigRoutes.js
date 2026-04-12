const express = require('express');
const router = express.Router();
const { createGig, getAllGigs, getGigById, getMyGigs, updateGig, deleteGig } = require('../controllers/gigController');
const { protect, sellerOnly } = require('../middleware/authMiddleware');

router.get('/', getAllGigs);
router.get('/my', protect, sellerOnly, getMyGigs);
router.get('/:id', getGigById);
router.post('/', protect, sellerOnly, createGig);
router.put('/:id', protect, sellerOnly, updateGig);
router.delete('/:id', protect, sellerOnly, deleteGig);

module.exports = router;