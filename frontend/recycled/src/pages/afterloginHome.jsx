import React from 'react'
import { Leaf } from 'lucide-react';
import { Link } from 'react-router-dom';
import "../styles/home.css"
import Navbar from '../components/Navbar';

const AfterLogin = () => {
  return (
    <div className="container">
        <Navbar/>
      {/* Header */}
      {/* <header className="header">
        <div className="logo">
          <Leaf className="icon" />
          <span className="title">EcoRewards</span>
        </div>
      </header> */}

      {/* Main Content */}
      <main className="main-content">
        <div className="text-center">
          <h1 className="heading">
          Welcome to Recycle Smart! 
            <br />
            <span className="highlight">Earn Rewards</span>
          </h1>

          <p className="description">
          You're now part of a community that cares about sustainability and rewards your efforts! 🌱✨

Together, we can make a real difference by reducing waste, promoting responsible recycling, and building a cleaner future for everyone. Every small action counts, and your contributions help create a greener planet.
          </p>

          <Link to="/event" className="button">
          Explore Events Now
          </Link>
        </div>

        {/* How It Works Section */}
        <section className="how-it-works">
  <h2 className="section-title">How It Works</h2>
  <div className="steps-container">
    <div>
      <h2>Step 1</h2>
      <h1>Capture & Upload</h1>
      <p>Take a photo of your recyclable waste and upload it to our platform. Our AI-powered system will verify if it qualifies for recycling rewards.</p>
    </div>
    <div>
      <h2>Step 2</h2>
      <h1>Join or Create Events</h1>
      <p>Participate in local recycling events or start your own. Earn points for every verified contribution and inspire others to take action.</p>
    </div>
    <div>
      <h2>Step 3</h2>
      <h1>Earn & Redeem Rewards</h1>
      <p>Collect points for your efforts and redeem them for exciting rewards, discounts, or eco-friendly products. The more you recycle, the more you earn!</p>
    </div>
  </div>
</section>
<section className="how-it-works-2">
  <h2 className="section-title">Featured Events</h2>
  <div className="steps-container">
    <div>
      <h2>Step 1</h2>
      <h1>Capture & Upload</h1>
      <p>Take a photo of your recyclable waste and upload it to our platform. Our AI-powered system will verify if it qualifies for recycling rewards.</p>
    </div>
    <div>
      <h2>Step 2</h2>
      <h1>Join or Create Events</h1>
      <p>Participate in local recycling events or start your own. Earn points for every verified contribution and inspire others to take action.</p>
    </div>
    <div>
      <h2>Step 3</h2>
      <h1>Earn & Redeem Rewards</h1>
      <p>Collect points for your efforts and redeem them for exciting rewards, discounts, or eco-friendly products. The more you recycle, the more you earn!</p>
    </div>
  </div>
</section>
<section className="how-it-works-3">
  <h2 className="section-title">Our Impact</h2>
  <div className="steps-container">
    <div>
   
      <h2>1000+</h2>
      <p> Volunteers</p>
    </div>
    <div>
   
      <h2> 50+</h2>
      <p> Events Completed</p>
    </div>
    <div>

      <h2>5 tons</h2>
      <p> Waste Collected</p>
    </div>
  </div>
</section>
      </main>
    </div>
  )
}

export default AfterLogin
