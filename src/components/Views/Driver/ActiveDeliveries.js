import React from 'react';
import PropTypes from 'prop-types';
import '../Driver/DriverCSS/ActiveDeliveries.css'; // Make sure you have this CSS file for styling
const ActiveDeliveries = ({ deliveries = [], onUpdateStatus }) => {
  // Filter only deliveries that are in transit
  const inTransitDeliveries = deliveries;

  return (
    <div className="active-deliveries-container">
            <div className="active-deliveries-card-grid">

        {inTransitDeliveries.length === 0 ? (
          <p>No active deliveries</p>
        ) : (
          inTransitDeliveries.map(delivery => (
            <div key={delivery.id} className="active-delivery-card">
              <h3>Order #{delivery.id}</h3>
              <p><strong>Customer Name:</strong> {delivery.order.cart.customer.name} {delivery.order.cart.customer.surname}</p>
              <p><strong>Customer Contact:</strong> {delivery.order.cart.customer.mobileNo}</p>
              <p><strong>Customer Address:</strong> {delivery.address.streetNo} {delivery.address.streetName},{delivery.address.suburb.suburbName} ,{delivery.address.suburb.postalCode}</p>
              {/* <p><strong>Address:</strong> {delivery.address}</p> */}
              <p><strong>Status:</strong> {delivery.status}</p>
              <button
                className="active-delivery-btn delivered-btn"
                onClick={() => onUpdateStatus(delivery.deliveryId, 'delivered')}
              >
                Mark as Delivered
              </button>
            </div>
          )) 
          // <p> test</p>
        )}
      </div>
    </div>
  );
};

ActiveDeliveries.propTypes = {
  deliveries: PropTypes.array,
  onUpdateStatus: PropTypes.func.isRequired,
};

export default ActiveDeliveries;
