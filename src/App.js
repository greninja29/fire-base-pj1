import { useEffect, useState } from "react";
import "./App.css";
import { Auth } from "./components/Auth.js";
import { db } from "./config/firebase";
import { getDocs, collection, addDoc,deleteDoc,doc,updateDoc } from "firebase/firestore";

function App() {
  const [movieList, setmovieList] = useState([]);

  // New movie states

  const [newMovieTitle, setnewMovieTitle] = useState("");
  const [newMovieDate, setnewMovieDate] = useState(100);
  const [isnewMovieOsacar, setisnewMovieoscar] = useState(false);

  //update movie title state
  const [updatedTitle,setupdatedTitle]=useState("");
  
  const movieCollections = collection(db, "movies");
  const getMovieList = async () => {
    //read data from database
    try {
      const data = await getDocs(movieCollections);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setmovieList(filteredData);
      console.log(filteredData);
    } catch (err) {
      console.error(err);
    }
    // set movie list state
  };
  useEffect(() => {

   getMovieList();
  }, []);

  const onSubmitMovie = async () => {
    try{
      await addDoc(movieCollections, {
          title: newMovieTitle,
          releaseDate:newMovieDate,
          receivedOscar:isnewMovieOsacar, 
        });
        getMovieList();
    }catch(err){
      console.error(err);    
    }
  };

  const deleteMovie=async(id)=>{
     const movieDoc=doc(db,"movies",id);
     await deleteDoc(movieDoc);
     getMovieList();
  }
  const updateMovieTitle=async(id)=>{
     const movieDoc=doc(db,"movies",id);
     await updateDoc(movieDoc,{title:updatedTitle});
     getMovieList();
  }

  return (
    <div className="App">
      <Auth />
      <div>
        <input
          type="text"
          placeholder="Movie title..."
          onChange={(e) => setnewMovieTitle(e.target.value)}
        />
        <input
          type="number"
          placeholder="Release date..."
          onChange={(e) => setnewMovieDate(Number(e.target.value))}
        />
        <input
          type="checkbox"
          onChange={(e) => setisnewMovieoscar(e.target.checked)}
        />
        <label>Raceived an oscar</label>
        <button onClick={onSubmitMovie}>submit Movie</button>
      </div>

      <div>
        {movieList.map((movie) => (
          <div>
            <h1>{movie.title}</h1>
            <p>Date:{movie.releaseDate}</p>
            <button onClick={()=>deleteMovie(movie.id)} >Delete Movie</button>
            <br />
            <input placeholder="new title" onChange={(e)=>setupdatedTitle(e.target.value)} />
            <button onClick={()=>updateMovieTitle(movie.id)} >update title</button>
             
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
