import "../css/Favorites.css";
import { useMovieContext } from "../contexts/MovieContext";
import MovieCard from "../components/movie-card";

export default function Favorites() {
    const { favorites } = useMovieContext();

    if (favorites && favorites.length > 0) {
        return (
            <div className="favorites">
                <h2>Your Favorite Movies</h2>
                <div className="movies-grid">
                    {favorites.map((movie) => (
                        <div className="movie-card" key={movie.id}>
                            <MovieCard movie={movie} />
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="favorites-empty">
            <h2>No Favorite Movies Yet</h2>
            <p>Add some movies to your favorite list.</p>
        </div>
    );
}
