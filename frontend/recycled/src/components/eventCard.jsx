import React, { useState, useEffect, useRef } from "react";
import "../styles/event.css";
import { Target, Award, Clock } from "lucide-react";

const EventCard = ({ event, handleJoinEvent }) => {
  const [showQR, setShowQR] = useState(false);
  const qrRef = useRef(null);

  // Function to handle clicking "Join Event"
  const handleJoinClick = () => {
    handleJoinEvent(event._id); // Call event join function
    setShowQR(true); // Show QR code
  };

  // Close QR on clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (qrRef.current && !qrRef.current.contains(event.target)) {
        setShowQR(false);
      }
    };

    if (showQR) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showQR]);

  return (
    <li className="event-card">
      {event.image && <img src={event.image} alt="Event" className="event-image" />}
      <h4 className="event-title">{event.title}</h4>
      <p className="event-description">{event.description}</p>
      <p className="event-location"><strong>Location:</strong> {event.location}</p>

      {/* Event Meta Data */}
      <div className="event-meta">
        <div className="meta-item">
          <Clock />
          5 days left
        </div>
        <div className="meta-item">
          <Award />
          Medium
        </div>
      </div>

      {/* Participants Count */}
      <p className="participants"><strong>Participants:</strong> {event.participants?.length || 0}</p>

      {/* Join Event Button */}
      <button className="join-btn" onClick={handleJoinClick}>Join Event</button>

      {/* QR Code Overlay */}
      {showQR && (
        <div className="qr-overlay" ref={qrRef}>
          <div className="qr-box">
            <p>Scan to Join:</p>
            <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=YourEventDataHere" alt="QR Code" />
          </div>
        </div>
      )}
    </li>
  );
};

export default EventCard;
