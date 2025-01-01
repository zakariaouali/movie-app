import { getMovieDetails,getMovieTrailer } from "../services/api";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; 
import "../css/MovieInfo.css"

export default function MovieInfo(){
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [trailer, setTrailer] = useState(null);
    const [actors, setActors] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(()=>{
        const fetchMovieDetails = async()=>{
            try{
                const MovieData = await getMovieDetails(id);
                setMovie(MovieData);

                const trailerData = await getMovieTrailer(id);
                if (trailerData && trailerData.results.length > 0) {
                    setTrailer(trailerData.results[0].key); // Set the trailer key (YouTube video ID)
                }
                if (MovieData.credits && MovieData.credits.cast) {
                    setActors(MovieData.credits.cast); // Store the cast information
                }
            }catch (err) {
                setError("Failed to load movie details.");
            } finally {
                setLoading(false);
            }
        }
        fetchMovieDetails();
    },[id])
    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    return(
        <div className="all">
    <div className="cover"style={{ 
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.9)), url(https://image.tmdb.org/t/p/w1280${movie.backdrop_path})` 
            }}>
        <div className="info">
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title}/>
            <div className="details">
                <h1>{movie.title}</h1>
                <div className="gn-div">
                    {movie.genres.map(genre => {return <div className="genre">{genre.name}</div>})}
                </div>
                <h2>Movie's Story :</h2>
                <h4 className="description">{movie.overview}</h4>
                <div className="movie-rating">
                    <p className="rating">⭐{movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}</p>
                </div> 
                <h2>Cast:</h2>
                <div className="actors">
                <div className="actors-list">
                    {actors && actors.length > 0 ? (
                        actors.slice(0, 10).map((actor) => (
                            <div className="actor" key={actor.id}>
                                <img 
                                    src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`} 
                                    alt={actor.name} 
                                    className="actor-image" 
                                />
                                <p>{actor.name}</p>
                            </div>
                        ))
                    ) : (
                        <p>No cast information available.</p>
                    )}
                </div>
            </div>
            </div>
        </div>
    </div>

        {trailer && (
                <div className="movie-trailer">
                    <h1>Watch Trailer</h1>
                    <iframe 
                        width="100%" 
                        height="600" 
                        src={`https://www.youtube.com/embed/${trailer}`} 
                        title="Movie Trailer" 
                        frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen
                    ></iframe>
                </div>
            )}
            
    </div>
    )
}