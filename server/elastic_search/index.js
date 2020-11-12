const { Client } = require('@elastic/elasticsearch')
const { getAllEntities } = require('./helpers/mysql');
const deepCompare = require('./helpers/compare');

const client = new Client({ node: 'http://localhost:9200' })

async function postSearchDoc(index, body){
    try{
        await client.index({
            index,
            body
        })
    return
    } catch (error){
        throw error
    }
}

async function updateSearchDoc(index, id, body){
    try{
        await client.update({
            index: index,
            id: id,
            body: {
              doc: body
            }
          })
        return
    } catch (error){
        throw error.meta.body.error
    }
}

async function deleteSearchDoc(index, id){
    try{
        await client.delete({
            index,
            id: id
        })
        return
    } catch (error){
        throw error.message
    }
    
}

async function getDocIdBySQLId(index, id){
    try{
        const results = await client.search({
           index: index,
           body: {
                "query": {
                    "match" : {
                        id
                    }
                },
           }
        })
        if(results.body.hits.hits[0]['_id']){
            return results.body.hits.hits[0]['_id']
        } else {
            return null
        }
    } catch(error){
        throw error.meta.body.error
    }
}

const INDEX = ['song', 'album', 'artist', 'playlist'];

async function updateAllFromDB(){

    for(let i = 0; i < INDEX.length; i++){
        if(!(await client.indices.exists({index: INDEX[i]})).body){
            await client.indices.create({
                index: INDEX[i],
            })
            console.log((await client.indices.exists({index: INDEX[i]})).body)
        }
    }

    const allDBEntities = await getAllEntities()
    const allSearchEntities = [
        (await client.search({index: 'song', size: 10000})).body.hits.hits.map(song => song._source),
        (await client.search({index: 'album', size: 10000})).body.hits.hits.map(album => album._source),
        (await client.search({index: 'artist', size: 10000})).body.hits.hits.map(artist => artist._source),
        (await client.search({index: 'playlist', size: 10000})).body.hits.hits.map(playlist => playlist._source),
    ]

    allDBEntities.forEach(async (table, i) => {
        await deepCompare(INDEX[i], table, allSearchEntities[i])
    })
}

module.exports = {
    postSearchDoc,
    deleteSearchDoc,
    updateSearchDoc,
    getDocIdBySQLId,
    updateAllFromDB
}





