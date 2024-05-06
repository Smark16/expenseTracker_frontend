import { useEffect, useState } from "react"
import axios from 'axios';

const useFetch = (catsUrl)=>{
    const [categories, setCategories] = useState([])  
    const [loading, setLoading] = useState(true)

    const FecthCats = async ()=>{
      try{
        setLoading(true)
       const response = await axios(catsUrl)
       const data = response.data
       setCategories(data)
       setLoading(false)
      }catch(err){
          console.log(err)
      }
      }

    useEffect(()=>{
      FecthCats()
    }, [])
    return (
        {categories, loading}
    )
}



export default useFetch;