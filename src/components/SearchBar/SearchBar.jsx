import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import s from "./SearchBar.module.css";

export default function SearchBar() {
    const [query, setQuery] = useState("");
    const [_, setSearchParams] = useSearchParams();

    const handleSubmit = e => {
        e.preventDefault();
        if (!query.trim()) return;
        setSearchParams({ query });
    };

    const handleChange = e => {
        setQuery(e.target.value);
    };

    return (
        <form onSubmit={handleSubmit} className={s.form}>
            <input
                type="text"
                placeholder="Search something"
                onChange={handleChange}
                value={query}
                className={s.input}
            />
            <button type="submit" className={s.button}>Search</button>
        </form>
    );
}
