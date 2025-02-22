import React, { useState, useRef } from "react";
import { addEvent } from "../Api/event.api.js";
import { Camera, Upload, CheckCircle, XCircle } from 'lucide-react';
import "../styles/addevent.css"
import Navbar from "./Navbar.jsx";



const AddEvent = ({ onEventAdded }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    image: null,
  });

  const fileInputRef = useRef(null); // Reference for file input

  // Handle input changes
  const handleChange = (e) => {
    if (e.target.name === "image") {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addEvent(formData);
      alert("Event added successfully!");
      
      // Reset form fields
      setFormData({ title: "", description: "", location: "", image: null });

      // Clear file input manually
      if (fileInputRef.current) {
        fileInputRef.current.value = ""; // Reset file input
      }

      onEventAdded(); // Refresh event list
    } catch (error) {
      console.error("Error adding event:", error);
      alert(error.response?.data?.message || "Failed to add event.");
    }
  };

  return (
    <div >
      <Navbar/>
      <div className="eventheader">

      <h2 className="event-title">Recycling Scanner Add Mission</h2>
      <p className="event-subtitle">Scan items to verify recyclability</p>
      </div>
  <div className="event-container">
      {/* Upload Box */}
      <div className="upload-box" onClick={() => fileInputRef.current.click()}>
        <Upload className="upload-icon" />
        <p>Upload a photo of the event</p>
        <p className="upload-formats">Supported formats: JPG, PNG</p>
        <button className="upload-btn">Select Photo</button>
        <input type="file" name="image" ref={fileInputRef} onChange={handleChange} hidden />
      </div>

      {/* Form Fields */}
      <form onSubmit={handleSubmit} className="event-form">
        <input type="text" name="title" placeholder="Event Title" value={formData.title} onChange={handleChange} required />
        <input type="text" name="description" placeholder="Event Description" value={formData.description} onChange={handleChange} required />
        <input type="text" name="location" placeholder="Event Location" value={formData.location} onChange={handleChange} required />
        <button type="submit" className="submit-btn">Add Event</button>
      </form>

      {/* Camera Icon */}
      <div className="camera-icon">
        <Camera />
      </div>
      </div>
      <div className="scanning-tips-container">
      <h3 className="scanning-tips-title">Scanning Tips</h3>
      <ul className="scanning-tips-list">
        <li className="scanning-tips-item">
          <div className="scanning-tips-icon">
            <Camera />
          </div>
          Ensure good lighting for accurate detection
        </li>
        <li className="scanning-tips-item">
          <div className="scanning-tips-icon">
            <Camera />
          </div>
          Center the item in the frame
        </li>
        <li className="scanning-tips-item">
          <div className="scanning-tips-icon">
            <Camera />
          </div>
          Remove any obstructions or background clutter
        </li>
      </ul>
    </div>
    </div>
  );
};

export default AddEvent;
