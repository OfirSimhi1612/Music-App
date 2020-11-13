const { Router } = require('express');
const morgan = require('morgan');
const { updateSearchFromDB } = require('../elastic_search') 

const router = Router();

router.use(morgan('dev'))

router.use('/artist', require('./artist'));
router.use('/album', require('./album'));
router.use('/song', require('./song'));
router.use('/playlist', require('./playlist'));
router.use('/user', require('./user'));
router.use('/library', require('./library'));
router.use('/search', require('./search'));

setInterval(updateSearchFromDB, 60000)

module.exports = router;