const { Client } = require('@elastic/elasticsearch')
const client = new Client({ node: 'http://localhost:9200' })

async function postSearchDoc(index, body){
    try{
        const res = await client.index({
            index,
            body
        })
        return Boolean(res.body._shards.successful)
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


async function deepCompare(index ,baseList, compareList){
    try{
        let new_counter = 0;
        let mod_counter = 0;
        let same_counter = 0;
        console.log(baseList.length, compareList.length)
        for(let i = 0; i < baseList.length; i++){
            const matchingElement = compareList.find((match) =>{
                return match.id === baseList[i].id
            })
            if(!matchingElement){
                new_counter ++;
                await postSearchDoc(index, baseList[i])
            } else {
                const matching = JSON.stringify(matchingElement) === JSON.stringify(baseList[i])
                if(!matching) {
                    mod_counter ++
                    const DocId = await getDocIdBySQLId(index, matchingElement.id, baseList[i])
                    await updateSearchDoc(index, DocId, baseList[i])
                } else {
                    same_counter ++
                }
            }
        }
        console.log('added ' + new_counter + ' ' + index + 's')
        console.log('modifyed ' + mod_counter + ' ' + index + 's')
        console.log('skipped ' + same_counter + ' ' + index + 's')
    } catch (error){
        console.log(error)
        throw error
    }
    
}


module.exports = deepCompare
