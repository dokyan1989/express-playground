const express = require('express');
const router = express.Router();
const makeCallback = require('../../../helpers/express-callback');
const {
  createHero,
  updateHero,
  deleteHero,
  getHeroes,
  getHeroById
} = require('../../../controllers/hero');

router.get('/', makeCallback(getHeroes));
router.get('/:id', makeCallback(getHeroById));
router.post('/', makeCallback(createHero));
router.put('/:id', makeCallback(updateHero));
router.put('/', makeCallback(updateHero));
router.delete('/:id', makeCallback(deleteHero));
router.delete('/', makeCallback(deleteHero));

module.exports = router;
