import React, { useState, useEffect } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import '../Driver/DriverCSS/DriverDashboardContainer.css';
import DriverDashboardHeader from './DriverDashboardHeader';
import DriverNavbar from './DriverNavBar';
import ActiveDeliveries from '../Driver/ActiveDeliveries';
import CompletedDeliveries from '../Driver/CompletedDeliveries';
import Deliveries from '../Driver/Deliveries';
import DriverProfile from '../Driver/DriverProfile';

const DriverDashboardContainer = ({ onLogout, decodedValue }) => {
  console.log(decodedValue);
  // State to manage the list of deliveries
  const [deliveries, setDeliveries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeSection, setActiveSection] = useState('active-deliveries'); // Track the active section
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // console.log(decodedValue.sub)
        const userResponse = await fetch(`http://localhost:8080/ClubCurry/driver/readByUsername/${decodedValue.sub}`);
        // console.log(userResponse.data)
        const userData = await userResponse.json();
        setUser(userData);
        
        // Assuming userData contains an id property for the user
        const userId = userData.id;
        
        const deliveriesResponse = await fetch(`http://localhost:8080/ClubCurry/delivery/getByDriverId/${userId}`);
        const deliveriesData = await deliveriesResponse.json();
        console.log(deliveriesData)
        setDeliveries(deliveriesData);
      } catch (error) {
        console.error('Error fetching user data or deliveries:', error);
      }
    };

    fetchUserData();
  }, [decodedValue]);

  // Function to update the status of a delivery
  const handleUpdateStatus = (deliveryId, newStatus) => {
    const currentTime = newStatus === 'delivered' ? new Date().toLocaleString() : null;
    setDeliveries((prevDeliveries) =>
      prevDeliveries.map((delivery) =>
        delivery.id === deliveryId
          ? { ...delivery, status: newStatus, deliveryTime: currentTime }
          : delivery
      )
    );
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter deliveries to get outstanding (not delivered) deliveries
  // const outstandingDeliveries = deliveries.filter(
  //   (delivery) => delivery.delivered === false
  // );

  // // Filter deliveries to get completed (delivered) deliveries
  // const deliveredDeliveries = deliveries.filter(
  //   (delivery) => delivery.delivered === true
  // );

  // const filteredDeliveredDeliveries = deliveredDeliveries.filter(delivery =>
  //   delivery.order.id.toString().includes(searchTerm)
  // );

  return (
    <div className="driver-dashboard-container">
      <DriverDashboardHeader isLoggedIn={true} onLogout={onLogout} />
      <Row>
        <Col md={2}>
          <DriverNavbar 
            activeSection={activeSection} 
            setActiveSection={setActiveSection} // Pass down the state and setter
          />
        </Col>
        <Col md={10}>
          {/* Conditionally render the active section's component */}
          <div className="tabs-container">
            {activeSection === 'active-deliveries' && (
              <ActiveDeliveries
                deliveries={deliveries}
                handleUpdateStatus={handleUpdateStatus}
              />
            )}
            {activeSection === 'completed-deliveries' && (
              <CompletedDeliveries
                deliveries={deliveries}
                handleSearchChange={handleSearchChange}
                searchTerm={searchTerm}
              />
            )}
            {activeSection === 'deliveries' && <Deliveries deliveries={deliveries} />}
            {activeSection === 'profile' && <DriverProfile decodedValue={decodedValue} user={user}/>}
            {activeSection === 'performance-overview' && (
              <div className="performance-overview">
                <h2 className="overview-title">Performance Overview</h2>
                <Row>
                  <Col md={6}>
                    <Card className="overview-card">
                      <Card.Body>
                        <div className="delivery-metrics">
                          <div>
                            <h3 className="metric-title">Active Deliveries</h3>
                            <h1 className="metric-value">{deliveries.length}</h1>
                          </div>
                          {/* Metric graph implementation can go here */}
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col md={6}>
                    <Card className="overview-card">
                      <Card.Body>
                        <div className="delivery-metrics">
                          {/* <div>
                            <h3 className="metric-title">Average Deliveries</h3>
                            <h1 className="metric-value">{averageDeliveries}</h1>
                          </div> */}
                          {/* Metric graph implementation can go here */}
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </div>
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default DriverDashboardContainer;