const { Router } = require('express');
const { Artist, Song, Album } = require('../models');
const { Op } = require('Sequelize')
const Joi = require('joi');
const router = Router();
const { ArtistSchema } = require('./validationSchemas')
const { userAuth } = require('../authentication/auth')
const { postSearchDoc, deleteSearchDoc, searchSearchDoc } = require('../elastic_search')


router.get('/', async (req, res) => {
    try {
        const artists = await Artist.findAll()
        res.json(artists);
    } catch (error) {
        res.status(500).send(error.message)
    }
})

router.get('/top', async (req, res) => {
    try {
        const artists = await Artist.findAll({
            limit: 20,
            order: [
                ['likes', 'DESC']
            ]
        })

        res.json(artists)
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

router.get('/songs/:artistId', async (req, res) => {
    try {
        const songs = await Song.findAll({
            include: [
                {
                    model: Album,
                    attributes: ['name']
                },
                {
                    model: Artist,
                    attributes: ['name']
                }
            ],
            order: [
                ['likes', 'DESC']
            ],
            where: {
                artist_id: req.params.artistId
            }
        })

        res.json(songs)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

router.get('/albums/:artistId', async (req, res) => {
    try {
        const songs = await Album.findAll({
            order: [
                ['likes', 'DESC']
            ],
            where: {
                artist_id: req.params.artistId
            }
        })

        res.json(songs)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

router.get('/search/:searchInput', async (req, res) => {
    try {
        const artists = await Artist.findAll({
            where: {
                name: {
                    [Op.substring]: req.params.searchInput
                }//find a way to order by substring position
            },
            order: [
                ['likes', 'DESC']
            ]
        })

        res.json(artists)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

router.patch('/:artistId', userAuth, async (req, res) => {
    try {
        const validatedArtist = await Joi.attempt(req.body, ArtistSchema)
        const updated = await Artist.update(validatedArtist, {
            where: {
                id: req.params.artistId
            }
        })

        res.send(Boolean(updated[0]))
    } catch (error) {
        res.status(400).send(error.message)
    }
})

router.patch('/like/:artistId', userAuth, async (req, res) => {
    try {
        let likes = await Artist.findByPk(req.params.artistId, {
            attributes: ['likes']
        })
        likes = req.query.like === '' ? likes.likes + 1 : likes.likes - 1
        const updated = await Artist.update({ likes: likes }, {
            where: {
                id: req.params.artistId
            }
        })
        res.send(Boolean(updated))
    } catch (error) {
        res.status(500).send(error.message)
    }
})

router.post('/', userAuth, async (req, res) => {
    try {
        const validatedArtist = await Joi.attempt(req.body, ArtistSchema);
        const newArtist = await Artist.create(validatedArtist);

        await postSearchDoc('artist', {
            id: newArtist.id,
            name: newArtist.name,
            coverImg: newArtist.coverImg,
            albums: [],
            songs: []
        })
        res.status(201).send(newArtist);
    } catch (error) {
        res.status(400).send(error.message);
    }
})


//delete and restore

router.delete('/:artistId', userAuth, async (req, res) => {
    try {
        const artist = await Artist.destroy({
            where: {
                id: req.params.artistId
            }
        })

        res.json(artist)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

router.patch('/restore/:artistId', userAuth, async (req, res) => {
    try {
        const artist = await Artist.restore({
            where: {
                id: req.params.artistId
            }
        })

        res.json(artist)
    } catch (error) {
        res.status(400).send(error.message)
    }
})


module.exports = router;