import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import BookingModal from '../../Common/BookingModal';
import ReviewSection from './ReviewSection'; // Import the new component
import '../../../CSS/HomePage.css';
import chef from '../../../images/chefs.jpg';
import food from '../../../images/food.jpg';

// Sample menu items (Replace with real data)
const sampleMenuItems = [
  { id: 1, name: 'Chicken Curry' },
  { id: 2, name: 'Lamb Vindaloo' },
  { id: 3, name: 'Vegetable Biryani' },
  { id: 4, name: 'Paneer Butter Masala' },
  { id: 5, name: 'Naan Bread' }
];

function HomePage({ setShowBooking, showBooking }) {
  return (
    <div className="home-page">
      {/* Existing content */}
      <div className="about-section">
        <h1 className="display-4 mb-4 typewriter-title">A Symphony of Authentic Indian Flavors</h1>
        <h3 className="lead mb-4 fade-in-text">
          <b>Welcome to Club Curry. We offer a variety of delicious curries...</b>
        </h3>
        <p className="lead">
          At Club Curry, we are passionate about bringing the authentic taste of North Indian cuisine to you. 
          Our skilled chefs use a blend of traditional Ayurvedic spices and the freshest ingredients to create 
          dishes that are both healthy and delicious. Join us for a meal and experience the rich flavors of India.
        </p>
        <Button variant="danger" as={Link} to="/menu" className="buttonmen fade-in-text">
          View Menu & Order
        </Button>
      </div>
      
      {/* About Us Section */}
      <div className="about-us-section">
        <div className="about-us-images">
          <img src={chef} alt="chefs" />
          <img src={food} alt="food" />
        </div>
        <div className="about-us-content">
          <h2 className="about-us-heading">About Us</h2>
          <p className="lead">
            IN THE HEART OF THE KITCHEN… Our Ayurvedic Head Chef and his team are from Delhi… 
            They’ve woven North Indian cuisine and music into their souls since they were youngsters. 
            The hub of Club Curry, from deep in the spice kitchens of the famous Taj Palace in Mumbai, 
            the Ayurvedic blending of spice, carefully selected meats, organic veg and pulses creates 
            true food balance and wondrous healthy results.
          </p>
          <Button variant="danger" className="button-booking" onClick={() => setShowBooking(true)}>
            Book a Table
          </Button>
        </div>
      </div>

      {/* Reviews Section */}
      <ReviewSection menuItems={sampleMenuItems} />

      {showBooking && <BookingModal show={showBooking} onHide={() => setShowBooking(false)} />}
    </div>
  );
}

export default HomePage;
