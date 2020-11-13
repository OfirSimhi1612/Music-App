const { Router } = require('express');
const { Song, Artist, Album, Playlist, Songs_in_playlist } = require('../models');
const { Op } = require('Sequelize')
const Joi = require('joi');
const { PlaylistSchema } = require('./validationSchemas')
const { userAuth } = require('../authentication/auth')
const cookie = require('cookie')
const jwt = require('jsonwebtoken');
const auth = require('../authentication/auth');

const router = Router()

router.get('/isExist', userAuth, async (req, res) => {
    try{
        const Libaray = await Playlist.findOne({
            where: {
                name: `user ${req.decoded.userId} playlist - systemPlaylist`,
                creator: req.decoded.userId
            }
        })
        
        const isExist = await Songs_in_playlist.findAll({
            where: {
                playlistId: Libaray.id,
                songId: req.query.songId
            }
        }) 
        res.send(isExist.length > 0)
    } catch (error){
        console.log(error)
        res.status(400).send(error.message)
    }
    
})

router.post('/addSong',userAuth, async (req, res) => {
    try {
        const Libaray = await Playlist.findOne({
            where: {
                name: `user ${req.decoded.userId} playlist - systemPlaylist`
            }
        })
        const body = { 
            ...req.body,
            playlistId: Libaray.id, 
            index: await Songs_in_playlist.getIndex(Libaray.id) 
        }

        const song = await Songs_in_playlist.create(body)
        res.send(song);
    } catch (error) {
        console.log(error)
        res.status(400).send(error.message)
    }
})

router.delete('/removeSong', userAuth, async (req, res) => {
    try {
        const Libaray = await Playlist.findOne({
            where: {
                name: `user ${req.decoded.userId} playlist - systemPlaylist`
            }
        })

        const isDeleted = await Songs_in_playlist.destroy({
            where: {
                playlistId: Libaray.id,
                songId: req.query.songId
            }
        })
        res.send(Boolean(isDeleted));
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    } 
})

module.exports = router