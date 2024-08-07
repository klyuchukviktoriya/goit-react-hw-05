import { Outlet, useParams, useLocation, NavLink } from "react-router-dom";
import { getDetails } from "../services/api";
import { Suspense, useEffect, useRef, useState } from "react";
import Details from "../components/Details/Details";
import Loader from "../components/Loader/Loader";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";
import s from "./MovieDetailsPage.module.css"; // Импортируйте стили

export default function MovieDetailsPage() {
    const { movieId } = useParams();
    const [movieDetails, setMovieDetails] = useState({
        poster_path: "",
        title: "",
        release_date: "",
        vote_average: null,
        overview: "",
        genres: []
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const location = useLocation();
    const goBack = useRef(location.state?.from ?? "/");

    useEffect(() => {
        const getData = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await getDetails(movieId);
                setMovieDetails(data);
            } catch (e) {
                setError(e);
            } finally {
                setLoading(false);
            }
        };
        getData();
    }, [movieId]);

    return (
        <div className={s.container}>
            <NavLink to={goBack.current} className={s.backLink}>Go back</NavLink>
            {loading && <Loader />}
            {error && <ErrorMessage message={error.message || "Oh, shit!"} />}
            <Details movieDetails={movieDetails} />
            <nav className={s.nav}>
                <NavLink to="cast" className={({ isActive }) => isActive ? s.activeLink : s.link}>Cast</NavLink>
                <NavLink to="reviews" className={({ isActive }) => isActive ? s.activeLink : s.link}>Reviews</NavLink>
            </nav>
            <Suspense fallback={<Loader />}>
                <Outlet />
            </Suspense>
        </div>
    );
}
