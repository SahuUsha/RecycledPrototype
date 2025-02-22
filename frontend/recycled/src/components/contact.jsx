import React, { useState } from "react";
// import "../styles/ContactForm.css";
import '../styles/contact.css';
import Navbar from "./Navbar";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contactNumber: "",
    userType: "Organization",
    message: "",
    gender: "",
    city: "",
    state: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);

    setFormData({
        name: "",
        email: "",
        contactNumber: "",
        userType: "Organization",
        message: "",
        gender: "",
        city: "",
        state: "",
      });
  };

  return (
    <div>
        <Navbar/>
    <div className="contact-container">
      <h2 className="contact-title">Contact Us</h2>
      <form className="contact-form" onSubmit={handleSubmit}>
        
        {/* Name */}
        <div className="form-group">
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>

        {/* Email */}
        <div className="form-group">
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>

        {/* Contact Number */}
        <div className="form-group">
          <label>Contact Number:</label>
          <input type="tel" name="contactNumber" value={formData.contactNumber} onChange={handleChange} required />
        </div>

        {/* User Type Dropdown */}
        <div className="form-group">
          <label>User Type:</label>
          <select name="userType" value={formData.userType} onChange={handleChange}>
            <option value="Organization">Organization</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Gender */}
        <div className="form-group">
          <label>Gender:</label>
          <div className="gender-options">
            <label><input type="radio" name="gender" value="Male" onChange={handleChange} required /> Male</label>
            <label><input type="radio" name="gender" value="Female" onChange={handleChange} required /> Female</label>
          </div>
        </div>

        {/* City */}
        <div className="form-group">
          <label>City:</label>
          <input type="text" name="city" value={formData.city} onChange={handleChange} required />
        </div>

        {/* State */}
        <div className="form-group">
          <label>State:</label>
          <input type="text" name="state" value={formData.state} onChange={handleChange} required />
        </div>

        {/* Message */}
        <div className="form-group">
          <label>Message:</label>
          <textarea name="message" value={formData.message} onChange={handleChange} rows="4" required></textarea>
        </div>

        {/* Submit Button */}
        <button type="submit" className="submit-btn">Submit</button>
      </form>
    </div>
    </div>
  );
};

export default Contact;
