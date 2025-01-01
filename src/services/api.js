const API_KEY = "126e55d1cd418417ff12bfd0a9b07716";
const BASE_URL = "https://api.themoviedb.org/3"


export const getPopularSeries = async ()=>{
  const response = await fetch(`${BASE_URL}/tv/popular?api_key=${API_KEY}&language=en-US`);
  const data = await response.json();
  return data.results
}

export const getMovieDetails = async(id)=>{
  const response = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&append_to_response=credits`)
  const data = await response.json();
  return data
}

export const getMovieTrailer = async(id)=>{
  const response = await fetch(`${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}`)
  const data = await response.json();
  return data
}

export const getPopularMovies =  async () => {
    const response = await fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`);
    const data = await response.json();
    return data.results;
  };
  export const getActionMovies =  async () => {
    const response = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=28`);
    const data = await response.json();
    return data.results;
  };
  export const getComedyMovies =  async () => {
    const response = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=35`);
    const data = await response.json();
    return data.results;
  };
  export const getHorrorMovies =  async () => {
    const response = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=27`);
    const data = await response.json();
    return data.results;
  };
export const searchMovies =  async (query)=>{
    const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);
    const data = await response.json();
    return data.results;
}
export const searchSeries =  async (query)=>{
  const response = await fetch(`${BASE_URL}/search/tv?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);
  const data = await response.json();
  return data.results;
}