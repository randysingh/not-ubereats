import React from 'react';
import TimePicker from 'rc-time-picker';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'rc-time-picker/assets/index.css';

export default ({ name, checked, setChecked }) => {
  const format = 'h:mm a';

  return (
    <Row>
      <Col xs={4} md={2}>
        <Form.Group controlId={name}>
          <Form.Check
            type="checkbox"
            name={name}
            label={name}
            onChange={(event) => {
              checked[name] = event.target.checked;
              setChecked({ ...checked });
            }}
          />
        </Form.Group>
      </Col>
      <React.Fragment>
        <Col md={4} lg={3} xs={3}>
          <label>Open:</label>
          <TimePicker
            showSecond={false}
            format={format}
            placeholder="12:00am"
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
            format={format}
            placeholder="12:00am"
            name={`${name}-closedhours`}
            id={`${name}-closedhours`}
            use12Hours
            inputReadOnly
          />
        </Col>
      </React.Fragment>
    </Row>
  );
};
