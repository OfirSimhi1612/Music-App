const { Router } = require('express');
const { Album } = require('../models');

const router = Router();


router.get('/', async (req, res) => {
    try {
        const albums = await Album.findAll()
        res.json(albums);
    } catch (error) {
        res.status(500).send(error.message)
    }
})

router.get('/:albumId', async (req, res) => {
    try {
        const album = await Album.findByPk(req.params.albumId)
        res.json(album);
    } catch (error) {
        res.status(400).send(error.message)
    }
})

router.post('/', async (req, res) => {
    try {
        const album = await Album.create(req.body)
        res.status(201).json(album);
    } catch (error) {
        res.status(400).send(error.message)
    }
})

module.exports = router;