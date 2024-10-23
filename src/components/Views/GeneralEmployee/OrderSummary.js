import React, { useState } from 'react';
import './OrderSummary.css';
import DeliveryForm from "./DeliveryForm"; // Import the DeliveryForm component

const OrderSummary = (props) => {//Use context to get addToOrder
    const [confirmationMessage, setConfirmationMessage] = useState('');
    const [collectionType, setCollectionType] = useState('DINE_IN'); // Track the collection type
    const [showDeliveryForm, setShowDeliveryForm] = useState(false); // Control delivery form modal visibility

    // Calculate the total price of the order
    const totalPrice = props.orderSummary.reduce((total, current) => (total + current.menuItem.price * current.quantity), 0);

    const handleSubmit = () => {
        if (props.orderSummary.length === 0) {
            return; // No items to submit
        }

        // If Delivery is selected, show the DeliveryForm
        if (collectionType === 'DELIVERY') {
            setShowDeliveryForm(true); // Open the delivery form modal
        } else {
            // Handle order submission for other collection types
            props.onSubmitOrder();
            setConfirmationMessage(`Order #Insert order Number has been created.`);
            
            // Automatically hide the confirmation message after 3 seconds
            setTimeout(() => {
                setConfirmationMessage(''); // Clear the message
            }, 3000);
        }
    };

    const handleDeliveryFormSubmit = () => {
        // Logic to handle delivery form submission
        props.onSubmitOrder(); // Call the order submission from parent
        setShowDeliveryForm(false); // Close the modal after submission
    };

    return (
        <div className="order-summary-container">
            <h2>Order Summary</h2>
            <table>
                <thead>
                <tr>
                    <th>Product Image</th>
                    <th>Product Name</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Total</th>
                </tr>
                </thead>
                <tbody>
                {props.orderSummary.map((item) => (
                    <tr key={item.id}>
                        <td>
                            <img src={item.image} alt={item.name} className="order-item-image"/>
                        </td>
                        <td>{item.menuItem.name}</td>
                        <td>{item.quantity}</td>
                        <td>{item.menuItem.price}</td>
                        <td>{item.menuItem.price * item.quantity}</td>
                        <button className="submit-order-button"
                                onClick={() => props.handleRemoveFromOrder(item)}>
                            Delete
                        </button>
                    </tr>
                ))}
                </tbody>
            </table>
            <div className="order-total">
                <h3>Total Price: {totalPrice}</h3>
            </div>

            <select onChange={(e) => setCollectionType(e.target.value)}> {/* Handle collection type change */}
                <option value="DINE_IN">Dine-In</option>
                <option value="PICKUP">Pickup</option>
                <option value="DELIVERY">Delivery</option>
            </select>

            <select onChange={(e) => props.handlePaymentChange(e.target.value)}>
                <option value="CARD">Card</option>
                <option value="CASH">Cash</option>
            </select>

            <button className="submit-order-button" onClick={handleSubmit}>
                Submit Order
            </button>

            {showDeliveryForm && (
                <DeliveryForm
                    order={props.orderSummary[0]} // Assuming the first order item represents the current order
                    setShow={setShowDeliveryForm}
                    show={showDeliveryForm}
                    onSubmitOrder={handleDeliveryFormSubmit}
                />
            )}
        </div>
    );
};

export default OrderSummary;
