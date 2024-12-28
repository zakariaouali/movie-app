const API_KEY = "126e55d1cd418417ff12bfd0a9b07716";
const BASE_URL = "https://api.themoviedb.org/3"

export const getPopularMovies =  async () => {
    const response = await fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`);
    const data = await response.json();
    return data.results;
  };
export const searchMovies =  async (query)=>{
    const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);
    const data = await response.json();
    return data.results;
}