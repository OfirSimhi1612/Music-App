const { Router } = require('express');

const router = Router();


router.use('/artist', require('./artist'));
router.use('/album', require('./album'));
router.use('/song', require('./song'));
router.use('/playlist', require('./playlist'));
router.use('/user', require('./user'));
router.use('/auth', require('./auth'));

module.exports = router;