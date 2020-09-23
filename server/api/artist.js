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

router.get('/:artistId', async (req, res) => {
    try {
        const artist = await Artist.findByPk(req.params.artistId);
        res.json(artist)
    } catch (error) {
        res.status(400).send(error.message);
    }
})

router.post('/', async (req, res) => {
    try {
        const newArtist = await Artist.create(req.body);
        res.status(201).send(newArtist);
    } catch (error) {
        res.status(500).send(error.message);
    }
})

module.exports = router;