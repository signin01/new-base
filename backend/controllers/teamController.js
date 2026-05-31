const Team = require('../models/Team');
const crypto = require('crypto');

exports.getMyTeams = async (req, res) => {
  try {
    const teams = await Team.find({ 'members.user': req.user.id }).populate('owner', 'name');
    res.json({ success: true, teams });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createTeam = async (req, res) => {
  try {
    const inviteCode = crypto.randomBytes(6).toString('hex');
    const team = await Team.create({
      ...req.body,
      owner: req.user.id,
      inviteCode,
      members: [{ user: req.user.id, role: 'admin' }]
    });
    res.status(201).json({ success: true, team });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.joinTeam = async (req, res) => {
  try {
    const team = await Team.findOne({ inviteCode: req.params.code });
    if (!team) return res.status(404).json({ success: false, message: 'Invalid invite code' });
    if (team.members.some(m => m.user.toString() === req.user.id)) {
      return res.status(400).json({ success: false, message: 'Already a member' });
    }
    team.members.push({ user: req.user.id, role: 'member' });
    await team.save();
    res.json({ success: true, team });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
