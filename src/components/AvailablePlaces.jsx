import { memo, useCallback } from 'react';
import { sortPlacesByDistance } from '../loc.js';
import useFetch from '../Hooks/usefetch.js';
import Error from './error.jsx';
import getPlaces from '../utilities.js';
import Places from './Places.jsx';

const AvailablePlaces=memo(function AvailablePlaces({ onSelectPlace }) {



  const locatePlaces=useCallback(async function locatePlaces(){
    const places=await getPlaces()
 
return new Promise((resolve,reject)=>{
    navigator.geolocation.getCurrentPosition((position)=>{
      const sortedPlaces=sortPlacesByDistance(places,position.coords.latitude,position.coords.longitude)
      resolve(sortedPlaces)
  })
    })
  },[getPlaces] )
  // const [isFetching,setIsFetching]=useState(true)
  // const [availablePlaces,setAvailablePlaces]=useState([])
  const {data,loading,error}=  useFetch(locatePlaces,[])
  // const [error,setError]=useState('')
//   useEffect(()=>{
//     async function fetchData(){
//      setIsFetching(true)
//      try{
//    const places=await getPlaces()
//   navigator.geolocation.getCurrentPosition((position)=>{
//  const sortedPlaces=sortPlacesByDistance(places,position.coords.latitude,position.coords.longitude)
//  setAvailablePlaces(sortedPlaces)
//   })
 
//    }
//    catch(error){

//  setError({message:error.message||'could not fetch places please try again later'})
//    }
     
    
//      setIsFetching(false)
//     }
//     fetchData()
 
//    },[])

   if(error){
    return <Error title="a title occured" message={error.message}/>
      }
  return <Places
      title="Available Places"
      places={data}
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
      isLoading={loading}
    />
  
})
export default AvailablePlaces