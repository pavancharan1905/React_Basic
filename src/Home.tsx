import { useEffect, useState } from "react";
import axios from "axios";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

const Home = () => {
  const [movies, setMovies] = useState<Movie[]>([]); //[pause] State for storing movies
  const [loading, setLoading] = useState<boolean>(true); //[pause] State for loading status
  const [error, setError] = useState<string | null>(null); //[pause] State for error handling

  useEffect(() => {
    const fetchMovies = async () => { //[pause] Function to fetch movies from API
        try {
          const apiKey = import.meta.env.VITE_TMDB_API_KEY; //[pause] Fetch API key from environment variables
          if (!apiKey) {
            setError("API Key is missing."); //[pause] Handle missing API key
            setLoading(false);
            return;
          }
      
          const { data } = await axios.get(
            `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US`
          ); //[pause] Fetch popular movies from TMDB API
      
          setMovies(data.results); //[pause] Store fetched movies in state
        } catch (error) {
          setError("Failed to fetch movies"); //[pause] Handle fetch error
        } finally {
          setLoading(false); //[pause] Set loading to false once fetch is complete
        }
      };
    fetchMovies(); //[pause] Call the fetch function when component mounts
  }, []);

  if (loading) { //[pause] Show loading message while fetching movies
    return <h2>Loading movies...</h2>;
  }

  if (error) { //[pause] Show error message if fetch fails
    return <h2>{error}</h2>;
  }

  return (
    <div>
        {movies.map((movie)=>(
            
            <div key={movie.id}>
                <h2>{movie.title}</h2>
                <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />

        </div>
  ))}
  </div>
  )
}

export default Home;