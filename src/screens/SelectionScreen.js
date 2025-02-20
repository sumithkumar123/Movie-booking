

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useBooking } from '../context/bookingContext';
import Layout from '../components/Layout';
import styles from './SelectionScreen.module.css';

const SelectionScreen = () => {
  const { movieId } = useParams();
  const { movies, addBooking, isLoggedIn } = useBooking();
  const [ticketCount, setTicketCount] = useState(1);
  const [selectedTime, setSelectedTime] = useState('18:00');
  const [selectedDate, setSelectedDate] = useState(new Date().toLocaleDateString('en-GB')); // DD-MM-YYYY
  const navigate = useNavigate();
  const location = useLocation();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    const selectedMovie = location.state?.movie;
    if (!selectedMovie) {
      navigate('/booking');
      return;
    }
    setMovie(selectedMovie);
  }, [movieId, movies, navigate, location.state]);

  const handleIncrement = () => {
    setTicketCount((prevCount) => prevCount + 1);
  };

  const handleDecrement = () => {
    if (ticketCount > 1) {
      setTicketCount((prevCount) => prevCount - 1);
    }
  };

  const handleTimeChange = (event) => {
    setSelectedTime(event.target.value);
  };

  const handleDateChange = (event) => {
    const newDate = event.target.value;
    const dateRegex = /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/;

    if (dateRegex.test(newDate)) {
      setSelectedDate(newDate);
    } else {
      console.log('Invalid Date');
    }
  };

  const handleBooking = () => {
    const newBooking = {
      id: Date.now(),
      movie: movie.name,
      tickets: ticketCount,
      time: selectedTime,
      date: selectedDate,
      amount: 25 * ticketCount,
    };
    addBooking(newBooking);
    navigate('/activity');
  };

  if (!movie || !isLoggedIn) {
    return null;
  }

  return (
    <Layout movie={movie}>
      <div className={styles.selectionContainer}>

       
        <h3 className={styles.movieTitle}>
          {movie.name} ({movie.year})
        </h3>

        <div className={styles.bookingForm}>

          <div className={styles.formGroup}>
            <label>Ticket Count</label>
            <div className={styles.counter}>
              <button onClick={handleDecrement}>-</button>
              <span>{ticketCount}</span>
              <button onClick={handleIncrement}>+</button>
            </div>
          </div>

          <div className={styles.formGroup}>
            <label>Show Time</label>
            <div className={styles.timeSelection}>
              <button
                className={selectedTime === '09:00' ? styles.selectedTime : styles.timeOption}
                onClick={() => setSelectedTime('09:00')}
              >
                <img
                  src="/assets/day.svg"
                  alt="Day icon"
                  className={styles.timeIcon}
                />
                9:00
              </button>

              <button
                className={selectedTime === '12:00' ? styles.selectedTime : styles.timeOption}
                onClick={() => setSelectedTime('12:00')}
              >
                <img
                  src="/assets/language.svg"
                  alt="Noon icon"
                  className={styles.timeIcon}
                />
                12:00
              </button>

              <button
                className={selectedTime === '18:00' ? styles.selectedTime : styles.timeOption}
                onClick={() => setSelectedTime('18:00')}
              >
                <img
                  src="/assets/dark.svg"
                  alt="Night icon"
                  className={styles.timeIcon}
                />
                18:00
              </button>
            </div>
          </div>

          <div className={styles.formGroup}>
            <label>Date</label>
            <div className={styles.dateInputWrapper}>
              <svg
                className={styles.dateIcon}
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M8 7V3M16 7V3M3 11H21M5 21H19C20.1046 21 21 20.1046 21 19V8C21 6.89543 20.1046 6 19 6H5C3.89543 6 3 6.89543 3 8V19C3 20.1046 3.89543 21 5 21Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <input
                type="text"
                value={selectedDate}
                onChange={handleDateChange}
                placeholder="DD-MM-YYYY"
              />
            </div>
          </div>

          <button className={styles.bookButton} onClick={handleBooking}>
            Book Ticket
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default SelectionScreen;
