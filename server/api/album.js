const { Router } = require('express');
const { Album, Artist, Song } = require('../models');
const { Op } = require('sequelize');
const Joi = require('joi');
const { AlbumSchema } = require('./validationSchemas')
const { userAuth } = require('../authentication/auth')
const { postSearchDoc, deleteSearchDoc, getDocIdBySQLId } = require('../elastic_search')
 

const router = Router();


router.get('/', userAuth, async (req, res) => {
    try {
        const albums = await Album.findAll({ include: [{ model: Artist, attributes: ['name'] }] })
        res.json(albums);
    } catch (error) {
        res.status(500).send(error.message)
    }
})

router.get('/top', async (req, res) => {
    try {
        const albums = await Album.findAll({
            include: [
                {
                    model: Artist,
                    attributes: ['name']
                }
            ],
            order: [
                ['likes', 'DESC']
            ],
            limit: 20
        })

        res.json(albums)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

router.get('/songs/:albumId', async (req, res) => {
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
                album_id: req.params.albumId
            }
        })

        res.json(songs)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

router.get('/search/:searchInput', async (req, res) => {
    try {
        const albums = await Album.findAll({
            include: [
                {
                    model: Artist,
                    attributes: ['name']
                }
            ],
            where: {
                name: {
                    [Op.substring]: req.params.searchInput
                }
            },
            order: [
                ['likes', 'DESC']
            ]
        })

        res.json(albums)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

router.get('/:albumId', async (req, res) => {
    try {
        const album = await Album.findByPk(req.params.albumId, { include: [{ model: Artist }] })
        res.json(album);
    } catch (error) {
        res.status(400).send(error.message)
    }
})

router.patch('/like/:albumId', userAuth, async (req, res) => {
    try {
        let likes = await Album.findByPk(req.params.albumId, {
            attributes: ['likes']
        })
        likes = req.query.like === '' ? likes.likes + 1 : likes.likes - 1
        const updated = await Album.update({ likes: likes }, {
            where: {
                id: req.params.albumId
            }
        })
        res.send(Boolean(updated))
    } catch (error) {
        res.status(500).send(error.message)
    }
})

router.patch('/:albumId', userAuth, async (req, res) => {
    try {
        const validatedAlbum = await Joi.attempt(req.body, AlbumSchema)
        const updated = await Album.update(validatedAlbum, {
            where: {
                id: req.params.albumId
            }
        })

        res.send(Boolean(updated[0]))
    } catch (error) {
        res.status(400).send(error.message)
    }
})

router.post('/', userAuth, async (req, res) => {
    try {
        const validatedAlbum = await Joi.attempt(req.body, AlbumSchema)
        const album = await Album.create(validatedAlbum)

        const albumArtist = await Album.findOne({
            where: {
                artistId: album.artistId
            },
            include: [
                {
                    model: Artist,
                    attributes: ['name']
                }
            ]
        })

        await postSearchDoc('album', {
            id: album.id,
            name: album.name,
            coverImg: album.coverImg,
            artistId: album.artistId,
            artist: albumArtist.Artist.name,
            songs: []
        })

        res.status(201).json(album);
    } catch (error) {
        console.log(error)
        res.status(400).send(error.message)
    }
})


//delete and restore

router.delete('/:albumId', userAuth, async (req, res) => {
    try {
        const album = await Album.destroy({
            where: {
                id: req.params.albumId
            }
        })

        const DocId = await getDocIdBySQLId('album', req.params.albumId);
        await deleteSearchDoc('album', DocId);

        res.send(Boolean(album))
    } catch (error) {
        res.status(400).send(error.message)
    }
})

router.patch('/restore/:albumId', userAuth, async (req, res) => {
    try {
        const album = await Album.restore({
            where: {
                id: req.params.albumId
            }
        })

        res.send(Boolean(album))
    } catch (error) {
        res.status(400).send(error.message)
    }
})


module.exports = router;