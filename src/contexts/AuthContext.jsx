import React, { createContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // display the logged in user, as { id, email }
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user") || "null")
  );

  //this state to manage bookings
  const [bookings, setBookings] = useState(
    JSON.parse(localStorage.getItem("bookings") || "{}")
  );

  // login function
  function login(email) {
    const u = { id: Date.now().toString(), email };
    setUser(u);
    localStorage.setItem("user", JSON.stringify(u));

    // if the user has no bookings yet, initialize an empty array for them . 
    if (!bookings[email]) {
      const updated = { ...bookings, [email]: [] };
      setBookings(updated);
      localStorage.setItem("bookings", JSON.stringify(updated));
    }
  }

  // logout function
  function logout() {
    setUser(null);
    localStorage.removeItem("user");
  }

  // add a booking for a specific user
  function addBooking(email, booking) {
    const updated = {
      ...bookings,
      [email]: [...(bookings[email] || []), booking],
    };
    setBookings(updated);
    localStorage.setItem("bookings", JSON.stringify(updated));
  }

  // retrieve bookings for a specific user
  function getUserBookings(email) {
    return bookings[email] || [];
  }

  // cancel a booking
  function cancelBooking(email, bookingId) {
    const updated = {
      ...bookings,
      [email]: (bookings[email] || []).filter((b) => b.id !== bookingId),
    };
    setBookings(updated);
    localStorage.setItem("bookings", JSON.stringify(updated));
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        addBooking,
        getUserBookings,
        cancelBooking,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
