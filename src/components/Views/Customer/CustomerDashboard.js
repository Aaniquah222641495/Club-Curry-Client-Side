import React, { useState } from "react";
//import { useNavigate } from 'react-router-dom';
//import CustomerDashboardHeader from './CustomerDashboardHeader';
import "./CustomerCss/CustomerDashboard.css";
import Cart from "./Cart";
import Menu from "./Menu";
import FAQ from "./FAQ";
import RestaurantDetails from "./RestaurantDetails";

const CustomerDashboard = ({
  customer,
  onRemoveItem,
  onUpdateQuantity,
  onCheckout,
  isLoggedIn,
  onShowLogin,
  onShowSignup,
  onLogout,
  addToCart,
}) => {
  const [cartItems] = useState([]);
  const [showMenu, setShowMenu] = useState(false); // State to control Menu visibility
  const [showCart, setShowCart] = useState(false);
  //const navigate = useNavigate();

  const handleCloseCart = () => {
    setShowCart(false);
  };
  const handleViewMenu = () => {
    setShowMenu(true); // Show the menu when the button is clicked
  };

  return (
    <div className="customer-dashboard">
      <div className="welcome-section">
        <h2>Welcome Back, {customer ? customer.name : "Guest"}!</h2>
        <p>Discover our delicious menu and manage your orders with ease.</p>
        <button onClick={handleViewMenu} className="view-menu-btn">
          View Menu
        </button>
        {/* Conditionally render the Menu component */}
        {showMenu && <Menu addToCart={addToCart} />}
      </div>

      <Cart
        cartItems={cartItems}
        onRemoveItem={onRemoveItem}
        onUpdateQuantity={onUpdateQuantity}
        onCheckout={onCheckout}
        showCart={showCart}
        onCloseCart={handleCloseCart}
        isLoggedIn={isLoggedIn}
        onShowLogin={onShowLogin}
        onShowSignup={onShowSignup}
      />

      {/* Add the FAQ and RestaurantDetails sections back in */}
      <FAQ />
      <RestaurantDetails />
    </div>
  );
};

export default CustomerDashboard;
