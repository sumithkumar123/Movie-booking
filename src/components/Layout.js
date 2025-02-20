import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Layout.module.css';
import { useBooking } from '../context/bookingContext';
import TopSection from './TopSection';

const Layout = ({ children, showSearchBar = false, onSearchChange, searchQuery, movie }) => {
  const { logout } = useBooking();
  const location = useLocation();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className={styles.layout}>
      <div className={styles.mainContent}>
        <aside className={styles.sidebar}>
          <span className={styles.logo}>
            <img src="/assets/logo.svg" alt="Logo" className={styles.logoIcon} />
            Almanack
          </span>
          <Link
            to="/booking"
            className={location.pathname === '/booking' ? styles.activeLink : styles.link}
          >
            <img src="/assets/booking.svg" alt="Booking Icon" className={styles.navIcon} />
            Booking
          </Link>
          <Link
            to="/activity"
            className={location.pathname === '/activity' ? styles.activeLink : styles.link}
          >
            <img src="/assets/activity.svg" alt="Activity Icon" className={styles.navIcon} />
            Activity
          </Link>
        </aside>

        <main className={styles.content}>
          {showSearchBar ? (
            <div className={styles.topHeader}>
              <div className={styles.searchBar}>
                <input
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={onSearchChange}
                />
                <svg
                  className={styles.searchIcon}
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M21 21L16.65 16.65"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className={styles.userContainer}>
                <TopSection onLogout={handleLogout} />
              </div>
            </div>
          ) : (
            <>
              {movie && (
                <>
                  <div className={styles.movieHeader}>
                    <img
                      src={movie.image}
                      alt={movie.name}
                      className={styles.movieHeaderImage}
                    />
                    <div
                      className={styles.userContainer}
                      style={{ marginTop: '-20px' }}
                    >
                      <TopSection onLogout={handleLogout} />
                    </div>
                  </div>

                  <div className={styles.movieDetails}></div>
                </>
              )}
              {!movie && <TopSection onLogout={handleLogout} />}
            </>
          )}
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
