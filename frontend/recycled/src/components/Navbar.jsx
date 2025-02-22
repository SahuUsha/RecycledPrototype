import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Leaf,Menu, X } from 'lucide-react';
import {
  Home,
  Target,
  Camera,
  Gift,
  Book,
  Mail,
  LayoutDashboard,
  LogOut,
} from "lucide-react";
import "../styles/Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { path: "/ecorewards", label: "Home", icon: Home },
    { path: "/event", label: "Event", icon: Target },
    { path: "/addMission", label: "Scanner", icon: Camera },
    { path: "/reward", label: "Reward", icon: Gift },
    { path: "/learn", label: "Learn", icon: Book },
    { path: "/contact", label: "Contact", icon: Mail },
    { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  ];

  return (
    <nav className="navbar">
    
         <h1 className="logo"><Leaf className="icon" />Naskham</h1>
      <button className="menu-btn" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X className="icon" /> : <Menu className="icon-h" />}
      </button>
      
      {isOpen && (
        <div className="nav-menu">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.path}
                onClick={() => {
                  navigate(item.path);
                  setIsOpen(false);
                }}
                className="nav-btn"
              >
                <Icon className="icon" />
                <span className="label">{item.label}</span>
              </button>
            );
          })}
          <button className="nav-btn logout" onClick={() => navigate("/")}> 
            <LogOut className="icon" />
            <span className="label">Logout</span>
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
