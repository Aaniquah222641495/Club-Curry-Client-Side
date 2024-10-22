import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import PropTypes from 'prop-types';
import StarRating from '../../Common/StarRating';
import '../Customer/CustomerCss/CustomerReviews.css';
import review from '../../../images/review.png';
import QR from '../../../images/QR.png';
import RestaurantDetails from './RestaurantDetails';

// Mapping numeric ratings to enum values
const ratingValues = {
  0: 'ZERO',
  1: 'ONE',
  2: 'TWO',
  3: 'THREE',
  4: 'FOUR',
  5: 'FIVE',
};

const CustomerReviews = ({ onAddReview, onDeleteReview, customer }) => {
  

  const [existingReviews, setExistingReviews] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [foodRating, setFoodRating] = useState('ZERO');
  const [serviceRating, setServiceRating] = useState('ZERO');
  const [atmosphereRating, setAtmosphereRating] = useState('ZERO');
  const [comments, setComments] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    // Fetch customer reviews from the backend using the customer email
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/ClubCurry/review/getAllByCustomerEmail/${customer.email}`);
        setExistingReviews(response.data);
      } catch (error) {
        console.error("Error fetching customer reviews:", error);
      }
    };

    if (customer?.email) {
      fetchReviews();
    }
  }, [customer]);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false);
    setAlertMessage('');
    resetFormFields();
  };

  const resetFormFields = () => {
    setFoodRating('ZERO');
    setServiceRating('ZERO');
    setAtmosphereRating('ZERO');
    setComments('');
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();

    if (foodRating === 'ZERO' || serviceRating === 'ZERO' || atmosphereRating === 'ZERO' || !comments) {
      setAlertMessage('Please fill in all required fields.');
      return;
    }

    const newReview = {

     
      customer:{email:customer.email},
      rating: {
        foodQuality: Object.keys(ratingValues).find(key => ratingValues[key] === foodRating),
        serviceQuality: Object.keys(ratingValues).find(key => ratingValues[key] === serviceRating),
        atmosphereQuality: Object.keys(ratingValues).find(key => ratingValues[key] === atmosphereRating),
      },
      
      comments,
    };
    console.log(newReview.rating.atmosphereQuality);

    try {
      const response = await axios.post('http://localhost:8080/ClubCurry/review/save', newReview);
      setExistingReviews([...existingReviews, response.data]); // Add the new review to the existing list
      setAlertMessage('Thank you for your review!');
      handleCloseModal();
    } catch (error) {
      console.error("Error submitting review:", error);
      setAlertMessage('Error submitting review. Please try again.');
    }
  };

  const handleDeleteReview = async (reviewId) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      try {
        await axios.delete(`http://localhost:8080/ClubCurry/review/delete/${reviewId}`);
        setExistingReviews(existingReviews.filter((review) => review.id !== reviewId));
        onDeleteReview(reviewId);
      } catch (error) {
        console.error("Error deleting review:", error);
      }
    }
  };

  return (
    <div className="review-section">
      <img src={review} alt="review header" className="review-image" />

      <div className="reviews-container">
        <h3>Your Reviews</h3>
        {existingReviews.length === 0 ? (
          <p>No reviews found. Click below to make a review.</p>
        ) : (
          <div className="reviews-slider">
            <button className="arrow left-arrow" onClick={() => { /* Handle left scroll */ }}>
              &lt;
            </button>
            <div className="reviews-list">
              {existingReviews.map((review) => (
                <div key={review.id} className="review-card">
                  <div className="review-header">
                    <span>{review.customerName}</span> {/* Dynamic customer name */}
                    <span className="review-timestamp">{review.timestamp}</span>
                  </div>
                  <div className="review-body">
                    <div className="rating-item">
                      <p><strong>Food Rating:</strong> {review.foodQuality}/5</p>
                      <StarRating rating={ratingValues[review.foodQuality]} readOnly />
                    </div>
                    <div className="rating-item">
                      <p><strong>Service Rating:</strong> {review.serviceQuality}/5</p>
                      <StarRating rating={ratingValues[review.serviceQuality]} readOnly />
                    </div>
                    <div className="rating-item">
                      <p><strong>Atmosphere Rating:</strong> {review.atmosphereQuality}/5</p>
                      <StarRating rating={ratingValues[review.atmosphereQuality]} readOnly />
                    </div>
                    <div className="rating-item">
                      <p>{review.comments}</p>
                    </div>
                  </div>
                  <div className="review-actions">
                    <Button variant="danger" onClick={() => handleDeleteReview(review.id)}>
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <button className="arrow right-arrow" onClick={() => { /* Handle right scroll */ }}>
              &gt;
            </button>
          </div>
        )}
      </div>

      <div className="feedback-section">
        <div className="feedback-text">
          <h3>Thank you for being part of our family!</h3>
          <p>As a token of appreciation, every reviewer will receive a <strong>10% discount</strong> on their next visit. Don't forget to ask us about it!</p>
          <Button variant="primary" onClick={handleOpenModal} className="add-review-button">
            Add Review
          </Button>
        </div>
        <img src={QR} alt="QR code" className="qr-image" />
      </div>

      <RestaurantDetails />

      {/* Modal for adding a review */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Your Review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {alertMessage && <Alert variant="success">{alertMessage}</Alert>}
          <Form onSubmit={handleSubmitReview}>
            <Form.Group>
              <Form.Label>Food Rating</Form.Label>
              <StarRating rating={foodRating} onRate={(rate) => setFoodRating(ratingValues[rate])} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Service Rating</Form.Label>
              <StarRating rating={serviceRating} onRate={(rate) => setServiceRating(ratingValues[rate])} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Atmosphere Rating</Form.Label>
              <StarRating rating={atmosphereRating} onRate={(rate) => setAtmosphereRating(ratingValues[rate])} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Comments</Form.Label>
              <Form.Control as="textarea" rows={3} value={comments} onChange={(e) => setComments(e.target.value)} required />
            </Form.Group>
            <Button type="submit" variant="primary">
              Submit Review
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

CustomerReviews.propTypes = {
  onAddReview: PropTypes.func.isRequired,
  onDeleteReview: PropTypes.func.isRequired,
  customer: PropTypes.object.isRequired
};

export default CustomerReviews;
