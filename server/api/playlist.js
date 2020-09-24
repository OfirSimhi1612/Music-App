const { Router } = require('express');
const { Song, Artist, Album, Playlist, Songs_in_playlist } = require('../models');
const { Op } = require('Sequelize')


const router = Router();


router.get('/', async (req, res) => {
    try {
        const playlists = await Playlist.findAll();

        res.json(playlists)
    } catch (error) {
        res.status(500).send(error.message);
    }
})

router.get('/top', async (req, res) => {
    try {
        const playlists = await Playlist.findAll({
            order: [
                ['likes', 'DESC']
            ],
            limit: 20
        })
        res.json(playlists)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

router.get('/songs/:playlistId', async (req, res) => {
    try {
        const songs = await Playlist.findByPk(req.params.playlistId, {
            include: [
                {
                    model: Song,
                    include: [
                        {
                            model: Artist,
                            attributes: ['name']
                        },
                        {
                            model: Album,
                            attributes: ['name']
                        },
                    ],
                    through: {
                        attributes: ['index']
                    }

                }
            ],
            where: {
                id: req.params.playlistId
            },
            attributes: [],
            // raw: true
        })

        res.json(songs.Songs)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

router.get('/search/:searchInput', async (req, res) => {
    try {
        const playlists = await Playlist.findAll({
            where: {
                name: {
                    [Op.substring]: req.params.searchInput
                }
            }
        })

        res.json(playlists)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

router.get('/:playlistId', async (req, res) => {
    try {
        const playlist = await Playlist.findByPk(req.params.playlistId)
        if (!playlist) {
            res.status(404).send('invalid Id')
        }
        res.json(playlist)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

router.patch('/:playlistId', async (req, res) => {
    try {
        const updated = await Playlist.update(req.body, {
            where: {
                id: req.params.playlistIdId
            }
        })

        res.send(Boolean(updated[0]))
    } catch (error) {
        res.status(500).send(error.message)
    }
})

router.patch('/like/:playlistId', async (req, res) => {
    try {
        let likes = await Playlist.findByPk(req.params.playlistId, {
            attributes: ['likes']
        })
        likes = req.query.like === '' ? likes.likes + 1 : likes.likes - 1
        const updated = await Playlist.update({ likes: likes }, {
            where: {
                id: req.params.playlistId
            }
        })
        res.send(Boolean(updated))
    } catch (error) {
        res.status(500).send(error.message)
    }
})

router.post('/', async (req, res) => {
    try {
        const playlist = await Playlist.create(req.body)
        res.status(201).json(playlist);
    } catch (error) {
        res.status(400).send(message.error)
    }
})

router.post('/song', async (req, res) => {
    try {
        const body = { ...req.body, index: await Songs_in_playlist.getIndex(req.body.playlistId) }
        const song = await Songs_in_playlist.create(body).catch(err => console.log(err))
        res.send(song);
    } catch (error) {
        console.log(error)
        res.status(400).send(error.message)
    }
})
module.exports = router;