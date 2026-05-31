const express = require('express');
const router = express.Router();
const { getMyTeams, createTeam, joinTeam } = require('../controllers/teamController');
const { protect } = require('../middleware/auth');

router.get('/my-teams', protect, getMyTeams);
router.post('/', protect, createTeam);
router.post('/join/:code', protect, joinTeam);

module.exports = router;
