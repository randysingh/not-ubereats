import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';

const DeliveryToggle = ({showDelivery, setShowDelivery}) => (
  <Row>
    <Col className="d-flex justify-content-center mb-2">
      <ToggleButtonGroup className="ml-1" type="radio" value={showDelivery} name="options">
        <ToggleButton
          type="radio"
          variant="outline-secondary"
          value={true}
          size="sm"
          onChange={(e) => setShowDelivery(true)}
        >
          Delivery
        </ToggleButton>
        <ToggleButton
          type="radio"
          variant="outline-secondary"
          value={false}
          size="sm"
          onChange={(e) => setShowDelivery(false)}
        >
          Pickup
        </ToggleButton>
      </ToggleButtonGroup>
    </Col>
  </Row>
);

export default DeliveryToggle;
