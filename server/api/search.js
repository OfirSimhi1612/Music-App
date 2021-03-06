const { Router } = require('express');
const { updateAllFromDB } = require('../elastic_search');
const Songs = require('../elastic_search/songs');
const Artists = require('../elastic_search/artists');
const Albums = require('../elastic_search/albums');
const Playlists = require('../elastic_search/playlists');

const router = Router();

router.get('/', async (req, res) => {
    try {
        const searchValue = req.query.search;

        const searchData = await Promise.all([
            Songs.search(searchValue || ''),
            Albums.search(searchValue || ''),
            Artists.search(searchValue || ''),
            Playlists.search(searchValue || '')
        ])

        res.json(searchData.map(result => result.hits.hits.map(e => e._source)))
    } catch (error) {
        console.log(error);
    }
})

router.get('/test', async (req, res) => {
    try{
        // const response = await Songs.mapSongs()
        await updateAllFromDB()
        res.send(response)
    } catch (error){
        console.log(error)
        res.status(500).send(error)
    }
})

module.exports =  router