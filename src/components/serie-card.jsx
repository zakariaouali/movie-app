import "../css/MovieCard.css";
import { useMovieContext } from "../contexts/MovieContext";
import { Link } from "react-router-dom";

export default function SerieCard({ movie }) {
    const { isFavorite, addToFavorites, removeFromFavorites } = useMovieContext();
    const favorite = isFavorite(movie.id); // Check if this movie (or TV series) is a favorite

    function favoriteClicked(e) {
        e.preventDefault();
        if (favorite) removeFromFavorites(movie.id);
        else addToFavorites(movie);
    }

    return (
        <Link className="movie-card" to={`/movie-app/movie-info /${movie.id}`}>
            <div className="movie-poster">
                <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.name || movie.title}  // `name` for series, `title` for movies
                />
                <div className="movie-overlay">
                    <button
                        className={`favorite-btn ${favorite ? "active" : ""}`}
                        onClick={favoriteClicked}
                    >
                        ❤︎
                    </button>
                </div>
            </div>
            <div className="movie-info">
                <h3>{movie.name || movie.title}</h3> {/* `name` for series, `title` for movies */}
                <p>{movie.first_air_date ? movie.first_air_date.split("-")[0] : "N/A"}</p> {/* For TV series, use `first_air_date` */}
                <div className="movie-rating">
                    <p className="rating">
                        ⭐{movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}
                    </p>
                </div>
            </div>
        </Link>
    );
}
