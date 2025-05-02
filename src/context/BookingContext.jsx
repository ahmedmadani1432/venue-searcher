import React, { createContext, useState, useContext } from 'react';

export const BookingContext = createContext({
  currentBooking: null,
  userBookings: [],
  setCurrentBooking: () => {},
  addBooking: () => {},
  cancelBooking: () => {},
  rescheduleBooking: () => {},
});

export const BookingProvider = ({ children }) => {
  const [currentBooking, setCurrentBooking] = useState(null);
  const [userBookings, setUserBookings] = useState([]);

  const addBooking = (booking) => {
    setUserBookings(prevBookings => [...prevBookings, booking]);
    setCurrentBooking(booking);
  };

  const cancelBooking = (bookingId) => {
    setUserBookings(prevBookings =>
      prevBookings.map(booking =>
        booking.id === bookingId
          ? { ...booking, status: 'cancelled' }
          : booking
      )
    );
  };

  const rescheduleBooking = (
    bookingId,
    newDate,
    newStartTime,
    newEndTime
  ) => {
    setUserBookings(prevBookings =>
      prevBookings.map(booking =>
        booking.id === bookingId
          ? { ...booking, date: newDate, startTime: newStartTime, endTime: newEndTime }
          : booking
      )
    );
  };

  return (
    <BookingContext.Provider
      value={{
        currentBooking,
        userBookings,
        setCurrentBooking,
        addBooking,
        cancelBooking,
        rescheduleBooking,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export default BookingContext;
