import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Button, Modal, ProgressBar } from 'react-bootstrap';
import './CustomerCss/OrderHistorySection.css'; // Import the CSS file
import CustomerDashboardHeader from './CustomerDashboardHeader';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios'; 
import RestaurantDetails from './RestaurantDetails';

const OrderHistorySection = ({ decodedValue }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [deliveries, setDeliveries] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    // Fetch deliveries for the specific customer
    const fetchDeliveries = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/ClubCurry/delivery/getByCustomerEmail/${decodedValue.email}`);
        setDeliveries(response.data);
      } catch (error) {
        console.error('Error fetching deliveries:', error);
      }
    };

    if (decodedValue?.email) {
      fetchDeliveries();
    }
  }, [decodedValue]);

  // Handle Modal show/hide
  const handleShowModal = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Get progress bar value based on the status
  const getProgress = (status) => {
    switch (status) {
      case 'PENDING':
        return 33;
      case 'IN_TRANSIT':
        return 66;
      case 'DELIVERED':
        return 100;
      default:
        return 0;
    }
  };

  return (
    <div className="order-history-section">
      <CustomerDashboardHeader /> {/* Add this line */}
      <h2>Your Orders</h2>
      <div className="orders-container">
        {deliveries
          .filter(order => order.isDelivered) 
          .map(order => (
            <div key={order.id} className="order-card">
              <Card className="mb-4">
                <Card.Body>
                  <Card.Title>Order #{order.id}</Card.Title>
                  <p><strong>Store:</strong> {order.order.restaurantName}</p>
                  <p><strong>Date:</strong> {new Date(order.completed).toLocaleDateString()}</p> {/* Displaying date */}
                  <p><strong>Time:</strong> {order.timeOfDelivery}</p> {/* Displaying time */}
                  <p><strong>Cost:</strong> ${order.order.total.toFixed(2)}</p>
                  <p><strong>Payment:</strong> {order.order.paymentMethod}</p>
                  <p><strong>Status:</strong> {order.status}</p>
                  <Button variant="primary" className="mt-2">Reorder</Button>
                </Card.Body>
              </Card>
            </div>
          ))}
      </div>

      {/* Delivery Status Section */}
      <h2>Delivery Status</h2>
      <Row className="delivery-status-container">
        {deliveries
          .filter(order => !order.isDelivered) // Filter for ongoing deliveries
          .map(order => (
            <Col md={4} key={order.id}>
              <Card className="mb-4">
                <Card.Body>
                  <p><strong>Store:</strong> {order.order.restaurantName}</p>
                  <p><strong>Order #:</strong> {order.id}</p>
                  <p><strong>Date:</strong> {new Date(order.completed).toLocaleDateString()}</p> {/* Displaying date */}
                  <p><strong>Time:</strong> {order.timeOfDelivery}</p> {/* Displaying time */}
                  <Button
                    variant="outline-primary"
                    onClick={() => handleShowModal(order)}
                  >
                    Track Order
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
      </Row>

      {/* Modal for Tracking Orders */}
      {selectedOrder && (
        <Modal show={showModal} onHide={handleCloseModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>Track Order #{selectedOrder.id}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h5>Store: {selectedOrder.order.restaurantName}</h5>
            <p>Status: {selectedOrder.status}</p>
            <p><strong>Date:</strong> {new Date(selectedOrder.completed).toLocaleDateString()}</p> {/* Displaying date */}
            <p><strong>Time:</strong> {selectedOrder.timeOfDelivery}</p> {/* Displaying time */}
            <ProgressBar animated now={getProgress(selectedOrder.status)} />
            <p>
              {selectedOrder.status === 'PENDING' && 'Your order is being prepared.'}
              {selectedOrder.status === 'IN_TRANSIT' && 'Your order is on its way!'}
              {selectedOrder.status === 'DELIVERED' && 'Your order has been delivered!'}
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
      
      <RestaurantDetails />
    </div>
  );
};

export default OrderHistorySection;
