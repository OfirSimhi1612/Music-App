const { Client } = require('@elastic/elasticsearch')

const client = new Client({ node: 'http://localhost:9200' })

async function search(query){
    try{
        const results = await client.search({
           index: 'playlist',
           body: {
                "query": {
                    "bool": {
                        "must":{
                            "term" : { "isPublic" : true }
                        } ,
                        "should": [
                            {
                                "multi_match" : {
                                    "query" : query,
                                    "fields": ["name^3","creator^1.5", "songs^1.5"],
                                    "fuzziness": 2
                                }
                            }
                        ]     

                    },
                    
                }
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