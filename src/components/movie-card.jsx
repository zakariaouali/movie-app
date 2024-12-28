import  "../css/MovieCard.css" ;
import { useMovieContext } from "../contexts/MovieContext";
import { useContext } from "react";
export default function MovieCard({movie}){
    const {isFavorite,addToFavorites,removeFromFavorites}=useMovieContext() 
    const favorite = isFavorite(movie.id)
    function favoriteClicked(e){
        e.preventDefault();
        if(favorite) removeFromFavorites(movie.id)
        else addToFavorites(movie)


    }
    return <div className="movie-card">
        <div className="movie-poster">
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title}/>
            <div className="movie-overlay">
            <button className={`favorite-btn ${favorite ? "active" : ""}`} onClick={favoriteClicked}>❤︎</button>
            </div>
        </div>
        <div className="movie-ifno">
            <h3>{movie.title}</h3>
            <p>{movie.release_date?.split("-")[0]}</p>
            <div className="movie-rating">
                <p className="rating">⭐{movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}</p>
            </div>
        </div>
    </div>
}