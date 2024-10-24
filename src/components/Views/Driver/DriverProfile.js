import React, {useEffect, useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserTag, faUser, faIdCard, faCar, faGasPump } from '@fortawesome/free-solid-svg-icons';
import '../Driver/DriverCSS/DriverProfile.css'; // Make sure your CSS matches the new design
import driverImage from '../../../images/driver.png'
import axios from "axios";

const DriverProfile = (props) => {
  const [driver, setDriver] = useState({
    name: props.user?.name || '',
    surname: props.user?.surname || '' ,
    registration: props.user?.registration|| {},
    petrolAllowance: props.user?.petrolAllowance || '',
    username: props.user?.username || '',
    profilePhoto: driverImage // Placeholder image URL
  });




  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(driver.name);
  const [surname, setSurname] = useState(driver.surname);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = () => {
    setDriver((prevDriver) => ({
      ...prevDriver,
      name,
      surname,
    }));
    const saveDriver = async () =>{
      try{
        await axios.put("http://localhost:8080/ClubCurry/driver/update", driver)
      }
      catch (error){
        console.log('error ovvured while editing driver profile' + error);

      }
    }
    saveDriver();
    setEditing(false);
  };

  return (
    <div className="driver-profile-container">
      <h2>Driver Profile</h2>
      <div className="profile-content">
        <img src={driver.profilePhoto} alt="Profile" className="profile-photo" />
        <div className="profile-details">
          <div className="input-field">
            <label htmlFor="username">
              <FontAwesomeIcon icon={faUserTag} className="icon-spacing" /> Username
            </label>
            <input type="text" id="username" value={driver.username} readOnly />
          </div>
          <div className="input-field">
            <label htmlFor="name">
              <FontAwesomeIcon icon={faUser} className="icon-spacing" /> Name
            </label>
            {editing ? (
              <input value={name} onChange={(e) => setName(e.target.value)} />
            ) : (
              <input type="text" value={name} readOnly />
            )}
          </div>
          <div className="input-field">
            <label htmlFor="surname">
              <FontAwesomeIcon icon={faIdCard} className="icon-spacing"/> Surname
            </label>
            {editing ? (
              <input value={surname} onChange={(e) => setSurname(e.target.value)} />
            ) : (
              <input type="text" value={surname} readOnly />
            )}
          </div>
          <div className="input-field">
            <label htmlFor="vehicleRegistrationNumber">
              <FontAwesomeIcon icon={faCar} className="icon-spacing" /> Registration
            </label>
            <input
              type="text"
              id="vehicleRegistrationNumber"
              value={driver.registration.id}
              readOnly
            />
          </div>
          <div className="input-field">
            <label htmlFor="petrolAllowance">
              <FontAwesomeIcon icon={faGasPump}className="icon-spacing"/> Petrol Allowance
            </label>
            <input type="number" id="petrolAllowance" value={driver.petrolAllowance} readOnly />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverProfile;
