import React from 'react';
import TimePicker from 'rc-time-picker';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'rc-time-picker/assets/index.css';
import moment from 'moment';

export default ({ name, checked, setChecked }) => {
  const format = 'h:mm a';
  const now = moment().hour(0).minute(0);

  return (
    <Row>
      <Col xs={4} md={2}>
        <Form.Group controlId={name}>
          <Form.Check
            type="checkbox"
            name={name}
            label={name}
          />
        </Form.Group>
      </Col>
      <Col md={4} lg={3} xs={3}>
        <label>Open:</label>
        <TimePicker
          showSecond={false}
          defaultValue={now}
          format={format}
          use12Hours
          name={`${name}-openhours`}
          id={`${name}-openhours`}
          inputReadOnly
        />
      </Col>
      <Col md={4} lg={3} xs={3}>
        <label>Closed:</label>
        <TimePicker
          showSecond={false}
          defaultValue={now}
          format={format}
          name={`${name}-closedhours`}
          id={`${name}-closedhours`}
          use12Hours
          inputReadOnly
        />
      </Col>
    </Row>
  );
};
