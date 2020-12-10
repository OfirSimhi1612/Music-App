const { Router } = require('express');
const { Song, Artist, Album } = require('../models')
const { Op } = require('sequelize')
const Joi = require('joi');
const { SongSchema } = require('./validationSchemas')
const { userAuth } = require('../authentication/auth')
const { postSearchDoc, deleteSearchDoc, getDocIdBySQLId } = require('../elastic_search')


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

router.patch('/:songId', userAuth, async (req, res) => {
    try {
        const validatedSong = await Joi.attempt(req.body, SongSchema)
        const updated = await Song.update(validatedSong, {
            where: {
                id: req.params.songId
            }
        })

        res.send(Boolean(updated[0]))
    } catch (error) {
        console.log(error)
        res.status(400).send(error.message)
    }
})

router.patch('/like/:songId', userAuth, async (req, res) => {
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

router.post('/', userAuth, async (req, res) => {
    try {
        const validatedSong = await Joi.attempt(req.body, SongSchema)
        const song = await Song.create(validatedSong)

        const songDetails = await Song.findOne({
            where: {
                artistId: song.artistId,
                albumId: song.albumId
            },
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

        postSearchDoc('song', {
            id:song.id,
            name: song.title,
            coverImg: song.coverImg,
            artistId: song.artistId,
            artist: songDetails.Artist.name,
            albumId: song.albumId,
            album: songDetails.Album.name 
        })

        res.status(201).send(song)
    } catch (error) {
        console.log(error)
        res.status(400).send(error.message)
    }
})


//delete and restore

router.delete('/:songId', userAuth, async (req, res) => {
    try {
        const song = await Song.destroy({
            where: {
                id: req.params.songId
            }
        })

        const DocId = await getDocIdBySQLId('song', req.params.songId);
        await deleteSearchDoc('song', DocId);

        res.json(song)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

router.patch('/restore/:songId', userAuth, async (req, res) => {
    try {
        const song = await Song.restore({
            where: {
                id: req.params.songId
            }
        })

        res.json(song)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

module.exports = router;





// const albums = await Albums.findAll({
//     include: [
//         {
//             model: Songs,
//             attributes: [],
//             include: [
//                 {
//                     models: Interactions,
//                     attributes: [sequelize.fn('sum', models.sequelize.col('play_count')), 'total_plays']
//                 }
//             ]
//         }
//     ]

// });