import { useRef, useState, useCallback, useEffect } from 'react';
import Error from './components/error.jsx';
import Places from './components/Places.jsx';
import Modal from './components/Modal.jsx';
import DeleteConfirmation from './components/DeleteConfirmation.jsx';
import logoImg from './assets/logo.png';
import AvailablePlaces from './components/AvailablePlaces.jsx';

import {getUserPlaces, updateUserPlaces} from './utilities.js';
import useFetch from './Hooks/usefetch.js';

function App() {
  const selectedPlace = useRef();

 

const [updatingError,setUpdatingError]=useState(null)
  const [modalIsOpen, setModalIsOpen] = useState(false);


  const {data:userPlaces,setData:setUserPlaces,error}=useFetch(getUserPlaces,[])

 
  function handleStartRemovePlace(place) {
    setModalIsOpen(true);
    selectedPlace.current = place;
  }

  function handleStopRemovePlace() {
    setModalIsOpen(false);
  }

  const handleSelectPlace = useCallback(async function handleSelectPlace(selectedPlace) {
    setUserPlaces((prevPickedPlaces) => {
      if (!prevPickedPlaces) {
        prevPickedPlaces = [];
      }
      if (prevPickedPlaces.some((place) => place.id === selectedPlace.id)) {
        return prevPickedPlaces;
      }
      return [selectedPlace, ...prevPickedPlaces];
    });
  try{
   
await updateUserPlaces([selectedPlace,...userPlaces])
  }
  catch(error){
setUserPlaces(userPlaces)
setUpdatingError({message:error.message||"error in updating"})
  }
  },[])




  const handleRemovePlace = useCallback(async function handleRemovePlace() {
    setUserPlaces((prevPickedPlaces) =>
      prevPickedPlaces.filter((place) => place.id !== selectedPlace.current.id)
    );
    try{
    updateUserPlaces(userPlaces.filter((place) => place.id !== selectedPlace.current.id))
    }
    catch(error){
      setUserPlaces(userPlaces)
      setUpdatingError({message:error.message||"failed to delete place"})
    }
    setModalIsOpen(false);
  }, [userPlaces]);

function handleError(){
  setUpdatingError(null)
}
 
  return (
    <>
    <Modal open={updatingError} onClose={handleError}>
      {updatingError && <Error  title="an errored occured" message={updatingError.message} onConfirm={handleError}/>}
    </Modal>
      <Modal open={modalIsOpen} onClose={handleStopRemovePlace}>
        <DeleteConfirmation
          onCancel={handleStopRemovePlace}
          onConfirm={handleRemovePlace}
        />
      </Modal>

      <header>
        <img src={logoImg} alt="Stylized globe" />
        <h1>PlacePicker</h1>
        <p>
          Create your personal collection of places you would like to visit or
          you have visited.
        </p>
      </header>
      <main>
        <Places
          title="I'd like to visit ..."
          fallbackText="Select the places you would like to visit below."
          places={userPlaces}
          loadingText='Places are being loaded'
          onSelectPlace={handleStartRemovePlace}
        />

        <AvailablePlaces onSelectPlace={handleSelectPlace}/>
      </main>
    </>
  );
}

export default App;
