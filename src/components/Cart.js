import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { FaTrashAlt } from 'react-icons/fa'; // Import delete icon from react-icons

const Cart = ({ cartItems, onRemoveItem, onUpdateQuantity, onCheckout, showCart, onCloseCart }) => {
  // Function to handle quantity change
  const handleQuantityChange = (itemId, specialNote, change) => {
    onUpdateQuantity(itemId, specialNote, change); // Adjust quantity
  };

  // Function to handle item removal
  const handleRemove = (itemId, specialNote) => {
    onRemoveItem(itemId, specialNote); // Remove entire item
  };

  // Calculate total price
  const getTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <Modal show={showCart} onHide={onCloseCart} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Cart</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {cartItems.length > 0 ? (
          <div className="cart-items">
            {cartItems.map(item => (
              <div key={`${item.id}-${item.specialNote}`} className="cart-item">
                <img src={item.image} alt={item.name} />
                <div className="cart-item-details">
                  <span>{item.name}</span>
                  <span>{item.spiceLevel}</span>
                  <span>Special Instructions: {item.specialNote}</span>
                  <span>R{item.price.toFixed(2)}</span>
                </div>
                <div className="cart-item-actions">
                  <div className="item-quantity">
                    <Button
                      variant="secondary"
                      onClick={() => handleQuantityChange(item.id, item.specialNote, -1)}
                      disabled={item.quantity <= 1}
                    >
                      -
                    </Button>
                    <span>{item.quantity}</span>
                    <Button
                      variant="secondary"
                      onClick={() => handleQuantityChange(item.id, item.specialNote, 1)}
                    >
                      +
                    </Button>
                  </div>
                  <Button
                    variant="danger"
                    onClick={() => handleRemove(item.id, item.specialNote)}
                    className="remove-button"
                  >
                    <FaTrashAlt />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>Your cart is empty.</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <div className="cart-footer">
          <h4>Total: R{getTotal()}</h4>
          <p><i>A tip would be appreciated!</i></p>
          <Button variant="success" onClick={onCheckout}>
            Checkout
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default Cart;