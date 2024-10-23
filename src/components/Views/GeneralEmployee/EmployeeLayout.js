import React, {useEffect, useState } from 'react';
import {Outlet, useLocation} from 'react-router-dom';
import EmployeeHeader from './EmployeeHeader'; 
import OrderSummary from './OrderSummary';
import './Employee.css';
import axios from 'axios';
import Employee from "./Employee";
import OrderManagement from "./OrderManagement";
import BookingTest from "../../Common/BookingTest";
import DeliveryForm from "./DeliveryForm";

const EmployeeLayout = ({ isLoggedIn, onLogout, decodedValue }) => {
  const [orderSummary, setOrderSummary] = useState([]);
  const [menus, setMenus] = useState([]);
  const [currentMenuId, setCurrentMenuId] = useState(null); // State for current menu ID
  const [products, setProducts] = useState([]);
  const [activePage, setActivePage] = useState("home");
  const [employee, setEmployee] = useState({});
  const [collectionType, setCollectionType] = useState("DINE_IN");
  const [paymentMethod, setPaymentMethod] = useState("CARD");
  const [showDeliveryForm, setShowDeliveryForm] = useState(false);

  useEffect(() => {
    console.log("decoded value " + decodedValue);
    const fetchMenus = async () => {
      try {
        const response = await axios.get('http://localhost:8080/ClubCurry/menu/getAll'); // Use Axios to fetch menus
        setMenus(response.data); // Access the data directly from response
      } catch (error) {
        console.error('Error fetching menus:', error); // Log any errors
      }
    };
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/ClubCurry/menuItem/getAll'); // Use Axios to fetch menus
        setProducts(response.data); // Access the data directly from response
      } catch (error) {
        console.error('Error fetching menu items:', error); // Log any errors
      }
    };

    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/ClubCurry/generalStaff/readByUsername/${decodedValue.email}`);
        if(employee){
          setEmployee(response.data);
          console.log(employee)
        }
      }
      catch (error){
        console.error('Error fetching employee', error);
      }
    }
    fetchMenus();
    fetchProducts();
    fetchEmployee();
  }, []);

  const navigateTo = (page) => {
    setActivePage(page)
  }
  const onSubmitOrder = () => {
    const submitOrder = async () => {
      const newOrderSummary = [...orderSummary];
      for(let i= 0; i<orderSummary.length; i++){
        newOrderSummary[i].note = "N/A";
        newOrderSummary[i].spiceLevel = "LOW";
      }
      const response = axios.post('http://localhost:8080/ClubCurry/cart/save', {customer: {email: "kay@email.com"}});
      const cart = (await response).data;
      cart.items = newOrderSummary;
      const response2 = axios.put("http://localhost:8080/ClubCurry/cart/updateItems", cart);
      const order = {cart: {id: cart.id}, ordered: new Date().toISOString(), collectionType: collectionType, paymentMethod: paymentMethod, orderStatus: 'PENDING', time: new Date().toLocaleTimeString('it-IT')};
      const response3 = axios.post("http://localhost:8080/ClubCurry/orders/save", order);
      console.log(response3);
      console.log(response);
      console.log(response2);
    }
    submitOrder();
    setOrderSummary([])
  };

  // Helper function to map category names to Font Awesome icons
  const getIconForCategory = (category) => {
    switch (category.toLowerCase()) {
      case 'drinks': return 'glass-cheers';
      case 'starters': return 'utensils';
      case 'mains': return 'drumstick-bite';
      case 'curries': return 'pepper-hot';
      case 'desserts': return 'ice-cream';
      case 'specials': return 'star';
      default: return 'utensils'; // Default icon if no match
    }
  };

  const handleCollectionChange = (collectionType) => {
    setCollectionType(collectionType)
  };

  const handlePaymentChange = (paymentType) => {
    setPaymentMethod(paymentType);
  };

  const handleAddToOrder = (product) => {
    const newOrderSummary = [...orderSummary];
    if(newOrderSummary.find((item) => (item.menuItem.id === product.id))) {
      const index = newOrderSummary.findIndex((item) => (item.menuItem.id === product.id));
      newOrderSummary[index].quantity++;
      setOrderSummary(newOrderSummary);
      return
    }
    const newItem = { menuItem: product, quantity: 1}
    newOrderSummary.push(newItem)
    setOrderSummary(newOrderSummary)
  };

  const handleRemoveFromOrder = (product) => {
    const newOrderSummary = [...orderSummary];
    const index = newOrderSummary.findIndex((item) => (item.menuItem.id===product.menuItem.id), 0);
    if(newOrderSummary[index].quantity>1){
      newOrderSummary[index].quantity--;
      setOrderSummary(newOrderSummary);
      return
    }
    newOrderSummary.splice(index,1);
    setOrderSummary(newOrderSummary);
  }

  // Handle menu selection
  const handleMenuSelect = (menuId) => {
    setCurrentMenuId(menuId); // Set the current menu ID
  };

  return (
      <>
        {activePage === "home" &&
      <div className="employee-container">
        <EmployeeHeader isLoggedIn={isLoggedIn} onLogout={onLogout}/>
        <nav className="side-nav">
          <ul>
            <li>
              <button onClick={() => navigateTo("OrderManagement")}>
                <i className="fas fa-receipt"></i> Order Management
              </button>
            </li>
            <li>
              <button onClick={() => navigateTo("BookingManagement")}>
                <i className="fas fa-th-list"></i> Manage Bookings
              </button>
            </li>
            {menus.map((menu) => (
                <li key={menu.id}>
                  <button
                      className="menu-button-l"
                      onClick={() => handleMenuSelect(menu.id)} // Handle button click
                  >
                    <i className={`fas fa-${getIconForCategory(menu.name)}`}></i> {menu.name}
                  </button>
                </li>
            ))}
          </ul>
        </nav>
        <div className="employee-main-content">
          <Employee handleAddToOrder={handleAddToOrder} products={products} currentMenuId={currentMenuId}/>
          <OrderSummary onSubmitOrder={() => (collectionType === "DELIVERY" ? setShowDeliveryForm(true) : setShowDeliveryForm(false))} orderSummary={orderSummary}
                        handleRemoveFromOrder={handleRemoveFromOrder} handlePaymentChange={handlePaymentChange} handleCollectionChange={handleCollectionChange}/>
          {showDeliveryForm && <DeliveryForm order={orderSummary} onSubmitOrder={onSubmitOrder} setShow={setShowDeliveryForm}/>}
        </div>
      </div>
      }
      {activePage === "OrderManagement" && <OrderManagement/>}
        {activePage === "BookingManagement" && <BookingTest/>}
      </>

  );
};

export default EmployeeLayout;