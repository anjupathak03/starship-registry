const Starship = require('../models/Starship');

// GET /starfleet/starships
exports.listStarships = async (_, res) => {
  const ships = await Starship.find();
  res.json(ships);
};

// GET /starfleet/starships/:registry
exports.getStarship = async (req, res) => {
  const ship = await Starship.findOne({ registryNumber: req.params.registry });
  return ship ? res.json(ship) : res.status(404).json({ message: 'Not found' });
};

// POST /starfleet/starships
exports.createStarship = async (req, res) => {
  try {
    const ship = await Starship.create(req.body);
    res.status(201).json(ship);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// PUT /starfleet/starships/:registry
exports.updateStarship = async (req, res) => {
  const ship = await Starship.findOneAndUpdate(
    { registryNumber: req.params.registry },
    req.body,
    { new: true, runValidators: true }
  );
  return ship ? res.json(ship) : res.status(404).json({ message: 'Not found' });
};

// DELETE /starfleet/starships/:registry
exports.deleteStarship = async (req, res) => {
  const result = await Starship.deleteOne({ registryNumber: req.params.registry });
  res.json({ deleted: result.deletedCount === 1 });
};
