import MovieCard from "../components/movie-card"
import { useState ,useEffect} from "react"
import "../css/Home.css";
import { getPopularMovies,searchMovies } from "../services/api";
export default function Home(){
    const [search,setSearch]=useState("")
    const [movies,setMovies]=useState([])
    const [erreur,setErreur] = useState(null)
    const [loading,setLoading] = useState(true)

    useEffect( () => {
        const loadPopularMovies = async ()=>{
            try{
                const popularMovies = await getPopularMovies();
                setMovies(popularMovies)
            }
            catch(err){ 
                console.log(err)
                setErreur("failed to load movies...")
                
            }
            finally{
                setLoading(false)
            }
        }
        loadPopularMovies()
    } , [] ) 

    const handleSearch =async (e) =>{
        e.preventDefault()
        if(!search.trim())return
        if (loading)return
        setLoading(true)
        try{
            const searchResult = await searchMovies(search)
            setMovies(searchResult)
            setErreur(null)
        }catch(err){
            console.log(err)
            setErreur("failed to find movie")
        }finally{
            setLoading(false)
        }



    };

    return <div className="Home">
        <form className="search-form" onSubmit={handleSearch}>
            <input className="search-input"
            type="text"
            placeholder="Search a movie..."
            value={search}
            onChange={(e)=>{setSearch(e.target.value)}}/>
            <button className="search-button">Search</button>
        </form>
        <h1 className="favorites"> Our Movies</h1>

        {erreur && <div className="error-message">{erreur}</div>}
        {loading?(<div className="loading">loading ...</div>)
        :(
            <div className="movies-grid">
            {movies.map((movie)=>{
                return movie.title.toLowerCase().startsWith(search.toLowerCase()) && <MovieCard movie={movie} key={movie.id}/> 
            }
        )}
        </div>
        )
        }

       

            
    </div>
}