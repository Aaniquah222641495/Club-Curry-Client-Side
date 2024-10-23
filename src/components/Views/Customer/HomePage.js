import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import BookingModal from '../../Common/BookingModal';
import ReviewSection from './ReviewSection'; // Import the new component
import '../../../CSS/HomePage.css';
import chef from '../../../images/chefs.jpg';
import food from '../../../images/food.jpg';
import FAQ from './FAQ';

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
      {/* About Section */}
      <div className="about-section">
        <h1 className="display-7 mb-4 typewriter-title">CLUB CURRY</h1>
        <h2 className="lead mb-4 fade-in-text">
         A symphony of authentic indian flavors
        </h2>
        
        <Button variant="danger" as={Link} to="/menu" className="buttonmen fade-in-text">
          View Menu 
        </Button>
      </div>

      {/* About Us Section */}
      <div className="wrapper">
        <div className="about-us-section">
        <h2 className="about-us-heading">About Us</h2><br />
        <p className="about-us-description">
             ClubCurry is a vibrant culinary destination known for its exquisite blend of traditional and modern indian cuisine. Our commitment to qaulity and innovation has earned us numerous accolades in the culinary world
          <br/>
          <br/>
          At Club Curry, we are passionate about bringing the authentic taste of North Indian cuisine to you.
          Our skilled chefs use a blend of traditional Ayurvedic spices and the freshest ingredients to create
          dishes that are both healthy and delicious. Join us for a meal and experience the rich flavors of India.
            </p>
            <img src={chef} 
            alt="chefs preparing dishes"
            className="about-us-image"
             />
          </div>
          
        </div>
     

      {/* Reviews Section */}
      <ReviewSection menuItems={sampleMenuItems} />

     {/* Trading Hours Section */}
<div className="trading-hours-section">
  <div className="trading-hours">
    <h3>Trading Hours</h3>
    <ul>
      <li>Monday - Friday: 11:00 AM - 10:00 PM</li>
      <li>Saturday - Sunday: 12:00 PM - 11:00 PM</li>
      <li>Public Holidays: 12:00 PM - 8:00 PM</li>
    </ul>
  </div>
</div>

<FAQ/>

{/* Restaurant Details Section */}
<div className="restaurant-details-section">
  <div className="details-left">
  
    <div className="map-container">
      {/* Embed Google Maps */}
      
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3309.872085711296!2d18.419742215223726!3d-33.92486898064242!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1dcc6765df2fa921%3A0x73daccbd1e24d63d!2sCape%20Town%20City%20Centre%2C%20Cape%20Town%2C%208000!5e0!3m2!1sen!2sza!4v1691409942597!5m2!1sen!2sza"
        width="100%"
        height="100%"
        allowFullScreen=""
        loading="lazy"
        title="Google Maps"
      ></iframe>
    </div>
    <p>Click map to view Google Maps </p>
  </div>
  <div className="details-right">
          <div className="address-section">
            <p>
              <i className="fas fa-map-marker-alt"></i>
              <h3><strong>Address</strong></h3>
            </p>
            <p className="address-description">
              Come say hello and enjoy some good food!
            </p>
            <p className="address-details">123 Spice Avenue, Cape Town, 8000</p>
          </div>
          <div className="phone-section">
            <p>
              <i className="fas fa-phone"></i>
              <h3><strong>Phone</strong></h3>
            </p>
            <p className="phone-details">+27 21 123 4567</p>
          </div>
          <div className="email-section">
            <p>
              <i className="fas fa-envelope"></i>
              <h3><strong>Email</strong></h3>
            </p>
            <p className="email-description">Chat with us</p>
            <p className="email-details">contact@clubcurry.co.za</p>
          </div>
        </div>
      </div>

      {showBooking && <BookingModal show={showBooking} onHide={() => setShowBooking(false)} />}
    </div>
  );
}

export default HomePage;
