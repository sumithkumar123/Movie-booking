import React, { createContext, useContext, useState, useEffect } from 'react';
import { setItem, getItem } from '../utils/localStorage';

import godfatherImg from '../assets/GodFather.jpg';
import inceptionImg from '../assets/Inception.jpg';
import endgameImg from '../assets/AvengersEndgame.jpeg';
import menuImg from '../assets/TheMenu.jpg';
import getoutImg from '../assets/GetOut.png';
import sherlock from '../assets/Sherlock.jpeg';
import oppenheimer from '../assets/Oppenheimer.jpg';
import avatar from '../assets/Avatar.jpg';
import treasureImg from '../assets/NationalTreasure.jpg';
import gladiator from '../assets/Gladiator.jpg';

const BookingContext = createContext();

export const useBooking = () => useContext(BookingContext);

export const BookingProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(getItem('isLoggedIn', false));
  const [bookings, setBookings] = useState(getItem('bookings', []));

  const [movies, setMovies] = useState([
    { id: '1', name: 'The Godfather', year: 1972, image: godfatherImg },
    { id: '2', name: 'Inception', year: 2010, image: inceptionImg },
    { id: '3', name: 'Avengers: Endgame', year: 2019, image: endgameImg },
    { id: '4', name: 'The Menu', year: 2022, image: menuImg },
    { id: '5', name: 'Get Out', year: 2017, image: getoutImg },
    { id: '6', name: 'National Treasure', year: 2004, image: treasureImg },
    { id: '7', name: 'Gladiator', year: 2004, image: gladiator },
    { id: '8', name: 'Oppenheimer', year: 2023, image: oppenheimer },
    { id: '9', name: 'Avatar', year: 2009, image: avatar },
    { id: '10', name: 'Sherlock', year: 2010, image: sherlock }
  ]);

  useEffect(() => {
    setItem('isLoggedIn', isLoggedIn);
  }, [isLoggedIn]);

  useEffect(() => {
    setItem('bookings', bookings);
  }, [bookings]);

  const login = () => setIsLoggedIn(true);

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.clear();
    window.location.href = '/login';
  };

  const addBooking = (newBooking) => setBookings([...bookings, newBooking]);

  const value = {
    isLoggedIn,
    login,
    logout,
    bookings,
    addBooking,
    movies,
    setMovies
  };

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
};
