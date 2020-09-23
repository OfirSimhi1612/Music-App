const { Router } = require('express');
const { Artist } = require('../models');

const router = Router();

router.get('/', async (req, res) => {
    try {
        const artists = await Artist.findAll()
        res.json(artists);
    } catch (error) {
        res.status(500).send(error.message)
    }
})

module.exports = router;