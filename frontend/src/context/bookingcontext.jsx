import { createContext, useState, useEffect } from 'react';

const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [bookings, setBookings] = useState([]);

  // Optional: Persist bookings in localStorage for debugging or rehydration
  useEffect(() => {
    const stored = localStorage.getItem("bookings");
    if (stored) {
      try {
        setBookings(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse bookings from localStorage", e);
      }
    }
  }, []);

  // Optional: Save to localStorage for debugging
  useEffect(() => {
    localStorage.setItem("bookings", JSON.stringify(bookings));
  }, [bookings]);

  const addBooking = (newBooking) =>
    setBookings((prev) => [...prev, newBooking]);

  const setAllBookings = (allBookings) => {
    console.log("✅ Bookings set in context:", allBookings);
    setBookings(allBookings);
  };

  return (
    <BookingContext.Provider value={{ bookings, addBooking, setAllBookings }}>
      {children}
    </BookingContext.Provider>
  );
};

export default BookingContext;
