import { useState, useEffect } from "react";
import MovieList from "../components/MovieList/MovieList";
import SearchBar from "../components/SearchBar/SearchBar";
import { getSearch } from "../services/api";
import { useSearchParams } from "react-router-dom";
import Loader from "../components/Loader/Loader";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";

export default function MoviesPage() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [querySubmitted, setQuerySubmitted] = useState(false);
    const [searchParams] = useSearchParams();
    const query = searchParams.get("query") ?? "";

    useEffect(() => {
        if (!query) return;

        const getData = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await getSearch(query);
                setMovies(data);
                setQuerySubmitted(true);
            } catch (e) {
                setError(e);
            } finally {
                setLoading(false);
            }
        };
        getData();
    }, [query]);

    return (
        <>
            <SearchBar />
            {error && <ErrorMessage message={error.message || "Oh, shit!"} />}
            {loading && <Loader />}
            {!loading && querySubmitted && movies.length === 0 && (
                <ErrorMessage message="No results found, try again" />
            )}
            {movies.length > 0 && <MovieList movies={movies} />}

        </>
    );
}
