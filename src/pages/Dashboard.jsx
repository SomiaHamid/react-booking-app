import React, { useContext } from "react";
import AuthContext from "../contexts/AuthContext";
import "../styles/dashboard.css";

export default function Dashboard() {
  const { user, getUserBookings, cancelBooking } = useContext(AuthContext);

  const bookings = getUserBookings(user.email);
  function handleCancel(bookingId) {
    const confirmDelete = window.confirm("Are you sure you want to cancel this booking?");
    if (confirmDelete) {
      cancelBooking(user.email, bookingId);
      alert("Booking cancelled successfully");
    }
  }

  return (
    <div className="dashboard-container">
      <h2>My Bookings</h2>
      {bookings.length === 0 ? (
        <p>No bookings found</p>
      ) : (
        bookings.map((b) => (
          <div key={b.id} className="booking-card">
            <p className="event-title">
              <strong>{b.eventTitle}</strong>
            </p>
            <p className="booking-details">
              Name: {b.name} | Seats: {b.seats}
            </p>
            <button
              className="cancel-button"
              onClick={() => handleCancel(b.id)}
            >
              Cancel Booking
            </button>

          </div>
        ))
      )}
    </div>
  );
}
