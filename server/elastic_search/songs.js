const { Client } = require('@elastic/elasticsearch');
const { indexMapping } = require('./index');

const client = new Client({ node: 'http://localhost:9200' })

async function search(query){
    try{
        const results = await client.search({
           index: 'song',
           body: {
                query: {
                    multi_match : {
                        query : `/.*${query}.*/gi`,
                        fields: ["name^3","artist^1.5", "album^1.5"],
                        fuzziness: 2
                    }
                }
            },
            sort: ['_score'],
            size: 6
        })
        return results.body
    } catch(error){
        throw error.meta.body.error
    }
}


const map ={
    id: {
        type: "integer",
    },
    name: {
        type: "text",
      },
    coverImg: {
        type: "text",
    },
    artistId: {
        type: "integer",
    },
    artist: {
        type: "text",
    },
    albumId: {
        type: "integer",
    },
    album: {
        type: "text",
    }
}

async function mapSongs(){
    if(!(await client.indices.exists({index: 'song'})).body){
        await client.indices.create({
            index: 'song',
        })
        console.log('added index: ' + 'song')
    }
    indexMapping('song', map)
}

module.exports = Songs = {
    search,
    mapSongs
}
