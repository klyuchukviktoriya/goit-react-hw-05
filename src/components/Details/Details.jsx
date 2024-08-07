import s from "./Details.module.css";

export default function Details({ movieDetails: { poster_path, title, release_date, vote_average, overview, genres } }) {
    const imgUrl = "https://image.tmdb.org/t/p/w500/";
    const formattedGenres = genres?.map((genre) => genre.name).join(", ");
    const formattedRating = vote_average ? `${(vote_average * 10).toFixed(0)}%` : "N/A";
    const isValidPosterPath = poster_path && poster_path !== "null";

    return (
        <div className={s.container}>
            {isValidPosterPath ? (
                <img
                    src={`${imgUrl}${poster_path}`}
                    alt={`${title} poster`}
                    className={s.image}
                />
            ) : (
                <div className={s.altSmall}>
                    Sorry, there's no image
                </div>
            )}
            <div className={s.details}>
                <h2>{title}</h2>
                <p className={s.text}><span className={s.span}>Release Date:</span> {release_date || "N/A"}</p>
                <p className={s.text}><span className={s.span}>Rating:</span> {formattedRating}</p>
                <p className={s.text}><span className={s.span}>Overview:</span> {overview || "No overview available"}</p>
                <p className={s.text}><span className={s.span}>Genres:</span> {formattedGenres || "No genres available"}</p>
            </div>
        </div>
    );
}
