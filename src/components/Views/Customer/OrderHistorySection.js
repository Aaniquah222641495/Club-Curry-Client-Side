import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Button, Modal, ProgressBar } from 'react-bootstrap';
import PropTypes from 'prop-types';
import './CustomerCss/OrderHistorySection.css'; // Import the CSS file
//import CustomerDashboardHeader from './CustomerDashboardHeader';
//import { useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios'; 
import RestaurantDetails from './RestaurantDetails';
import order1 from '../../../images/order1.png'
import order2 from '../../../images/order2.png'

const OrderHistorySection = ({customer}) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [deliveries, setDeliveries] = useState([]);
  //const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    // Fetch deliveries for the specific customer
    const fetchDeliveries = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/ClubCurry/delivery/getByCustomerEmail/${customer.email}`);
        setDeliveries(response.data);
      } catch (error) {
        console.error('Error fetching deliveries:', error);
      }
    };

    if (customer?.email) {
      fetchDeliveries();
    }
  }, [customer]);

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
            <img src={order1} alt="order- header" className="order-image" />

      
      <div className="orders-container">
        {deliveries
          .filter(delivery => delivery.delivered)
          .map(delivery => (
            <div key={delivery.id} className="order-card">
              <Card className="mb-4">
                <Card.Body>
                  <Card.Title>Order #{delivery.id}</Card.Title>
                  <p><strong>Date:</strong> {new Date(delivery.completed).toLocaleDateString('it-IT')}</p> {/* Displaying date */}
                  <p><strong>Time:</strong> {delivery.timeOfDelivery}</p> {/* Displaying time */}
                  <p><strong>Cost:</strong> ${delivery.order.cart.items.reduce((total, current) => (total + current.menuItem.price * current.quantity), 0)}</p>
                  <p><strong>Payment:</strong> {delivery.order.paymentMethod}</p>
                  <p><strong>Status:</strong> {delivery.status}</p>
                  <Button variant="primary" className="mt-2">Reorder</Button>
                </Card.Body>
              </Card>
            </div>
          ))}
      </div>

      {/* Delivery Status Section */}
      <img src={order2} alt="order- header" className="order-image" />
      <Row className="delivery-status-container">
        {deliveries
          .filter(delivery => !delivery.delivered) // Filter for ongoing deliveries
          .map(delivery => (
            <Col md={4} key={delivery.id}>
              <Card className="mb-4">
                <Card.Body>
                  <p><strong>Order #:</strong> {delivery.id}</p>
                  <p><strong>Date:</strong> {new Date(delivery.completed).toLocaleDateString()}</p> {/* Displaying date */}
                  <p><strong>Time:</strong> {delivery.timeOfDelivery}</p> {/* Displaying time */}
                  <Button
                    variant="outline-primary"
                    onClick={() => handleShowModal(delivery)}
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

OrderHistorySection.propTypes = {
  customer: PropTypes.object.isRequired,

};

export default OrderHistorySection;
