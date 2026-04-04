const express = require('express');
const { applyToJob, getAdminApplications, getUserApplications, updateStatus } = require('../controllers/applicationController');
const { protect, admin } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/apply', protect, applyToJob);
router.get('/my', protect, getUserApplications);
router.get('/', protect, admin, getAdminApplications);
router.put('/:id/status', protect, admin, updateStatus);

module.exports = router;