const express = require('express');
const router = express.Router();
const HEROES = require('../../mock/Heroes');

// Get all heroes
router.get('/', (req, res) => {
  res.json(HEROES);
});

// Get single hero
router.get('/:id', (req, res) => {
  const index = HEROES.findIndex(hero => hero.id === parseInt(req.params.id));
  if (index > -1) {
    res.json(HEROES[index]);
  } else {
    res.status(400).json({
      message: `No hero with the id of ${req.params.id}`
    });
  }
});

// Add hero
router.post('/', (req, res) => {
  const newHero = {
    id: genId(),
    name: req.body.name
  };

  if (!newHero.name) {
    return res.status(400).json({
      message: 'Please include a name'
    });
  }

  HEROES.push(newHero);
  res.json(newHero);
});

// Update hero
router.put('/:id', (req, res) => {
  const updateIndex = HEROES.findIndex(
    hero => hero.id === parseInt(req.params.id)
  );
  if (updateIndex > -1) {
    HEROES[updateIndex].name = req.body.name;
    res.json({
      message: 'Hero updated'
    });
  } else {
    res.status(400).json({
      message: `No hero with the id of ${req.params.id}`
    });
  }
});

// Delete hero
router.delete('/:id', (req, res) => {
  const deleteIndex = HEROES.findIndex(
    hero => hero.id === parseInt(req.params.id)
  );

  if (deleteIndex > -1) {
    HEROES.splice(deleteIndex, 1);
    res.json({
      message: 'Hero deleted'
    });
  } else {
    res.status(400).json({
      message: `No hero with the id of ${req.params.id}`
    });
  }
});

function genId() {
  return HEROES.length > 0 ? Math.max(...HEROES.map(hero => hero.id)) + 1 : 11;
}

module.exports = router;
