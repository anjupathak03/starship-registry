const Starship = require('../models/Starship');

// GET /starfleet/starships
exports.listStarships = async (_, res) => {
  try {
    const ships = await Starship.find();
    res.json(ships);
  } catch (err) {
    console.error('Error fetching starships:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// GET /starfleet/starships/:registry
exports.getStarship = async (req, res) => {
  try {
    const ship = await Starship.findOne({ registryNumber: req.params.registry });
    return ship ? res.json(ship) : res.status(404).json({ message: 'Starship not found' });
  } catch (err) {
    console.error('Error fetching starship:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// POST /starfleet/starships
exports.createStarship = async (req, res) => {
  try {
    const ship = await Starship.create(req.body);
    res.status(201).json(ship);
  } catch (err) {
    console.error('Error creating starship:', err);
    res.status(400).json({ error: err.message });
  }
};

// PUT /starfleet/starships/:registry
exports.updateStarship = async (req, res) => {
  try {
    const ship = await Starship.findOneAndUpdate(
      { registryNumber: req.params.registry },
      req.body,
      { new: true, runValidators: true }
    );
    return ship ? res.json(ship) : res.status(404).json({ message: 'Starship not found' });
  } catch (err) {
    console.error('Error updating starship:', err);
    res.status(400).json({ error: 'Bad request' });
  }
};

// DELETE /starfleet/starships/:registry
exports.deleteStarship = async (req, res) => {
  try {
    const result = await Starship.deleteOne({ registryNumber: req.params.registry });
    if (result.deletedCount === 1) {
      res.json({ deleted: true });
    } else {
      res.status(404).json({ message: 'Starship not found' });
    }
  } catch (err) {
    console.error('Error deleting starship:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};