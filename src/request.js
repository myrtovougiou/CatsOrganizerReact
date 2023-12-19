export async function handleRequest(type, url, responseF = null, object = null)
{ 
    if (type == 'GET')
    {        
        return await fetch(url)
            .then(result => checkResponseStatus(result));
    }
    if (type == 'DELETE'){
        let options = 
        {    
            'method': type
        }

        return await fetch(url, options)
            .then(result => checkResponseStatus(result, responseF, type));
    }

    const options = 
    {    
        'method': type,    
        'headers': {
            'Content-Type':'application/json'
        },    
        'body': JSON.stringify(object)    
    }

    fetch(url, options)
        .then(result => checkResponseStatus(result, responseF))
}

function checkResponseStatus(data, responseF = null, type = null)
{
    if (!data.ok){
        throw Error(data.status);
    }
    if (responseF){
        responseF();
    }
    if (!type){
        return data.json();
    }
}