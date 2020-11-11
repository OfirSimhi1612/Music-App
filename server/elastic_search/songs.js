const { Client } = require('@elastic/elasticsearch')

const client = new Client({ node: 'http://localhost:9200' })

async function search(query){
    try{
        const results = await client.search({
           index: 'song',
           body: {
            "query": {
                "multi_match" : {
                    "query" : query,
                    "fields": ["name","artist", "album"],
                    "fuzziness": 2
                }
            },
            "size": 10
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