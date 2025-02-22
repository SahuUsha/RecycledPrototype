import React from 'react';
import Navbar from './Navbar';
import "../styles/learn.css";

const Learn = () => {
    const learn = [
        {
            title: "Weekly Recycling Champion",
            description: "Recycle 100 items this week",
            image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80&w=300"
        },
        {
            title: "Plastic-Free Hero",
            description: "Avoid plastic usage for 7 days",
            image:"https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80&w=300"
        },
        {
            title: "Compost Master",
            description: "Turn food waste into compost for a month",
            image:"https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80&w=300"
        }
    ];

    return (
        <div>
            <Navbar />
            <div className="learn-container">
                <h1>Learn Environment</h1>
                <div className="learn-grid">
                    {learn.map((course, index) => (
                        <div key={index} className="course-card">
                            <img src={course.image} alt={course.title} />
                            <h2>{course.title}</h2>
                            <p>{course.description}</p>
                            <button>Enroll the course</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Learn;
