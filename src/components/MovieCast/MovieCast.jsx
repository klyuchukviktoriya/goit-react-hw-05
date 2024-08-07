import { useState, useEffect } from "react";
import { getCast } from "../../services/api";
import s from "./MovieCast.module.css";
import { useParams } from "react-router-dom";
import Loader from "../Loader/Loader";

export default function MovieCast() {
    const [cast, setCast] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const movieId = useParams().movieId;

    useEffect(() => {
        const fetchCast = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await getCast(movieId);
                setCast(data);
            } catch (e) {
                setError(e);
            } finally {
                setLoading(false);
            }
        };
        fetchCast();
    }, [movieId]);

    return (
        <div className={s.cast}>
            {loading && <Loader />}
            {error && <p className={s.error}>Oops! Something went wrong: {error.message}</p>}
            {cast.length > 0 ? (
                <ul className={s.castList}>
                    {cast.map(actor => (
                        <li key={actor.id} className={s.castItem}>
                            {actor.profile_path ? (
                                <img
                                    src={`https://image.tmdb.org/t/p/w200/${actor.profile_path}`}
                                    alt={actor.name}
                                    className={s.castImage}
                                />
                            ) : (
                                <div className={s.noImage}>No Image</div>
                            )}
                            <p className={s.castName}>{actor.name}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No cast information available</p>
            )}
        </div>
    );
}
