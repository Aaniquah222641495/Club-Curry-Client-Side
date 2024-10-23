import React, { useState } from 'react';
import { Form, Button, Row, Col, Modal } from 'react-bootstrap';

const DeliveryForm = ({ order, onSubmitOrder, setShow, show }) => {
    const [deliveryData, setDeliveryData] = useState({
        delivered: false,
        completed: '',
        timeOfDelivery: '',
        status: 'PENDING',
        order: {
            id: order.id // Prefill the order ID from the order object
        },
        address: {
            streetName: '',
            streetNo: '',
            suburb: {
                suburbName: '',
                postalCode: ''
            }
        },
        customerId:{
            email: 'kay@email.com' //fake customer
        }
    });

    const handleClose = () => setShow(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDeliveryData({
            ...deliveryData,
            [name]: value
        });
    };

    const handleNestedChange = (e, parentKey, nestedKey) => {
        const { name, value } = e.target;
        setDeliveryData({
            ...deliveryData,
            [parentKey]: {
                ...deliveryData[parentKey],
                [nestedKey]: {
                    ...deliveryData[parentKey][nestedKey],
                    [name]: value
                }
            }
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(deliveryData);
        onSubmitOrder(); // Call the parent submit handler
        handleClose(); // Close the modal after submitting
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Delivery Form</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col md={6}>
                            <Form.Group controlId="formOrderId">
                                <Form.Label>Order ID</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="orderId"
                                    value={deliveryData.order.id} // Prefilled order ID
                                    readOnly={true} // Order ID is read-only
                                />
                            </Form.Group>

                            <Form.Group controlId="formStreetName">
                                <Form.Label>Street Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="streetName"
                                    value={deliveryData.address.streetName}
                                    onChange={(e) => setDeliveryData({
                                        ...deliveryData,
                                        address: {
                                            ...deliveryData.address,
                                            streetName: e.target.value
                                        }
                                    })}
                                />
                            </Form.Group>

                            <Form.Group controlId="formStreetNo">
                                <Form.Label>Street No</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="streetNo"
                                    value={deliveryData.address.streetNo}
                                    onChange={(e) => setDeliveryData({
                                        ...deliveryData,
                                        address: {
                                            ...deliveryData.address,
                                            streetNo: e.target.value
                                        }
                                    })}
                                />
                            </Form.Group>
                        </Col>

                        <Col md={6}>
                            <Form.Group controlId="formSuburbName">
                                <Form.Label>Suburb Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="suburbName"
                                    value={deliveryData.address.suburb.suburbName}
                                    onChange={(e) => handleNestedChange(e, 'address', 'suburb')}
                                />
                            </Form.Group>

                            <Form.Group controlId="formPostalCode">
                                <Form.Label>Postal Code</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="postalCode"
                                    value={deliveryData.address.suburb.postalCode}
                                    onChange={(e) => handleNestedChange(e, 'address', 'suburb')}
                                />
                            </Form.Group>

                            <Form.Group controlId="formCustomerEmail">
                                <Form.Label>Customer Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    value={deliveryData.customerId.email}
                                    onChange={(e) => setDeliveryData({
                                        ...deliveryData,
                                        customerId: {
                                            ...deliveryData.customerId,
                                            email: e.target.value
                                        }
                                    })}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Button variant="primary" type="submit">
                        Submit Delivery
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default DeliveryForm;
