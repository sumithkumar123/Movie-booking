import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './MovieCard.module.css';

const MovieCard = ({ movie }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/selection/${movie.id}`, { state: { movie } });
    };

    return (
        <div className={styles.movieCard} onClick={handleClick}>
            <img src={movie.image} alt={movie.name} className={styles.movieImage} />
            <h3 className={styles.movieTitle}>{movie.name}</h3>
            <p className={styles.movieYear}>{movie.year}</p>
        </div>
    );
};

export default MovieCard;
