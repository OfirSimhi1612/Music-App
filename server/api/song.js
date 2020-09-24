const { Router } = require('express');
const { Song, Artist, Album } = require('../models')
const { Op } = require('Sequelize')

const router = Router();


router.get('/', async (req, res) => {
    try {
        const song = await Song.findAll({
            include: [
                {
                    model: Artist,
                    attributes: ['name']
                },
                {
                    model: Album,
                    attributes: ['name']
                }
            ]
        })
        res.send(song);
    } catch (error) {
        res.status(500).send(error.massage)
    }
})

router.get('/top', async (req, res) => {
    try {
        const songs = await Song.findAll({
            include: [
                {
                    model: Artist,
                    attributes: ['name']
                },
                {
                    model: Album,
                    attributes: ['name']
                }
            ],
            limit: 20,
            order: [
                ['likes', 'DESC']
            ]
        })

        res.json(songs);
    } catch (error) {
        res.status(500).send(error.messgae)
    }
})

router.get('/:songId', async (req, res) => {
    try {
        const song = await Song.findByPk(req.params.songId, {
            include: [
                {
                    model: Artist,
                    attributes: ['name']
                },
                {
                    model: Album,
                    attributes: ['name']
                }
            ]
        })
        res.send(song);
    } catch (error) {
        res.status(400).send(error.message)
    }
})

router.get('/search/:searchInput', async (req, res) => {
    try {
        const songs = await Song.findAll({
            include: [
                {
                    model: Artist,
                    attributes: ['name']
                },
                {
                    model: Album,
                    attributes: ['name']
                }
            ],
            where: {
                title: {
                    [Op.substring]: req.params.searchInput
                }
            },
            order: [
                ['likes', 'DESC']
            ]
        })

        res.json(songs)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

router.patch('/:songId', async (req, res) => {
    try {
        const updated = await Song.update(req.body, {
            where: {
                id: req.params.songId
            }
        })

        res.send(Boolean(updated[0]))
    } catch (error) {
        res.status(500).send(error.message)
    }
})

router.patch('/like/:songId', async (req, res) => {
    try {
        let likes = await Song.findByPk(req.params.songId, {
            attributes: ['likes']
        })
        likes = req.query.like === '' ? likes.likes + 1 : likes.likes - 1
        const updated = await Song.update({ likes: likes }, {
            where: {
                id: req.params.songId
            }
        })
        res.send(Boolean(updated))
    } catch (error) {
        res.status(500).send(error.message)
    }
})

router.post('/', async (req, res) => {
    try {
        const song = await Song.create(req.body)
        res.status(201).send(song)
    } catch (error) {
        res.status(400).send(error.message)
    }
})


module.exports = router;