const { Router } = require('express');
const { postSearchDoc, deleteSearchDoc, searchSearchDoc } = require('../elastic_search')
const Songs = require('../elastic_search/songs');


const router = Router();

router.get('/all', async (req, res) => {
    try {
        const searchValue = req.query.search;
        const searchQuery = {
            query: {
                fuzzy: {
                    value: searchValue,
                    fuzziness: 2
                  }
              }
        }

        const searchData = await Promise.all([
            Songs.search(searchValue || ''),
            Artists.search(searchValue || ''),
            Albums.search(searchValue || ''),
            PLaylists.search(searchValue || '')
        ])

        res.json(data)
    } catch (error) {
        console.log(error);
    }
})

module.exports =  router