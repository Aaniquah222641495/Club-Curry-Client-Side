import React, { useState } from "react";
import ManageBooking from "./ManageComponents/BookingMangement/ManageBooking";
import ManageDriver from "./ManageComponents/DriverManagement/ManageDriver";
import './AdminDashboard.css';
import MenuAdmin from "./MenuAdmin";
import ManageCustomers from "./ManageComponents/CustomerManagement/ManageCustomers";
import ManageAdmin from "./ManageComponents/AdminManagement/ManageAdmin";
import ManageEmployees from "./ManageComponents/EmployeeManagement/ManageEmployee";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpen, faUtensils, faTruck, faUserTie, faUserShield, faUsers } from '@fortawesome/free-solid-svg-icons';

const AdminDashboard = ({ decodedValue }) => {
    console.log(decodedValue);
    const [activeTab, setActiveTab] = useState('bookings');

    const renderActiveTab = () => {
        switch (activeTab) {
            case 'bookings':
                return <ManageBooking />;
            case 'drivers':
                return <ManageDriver />;
            case 'menu':
                return <MenuAdmin />;
            case 'customers':
                return <ManageCustomers />;
            case 'employees':
                return <ManageEmployees />;
            case 'admins':
                return <ManageAdmin />;
            default:
                return <ManageBooking />;
        }
    };

    return (
        <div className="admin-dashboard-container">
            <div className="admin-dashboard-tabs">
                <button onClick={() => setActiveTab('bookings')}>
                    <FontAwesomeIcon icon={faBookOpen} /> Manage Bookings
                </button>
                <button onClick={() => setActiveTab('menu')}>
                    <FontAwesomeIcon icon={faUtensils} /> Manage Menu
                </button>
                <button onClick={() => setActiveTab('drivers')}>
                    <FontAwesomeIcon icon={faTruck} /> Manage Drivers
                </button>
                <button onClick={() => setActiveTab('employees')}>
                    <FontAwesomeIcon icon={faUserTie} /> Manage Employees
                </button>
                <button onClick={() => setActiveTab('admins')}>
                    <FontAwesomeIcon icon={faUserShield} /> Manage Admins
                </button>
                <button onClick={() => setActiveTab('customers')}>
                    <FontAwesomeIcon icon={faUsers} /> Manage Customers
                </button>
            </div>
            <div className="admin-dashboard-content">
                {renderActiveTab()}
            </div>
        </div>
    );
};

export default AdminDashboard;
