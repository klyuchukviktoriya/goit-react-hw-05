import { Link, useLocation } from "react-router-dom";
import s from "./MovieList.module.css";

export default function MovieList({ movies }) {
    const imgUrl = "https://image.tmdb.org/t/p/w500/";
    const location = useLocation();

    return (
        <ul className={s.list}>
            {movies.map(({ poster_path, id, title, vote_average }) => {

                const isValidPosterPath = poster_path && poster_path !== "null";

                return (
                    <li key={id} className={s.listItem}>
                        <Link to={`/movies/${id}`} state={{ from: location }} className={s.link}>
                            {isValidPosterPath ? (
                                <img
                                    src={`${imgUrl}${poster_path}`}
                                    alt={`${title} poster`}
                                    className={s.image}
                                />
                            ) : (
                                <div className={s.alt}>Sorry, there's no image</div>
                            )}
                            <p className={s.rating}>{(vote_average * 10).toFixed(0)}%</p>
                            <h2 className={s.title}>{title}</h2>
                        </Link>
                    </li>
                );
            })}
        </ul>
    );
}
