const { Client } = require('@elastic/elasticsearch')
const { getAllEntities } = require('./helpers/mysql');
const indexCompare = require('./helpers/compare');

const client = new Client({ node: 'http://localhost:9200' })

async function indexMapping(index, map){
    try{
        await client.indices.putMapping({
            index,
            body: {
                properties: map
            }    
        })
    } catch (error){
        console.log(error.body.error)
    }
    
}

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

async function updateSearchFromDB(){
    try{
        const docsCount = INDEX.map(async (index) => {
            const { body: {count : indexCount }  }  = await client.count({ index })
            return indexCount
        })
    
        for(let i = 0; i < INDEX.length; i++){
            if(!(await client.indices.exists({index: INDEX[i]})).body){
                await client.indices.create({
                    index: INDEX[i],
                })
                console.log('added index: ' + INDEX[i])
            }
        }
    
        const allDBEntities = await getAllEntities() 
        const allSearchEntities = [
            (await client.search({index: INDEX[0], size: await docsCount[0]})).body.hits.hits.map(song => song._source),
            (await client.search({index: INDEX[1], size: await docsCount[1]})).body.hits.hits.map(album => album._source),
            (await client.search({index: INDEX[2], size: await docsCount[2]})).body.hits.hits.map(artist => artist._source),
            (await client.search({index: INDEX[3], size: await docsCount[3]})).body.hits.hits.map(playlist => playlist._source),
        ] 
    
        allDBEntities.forEach(async (table, i) => {
            await indexCompare(INDEX[i], table, allSearchEntities[i])
        })
    } catch (error){
        console.log(error);
        throw error
    }

    
}

module.exports = {
    postSearchDoc,
    deleteSearchDoc,
    updateSearchDoc,
    getDocIdBySQLId,
    updateSearchFromDB,
    indexMapping
}





