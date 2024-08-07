import { useState, useEffect } from "react"

import { getMovies } from "../services/api"
import MovieList from "../components/MovieList/MovieList";
import Loader from "../components/Loader/Loader";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";
export default function HomePage() {

    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null);

    useEffect(() => {
        const getData = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await getMovies();
                setMovies(data);
            } catch (e) {
                setError(e);
            } finally {
                setLoading(false);
            }
        };
        getData();
    }, [])

    console.log(movies);

    return (
        <div>
            {error && <ErrorMessage message={error.message || "Oh, shit!"} />}
            {loading && <Loader />}
            <MovieList movies={movies} />
        </div>
    )
}
