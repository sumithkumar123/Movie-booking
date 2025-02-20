import React, { useState, useEffect } from 'react';
import { useBooking } from '../context/bookingContext';
import { useNavigate } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import Layout from '../components/Layout';
import styles from './BookingScreen.module.css';

const BookingScreen = () => {
  const { movies, isLoggedIn } = useBooking();
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  const filteredMovies = movies.filter((movie) =>
    movie.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!isLoggedIn) return null;

  return (
    <Layout
      showSearchBar={true}
      onSearchChange={(e) => setSearchQuery(e.target.value)}
      searchQuery={searchQuery}
    >
      <div className={styles.bookingContainer}>
        <h2 className={styles.greeting}>Good Morning Mr. Naval Ravikant!</h2>
        
        <div className={styles.movieGrid}>
          {filteredMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default BookingScreen;
