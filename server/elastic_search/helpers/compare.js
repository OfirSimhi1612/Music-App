const { Client } = require('@elastic/elasticsearch')
const client = new Client({ node: process.env.ELS_URL || 'http://localhost:9200' })

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

async function removeSearchDoc(index, id){
    try{
        await client.delete({
            index,
            id
        })
        return
    } catch(error){
        throw error
    }
    
}

function arrayCompare(arr1, arr2){
    if(arr1.length === arr2.length){
        for(let i in arr1){
            if(arr1[i] !== arr2[i]){
                return false
            }
        }
        return true
    } else {
        return false
    }
}

function deepCompare(obj1, obj2){
    for(let key of Object.keys(obj1)){
        if(obj2.hasOwnProperty(key)){
            if(obj1[key] === obj2[key]){
                continue
            } else {
                if(obj1[key]._proto_ === obj2[key]._proto_){
                    return Array.isArray(obj1[key]) 
                    ? arrayCompare(obj1[key], obj2[key]) 
                    : deepCompare(obj1[key], obj2[key])
                } else {
                    return false
                }
            }
        } else {
            return false
        }
    }
    return true
}

async function indexCompare(index ,baseList, compareList){
    try{
        let new_counter = 0;
        let mod_counter = 0;
        let same_counter = 0;
        let del_counter = 0;
        for(let i = 0; i < baseList.length; i++){
            const matchingElement = compareList.find((match) =>{
                return match.id === baseList[i].id
            })
            if(!matchingElement){
                new_counter ++;
                await postSearchDoc(index, baseList[i])
            } else {
                // const matching = JSON.stringify(matchingElement) === JSON.stringify(baseList[i]) //TODO: deepCompare function
                const matching = deepCompare(matchingElement, baseList[i])
                if(!matching) {
                    mod_counter ++
                    const DocId = await getDocIdBySQLId(index, matchingElement.id)
                    await updateSearchDoc(index, DocId, baseList[i])
                } else {
                    same_counter ++
                }
            }
        }
        if(compareList.length > baseList.length){
            for(let i = 0; i < compareList.length; i++){
                const matchingElement = baseList.find((match) =>{
                    return match.id === compareList[i].id
                })
                if(!matchingElement){
                    const DocId = await getDocIdBySQLId(index, compareList[i].id)
                    await removeSearchDoc(index, DocId);
                    del_counter ++;
                }
            }
        }
        console.log(`ELASTIC SEARCH UPDATE: (${index}s)`);
        console.log('added ' + new_counter);
        console.log('modifyed ' + mod_counter);
        console.log('deleted ' + del_counter);
        console.log(same_counter + ' up to date');
        console.log('_____________________________________');
    } catch (error){
        console.log(error)
        throw error
    }
    
}


module.exports = indexCompare
