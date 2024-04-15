import React from "react";
import "../styles/Schedule.css";

function Schedule() {
  return (
    <div className="schedule">
        <h1> Book a Class</h1>
        <form id="contact-form" method="POST">
          <label htmlFor="name">Full Name</label>
          <input name="name" placeholder="Enter full name..." type="text" />
          <label htmlFor="email">Email</label>
          <input name="email" placeholder="Enter email..." type="email" />
          <button type="submit"> Book Class</button>
        </form>
      </div>
  );
}

export default Schedule;