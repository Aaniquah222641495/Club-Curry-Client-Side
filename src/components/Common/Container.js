import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const CustomContainer = ({ children }) => {
  return (
    <Container bsPrefix='app-container' fluid= {true}>
      <Row>
        <Col>
          {children}
        </Col>
      </Row>
    </Container>
  );
};

export default CustomContainer;
