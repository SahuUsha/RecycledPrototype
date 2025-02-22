import React, { useEffect, useState } from "react";
import { getUserDetails } from "../Api/user.api.js";
import image from "../images/profil.jpeg"
import "../styles/dashboard.css"
import Navbar from "../components/Navbar.jsx";

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const userData = await getUserDetails();
                console.log(userData.user)
                setUser(userData.user);
            } catch (error) {
                console.error("Failed to fetch user details", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserDetails();
    }, []);

    if (loading) return <p>Loading...</p>;

    return (
      <div>
        <Navbar/>
      <div className="profile-container">
      <h2 className="profile-title">My Profile</h2>
      {user ? (
        <>
          <img src={image} alt="Profile" className="profile-img" />
          <div className="profile-section"><strong>Username:</strong> <span>{user.username}</span></div>
          <div className="profile-section"><strong>Email:</strong> <span>{user.email}</span></div>
          <div className="profile-section"><strong>Wallet ID:</strong> <span>{user.walletId}</span></div>
          <div className="profile-section"><strong>Balance:</strong> <span>${user.balance}</span></div>
          <div className="profile-section"><strong>Events Joined:</strong> <span>{user.total_events_joined}</span></div>
        </>
      ) : (
        <p className="no-user">No user data available</p>
      )}
    </div>
    </div>
    );
};

export default Dashboard;
