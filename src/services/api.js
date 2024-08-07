import axios from "axios";


const API_KEY = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1OTgzNGFjMTAzZWIxOWJiOTFkZWI5YWZjYjI3MmM3ZiIsIm5iZiI6MTcyMjY4OTY4OS44NDk2NzEsInN1YiI6IjY2YTc0NDI3ZWMzN2RkOWMzODNhNDE0OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.99UQumBeZGo2vOCR-kBaLs1qBsqluNEKCd3UtwMBIXs";

axios.defaults.headers.common["Authorization"] = `Bearer ${API_KEY}`;
axios.defaults.baseURL = "https://api.themoviedb.org/3";



export const getMovies = async () => {
    const response = await axios.get("/trending/movie/day");
    return response.data.results;
};



export const getSearch = async (query) => {
    const response = await axios.get("/search/movie", {
        params: { query },
    });
    return response.data.results;
};

export const getDetails = async (movie_id) => {
    const response = await axios.get(`/movie/${movie_id}`);
    return response.data;
};

export const getCast = async (movie_id) => {
    const response = await axios.get(`/movie/${movie_id}/credits`);
    return response.data.cast;
};

export const getReviews = async (movie_id) => {
    const response = await axios.get(`/movie/${movie_id}/reviews`);
    return response.data.results;
};
