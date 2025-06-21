const express = require('express');
const {
  listStarships,
  getStarship,
  createStarship,
  updateStarship,
  deleteStarship
} = require('../controllers/starship');

const router = express.Router();

router.get('/',              listStarships);
router.get('/:registry',     getStarship);
router.post('/',             createStarship);
router.put('/:registry',     updateStarship);
router.delete('/:registry',  deleteStarship);

module.exports = router;
