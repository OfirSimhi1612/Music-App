const { Client } = require('@elastic/elasticsearch')

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

async function searchSearchDoc(index, query){
    try{
        const results = await client.search({
           index: index,
           body: query
        })
        return results.body.hits.hits
    } catch(error){
        throw error
    }
}

module.exports = {
    postSearchDoc,
    deleteSearchDoc,
    searchSearchDoc
}

client.search({}, (err, res) => {
    if(err){
        console.log(err)
    } else {
        console.log(res.body.hits.hits)
    }
})
    
// client.delete({
//     index: 'album',
//     id: 'jlU-t3UBIJROWIjW2zlC'
// })
// client.delete({
//     index: 'song',
//     id: 'mVVDt3UBIJROWIjWdjl6'
// })
// client.delete({
//     index: 'playlist',
//     id: 'ylVKt3UBIJROWIjWNTlT'
// })
// client.delete({
//     index: 'playlist',
//     id: 'plVHt3UBIJROWIjWtznc'
// })

