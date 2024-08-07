import { useState, useEffect } from "react";
import { getReviews } from "../../services/api";
import s from "./MovieReviews.module.css";
import { useParams } from "react-router-dom";
import Loader from "../Loader/Loader";

export default function MovieReviews() {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const movieId = useParams().movieId;

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await getReviews(movieId);
                setReviews(data);
            } catch (e) {
                setError(e);
            } finally {
                setLoading(false);
            }
        };
        fetchReviews();
    }, [movieId]);

    return (
        <div className={s.reviews}>
            {loading && <Loader />}
            {error && <p className={s.error}>Oops! Something went wrong: {error.message}</p>}
            {reviews.length > 0 ? (
                <ul className={s.reviewsList}>
                    {reviews.map(review => (
                        <li key={review.id} className={s.reviewItem}>
                            <h3 className={s.reviewAuthor}>{review.author}</h3>
                            <p className={s.reviewContent}>{review.content}</p>
                            <div className={s.line}></div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className={s.noReview}>No reviews available</p>
            )}
        </div>
    );
}
