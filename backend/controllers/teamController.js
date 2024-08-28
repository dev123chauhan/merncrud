const Team = require('../models/Team');
const User = require('../models/User');

exports.createTeam = async (req, res) => {
  const { name, memberIds } = req.body;

  try {
    const users = await User.find({ _id: { $in: memberIds } });

    // Check for unique domains and availability
    const domains = new Set();
    for (const user of users) {
      if (!user.available) {
        return res.status(400).json({ message: `User ${user.first_name} is not available` });
      }
      if (domains.has(user.domain)) {
        return res.status(400).json({ message: `Duplicate domain: ${user.domain}` });
      }
      domains.add(user.domain);
    }

    const team = new Team({ name, members: memberIds });
    const newTeam = await team.save();
    res.status(201).json(newTeam);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getTeam = async (req, res) => {
  try {
    const team = await Team.findById(req.params.id).populate('members');
    if (!team) return res.status(404).json({ message: 'Team not found' });
    res.json(team);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};