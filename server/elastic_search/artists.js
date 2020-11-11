const { Client } = require('@elastic/elasticsearch')

const client = new Client({ node: 'http://localhost:9200' })

async function search(query){
    try{
        const results = await client.search({
           index: 'artist',
           body: {
            "query": {
                "multi_match" : {
                    "query" : query,
                    "fields": ["name", "albums", "songs"],
                    "fuzziness": 2
                }
            },
           }
        })
        return results.body
    } catch(error){
        throw error.meta.body.error
    }
}

module.exports = Songs = {
    search
}