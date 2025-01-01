import MovieCard from "../components/movie-card";
import { useState, useEffect } from "react";
import "../css/Home.css";
import { getPopularMovies,getHorrorMovies,getActionMovies,getComedyMovies,searchMovies,getPopularSeries ,searchSeries} from "../services/api";
import SerieCard from "../components/serie-card";
import Banner from "../components/benner";

export default function Home() {
    const [search, setSearch] = useState("");  // For storing search query 
    const [tvSeries, setTVSeries] = useState([]);  // State to hold TV series data
    const [movies, setMovies] = useState([]);  // For storing search results
    const [popularMovies, setPopularMovies] = useState([]);  // For storing popular movies
    const [actionMovies, setActionMovies] = useState([]);  // For storing popular movies
    const [comedyMovies, setComedyMovies] = useState([]);  // For storing popular movies
    const [horrorMovies, setHorrorMovies] = useState([]);  // For storing popular movies
    const [popularTVSeries, setPopularTVSeries] = useState([]);  // For storing popular TV series
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    // Load popular movies by default
    useEffect(() => {
        const loadPopularMovies = async () => {
            setLoading(true); // Set loading to true before starting the fetch
            try {
                const popularMoviesData = await getPopularMovies();
                setPopularMovies(popularMoviesData);  // Store popular movies in state
            } catch (err) {
                console.log(err);
                setError("Failed to load popular movies (check your connection)...");
            } finally {
                setLoading(false); // Set loading to false after the fetch completes
            }
        };
        const loadActionMovies = async () => {
            setLoading(true); // Set loading to true before starting the fetch
            try {
                const ActionMoviesData = await getActionMovies();
                setActionMovies(ActionMoviesData);  // Store popular movies in state
            } catch (err) {
                console.log(err);
                setError("Failed to load Action movies (check your connection)...");
            } finally {
                setLoading(false); // Set loading to false after the fetch completes
            }
        };
        const loadComedyMovies = async () => {
            setLoading(true); // Set loading to true before starting the fetch
            try {
                const ComedyMoviesData = await getComedyMovies();
                setComedyMovies(ComedyMoviesData);  // Store popular movies in state
            } catch (err) {
                console.log(err);
                setError("Failed to load Comedy movies (check your connection)...");
            } finally {
                setLoading(false); // Set loading to false after the fetch completes
            }
        };
        const loadHorrorMovies = async () => {
            setLoading(true); // Set loading to true before starting the fetch
            try {
                const HorrorMoviesData = await getHorrorMovies();
                setHorrorMovies(HorrorMoviesData);  // Store popular movies in state
            } catch (err) {
                console.log(err);
                setError("Failed to load Horror movies (check your connection)...");
            } finally {
                setLoading(false); // Set loading to false after the fetch completes
            }
        };
    
        const loadPopularTVSeries = async () => {
            setLoading(true); // Set loading to true before starting the fetch
            try {
                const popularTVSeriesData = await getPopularSeries();
                setPopularTVSeries(popularTVSeriesData);  // Store popular TV series in state
            } catch (err) {
                console.log(err);
                setError("Failed to load popular TV series (check your connection)...");
            } finally {
                setLoading(false); // Set loading to false after the fetch completes
            }
        };
    
        // Start loading both popular movies and TV series simultaneously
        loadPopularMovies();
        loadActionMovies();
        loadComedyMovies();
        loadHorrorMovies();
        loadPopularTVSeries();
    }, []); // Empty dependency array to run this effect only once
    

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!search.trim()) return;
        if (loading) return;
        setLoading(true);
        try {
            const searchMoviesData = await searchMovies(search); // Modify to search for movies
            const searchTVSeriesData = await searchSeries(search); // Modify to search for TV series
            setMovies(searchMoviesData);
            setTVSeries(searchTVSeriesData);
            setError(null);
        } catch (err) {
            console.error(err);
            setError("Failed to find movies or series.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="Home">
            <div className="banner" >
                <div className="site-description">
                    <h1>Unlimited movies and series, and much more</h1>
                    <h3>Browse as you wish for Free</h3>
                </div> 
            <form className="search-form" onSubmit={handleSearch}>
                <input
                    className="search-input"
                    type="text"
                    placeholder="Search a movie..."
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                    }}
                />
                <button className="search-button">Search</button>
            </form>
            </div>

            {error && <div className="error-message">{error}</div>}
            {loading ? (
                <div className="loading">Loading...</div>
            ) : (
                <div>
                    {/* Show popular movies by default, but only if search is empty */}
                    {search.trim() === "" && popularMovies.length > 0 && (
                        <>
                            <h1>Popular Movies</h1>
                            <div className="POP">
                                <div className="movie-cards-wrapper">
                                    {/* Map over the popular movies and render them */}
                                    {popularMovies.map((movie) => (
                                        <MovieCard movie={movie} key={`movie-${movie.id}`} />
                                    ))}
                                    {/* Duplicate the movie list to create an infinite effect */}
                                    {popularMovies.map((movie) => (
                                        <MovieCard movie={movie} key={`duplicate-${movie.id}`} />
                                    ))}
                                </div>
                            </div>

                            <h1>Action</h1>
                            <div className="POP">
                                <div className="movie-cards-wrapper">
                                    {/* Map over the popular movies and render them */}
                                    {actionMovies.map((movie) => (
                                        <MovieCard movie={movie} key={`movie-${movie.id}`} />
                                    ))}
                                    {/* Duplicate the movie list to create an infinite effect */}
                                    {actionMovies.map((movie) => (
                                        <MovieCard movie={movie} key={`duplicate-${movie.id}`} />
                                    ))}
                                </div>
                            </div>

                            <h1>Comedy</h1>
                            <div className="POP">
                                <div className="movie-cards-wrapper">
                                    {/* Map over the popular movies and render them */}
                                    {comedyMovies.map((movie) => (
                                        <MovieCard movie={movie} key={`movie-${movie.id}`} />
                                    ))}
                                    {/* Duplicate the movie list to create an infinite effect */}
                                    {comedyMovies.map((movie) => (
                                        <MovieCard movie={movie} key={`duplicate-${movie.id}`} />
                                    ))}
                                </div>
                            </div>

                            <h1>Horror</h1>
                            <div className="POP">
                                <div className="movie-cards-wrapper">
                                    {/* Map over the popular movies and render them */}
                                    {horrorMovies.map((movie) => (
                                        <MovieCard movie={movie} key={`movie-${movie.id}`} />
                                    ))}
                                    {/* Duplicate the movie list to create an infinite effect */}
                                    {horrorMovies.map((movie) => (
                                        <MovieCard movie={movie} key={`duplicate-${movie.id}`} />
                                    ))}
                                </div>
                            </div>

                            <h1>Popular TV Series</h1>
                            <div className="POP">
                                <div className="movie-cards-wrapper">
                                    {/* Map over the popular TV series and render them */}
                                    {popularTVSeries.map((tvSeries) => (
                                        <SerieCard movie={tvSeries} key={`tv-${tvSeries.id}`} />
                                    ))}
                                    {/* Duplicate the TV series list to create an infinite effect */}
                                    {popularTVSeries.map((tvSeries) => (
                                        <SerieCard movie={tvSeries} key={`duplicate-tv-${tvSeries.id}`} />
                                    ))}
                                </div>
                            </div>

                        </>
                    )}

                    {/* Show search results when user searches for movies */}
                    {search.trim() !== "" && (
    <>
        <h1>Search Results</h1>
        <div className="movies-grid">
            {/* Display Movies */}
            {movies.length > 0 && movies.map((movie) => (
                <MovieCard movie={movie} key={movie.id} />
            ))}

            {/* Display TV Series (if any) */}
            {tvSeries.length > 0 && tvSeries.map((series) => (
                <SerieCard movie={series} key={series.id} />
            ))}

            {/* Show message if no movies or TV series found */}

        </div>
    </>
)}


                    {/* Show message if no movies are found */}
                    {search.trim() !== "" && movies.length === 0 && (
                        <div>No movies found</div>
                    )}
                </div>
            )}
        </div>
    );
}
