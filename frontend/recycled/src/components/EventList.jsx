import React, { useState, useEffect } from "react";
import { fetchAllEvent, joinEvent } from "../Api/event.api.js";
import EventCard from "./eventCard.jsx";
import "../styles/eventlist.css"
import { Target} from 'lucide-react';
import Navbar from "./Navbar.jsx";

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [showOrganizer, setShowOrganizer] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  // Fetch events from backend
  const fetchEvents = async () => {
    try {
        const response = await fetchAllEvent(); // Axios response

    if (!response || !response.data) {
      throw new Error("Invalid response structure");
    }

    console.log("response: ", response);
    setEvents(response.data.data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };


  const handlejoinEvent = async (eventId) => {
    try {
       const response =  await joinEvent(eventId);
       console.log("response : ",response)
        alert("Joined event successfully!");
        fetchEvents(); // Refresh event list after joining
    } catch (error) {
        alert(error.response?.data?.message || "Failed to join event.");
    }
  };

  return (
    <div >
      <Navbar/>
   <div className="mission-header">
  <div className="mission-text">
    <h2>Available Missions</h2>
    <p>Complete missions to earn rewards</p>
  </div>
  <div className="mission-icon">
    <Target />
  </div>
</div>
    {events.length === 0 ? (
      <p>No events available.</p>
    ) : (
      <div className="event">
      <div className="event-list">
        {events.map((event) => (
          <EventCard key={event._id} event={event} handleJoinEvent={handlejoinEvent} />
        ))}
      </div>
      </div>
    )}
  </div>
  );
};

export default EventList;
