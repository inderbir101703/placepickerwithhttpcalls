export default async function getPlaces(){
    const resp=await fetch('http://localhost:3000/places')
    const data= await resp.json()

    if(!resp.ok){//response is not ok .. response is 400 500
    throw new Error('failed to load')
    }
    return data.places
}
export  async function getUserPlaces(){
    const resp=await fetch('http://localhost:3000/user-places')
    const data= await resp.json()

    if(!resp.ok){//response is not ok .. response is 400 500
    throw new Error('failed to fetch user places')
    }
    return data.places
}

   export  async function updateUserPlaces(places){

    const resp= await fetch('http://localhost:3000/user-places',{
        method:'PUT',
        body: JSON.stringify({places:places}),
        headers:{
            'Content-type':'application/JSON'
        }

    })

    if(!resp.ok){
        throw new Error('uanble to use put users')
    }

    return resp.message
}