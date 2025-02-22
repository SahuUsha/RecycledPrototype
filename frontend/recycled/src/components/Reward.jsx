import React from 'react';
import { Gift, ShoppingBag, Ticket, TreePine } from 'lucide-react';
import '../styles/reward.css'; // Import the CSS file
import Navbar from './Navbar';

const Rewards = () => {
    const rewards = [
      {
        title: "10% Off at EcoStore",
        points: 1000,
        category: "Discount",
        icon: ShoppingBag,
        description: "Get 10% off your next purchase at EcoStore"
      },
      {
        title: "Movie Tickets",
        points: 2500,
        category: "Entertainment",
        icon: Ticket,
        description: "Two tickets to any movie at EcoCinema"
      },
      {
        title: "Plant a Tree",
        points: 1500,
        category: "Environmental",
        icon: TreePine,
        description: "We'll plant a tree in your name"
      }
    ];
  
    return (
        <div>
        <Navbar/>
      <div className="rewards-container">
        {/* Header */}
        <div className="rewards-header">
          <div>
            <h2>Rewards Store</h2>
            <p>Redeem your points for amazing rewards</p>
          </div>
          <div className="rewards-icon">
            <Gift />
          </div>
        </div>
  
        {/* Points Display */}
        <div className="points-container">
          <div className="points-header">
            <div>
              <p>Available Points</p>
              <p className="points-value">2,450</p>
            </div>
            <Gift className="points-icon" />
          </div>
        </div>
  
        {/* Rewards List */}
        <div className="rewards-grid">
          {rewards.map((reward, index) => (
            <div key={index} className="reward-card">
              {/* Reward Header */}
              <div className="reward-header">
                <div className="reward-icon-container">
                  <reward.icon />
                </div>
                <span className="reward-points">{reward.points} pts</span>
              </div>
  
              {/* Reward Content */}
              <h3 className="reward-title">{reward.title}</h3>
              <p className="reward-description">{reward.description}</p>
  
              {/* Reward Footer */}
              <div className="reward-footer">
                <span className="reward-category">{reward.category}</span>
                <button
                  className={`redeem-button ${
                    2450 >= reward.points ? 'enabled' : 'disabled'
                  }`}
                  disabled={2450 < reward.points}
                >
                  {2450 >= reward.points ? 'Redeem' : 'Not enough points'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>
    );
  };
  
  export default Rewards;
