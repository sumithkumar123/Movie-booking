import React, { useEffect } from 'react';
import { useBooking } from '../context/bookingContext';
import {  useNavigate } from 'react-router-dom';
import styles from './ActivityScreen.module.css'
import Layout from '../components/Layout';

const ActivityScreen = () => {
    const { bookings, isLoggedIn } = useBooking(); 
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/login');
        }
    }, [isLoggedIn, navigate]);

    if(!isLoggedIn) return null;

    return (
      <Layout>
        <div className={styles.activityContainer}>
            <h1>Activity</h1>
            {bookings.length === 0 ? (
                <p>No bookings found.</p>
            ) : (
              <table className={styles.bookingTable}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Movie</th>
                  <th>Tickets</th>
                  <th>Amount</th>
                  <th>Time</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{booking.movie}</td>
                      <td>{booking.tickets}</td>
                      <td>${(booking.amount).toFixed(2)}</td>
                      <td>{booking.time}</td>
                      <td>{booking.date}</td>
                    </tr>
                ))}
              </tbody>
            </table>
            )}
        </div>
      </Layout>
    );
};

export default ActivityScreen;