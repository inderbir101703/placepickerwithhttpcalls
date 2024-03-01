import { useEffect ,useState } from "react";


 function useFetch(fetchData,initialData){
  const [data,setData]=useState(initialData)
  const [isLoading,setIsLoading]=useState(false)
  const [error,setError]=useState(null)
  useEffect(()=>{

    async function getData(){
      setIsLoading(true)
    try{
  const respData=await fetchData()
  setData(respData)
    }
    catch(error){
\
        setError({message:e.message||"unable to get data"})
    }
    setIsLoading(false)
  }

     getData()
  },[fetchData])

  return {
    data,
    loading:isLoading,
    error,
    setData
  }


}
export default useFetch