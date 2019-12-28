const express = require('express');
const router = express.Router();
const { makeHandlerCallback } = require('../../../helpers/express-callback');
const {
  createHero,
  updateHero,
  deleteHero,
  getHeroes,
  getHeroById
} = require('../../../controllers/hero');

router.get('/', makeHandlerCallback(getHeroes));
router.get('/:id', makeHandlerCallback(getHeroById));
router.post('/', makeHandlerCallback(createHero));
router.put('/:id', makeHandlerCallback(updateHero));
router.put('/', makeHandlerCallback(updateHero));
router.delete('/:id', makeHandlerCallback(deleteHero));
router.delete('/', makeHandlerCallback(deleteHero));

module.exports = router;
