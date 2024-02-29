import { useEffect, useState } from 'react';
import {sortPlacesByDistance} from '../loc.js'
import Error from './error.jsx';
import getPlaces from '../utilities.js';
import Places from './Places.jsx';

export default function AvailablePlaces({ onSelectPlace }) {
  const [isFetching,setIsFetching]=useState(true)
  const [availablePlaces,setAvailablePlaces]=useState([])
  const [error,setError]=useState('')
  useEffect(()=>{
    async function fetchData(){
     setIsFetching(true)
     try{
   const places=await getPlaces()
  navigator.geolocation.getCurrentPosition((position)=>{
 const sortedPlaces=sortPlacesByDistance(places,position.coords.latitude,position.coords.longitude)
 setAvailablePlaces(sortedPlaces)
  })
 
   }
   catch(error){

 setError({message:error.message||'could not fetch places please try again later'})
   }
     
    
     setIsFetching(false)
    }
    fetchData()
 
   },[])

   if(error){
    return <Error title="a title occured" message={error.message}/>
      }
  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
      isLoading={isFetching}
    />
  );
}
