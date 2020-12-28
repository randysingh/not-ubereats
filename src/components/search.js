import React, { useState } from 'react';
import classnames from 'classnames';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faLocationArrow } from '@fortawesome/free-solid-svg-icons';

import styles from './search.module.css';

export default ({ data, setSearchTerm, setLocation }) => {
  const [loading, setLoading] = useState(false);
  const [hasError, setError] = useState(false);
  const [hasLocation, setHasLocation] = useState(false);
  const success = (position) => {
    setLoading(false);
    setHasLocation(true);
    setLocation({ latitude: position.coords.latitude, longitude: position.coords.longitude });
  };

  const error = () => {
    setError(true);
    setLoading(false);
  };

  const addLocation = () => {
    if (typeof window !== 'undefined' && navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(success, error, { timeout: 5000 });
    }
  };

  return (
    <Row>
      <Col xs={12} sm={7} md={8} lg={8}>
        <InputGroup className="mb-4">
          <InputGroup.Prepend>
            <div className="input-group-text bg-white border-right-0">
              <FontAwesomeIcon icon={faSearch} />
            </div>
          </InputGroup.Prepend>
          <FormControl
            className="border-left-0 pl-0"
            placeholder="Search for restaurant or cuisine"
            aria-label="Search for restaurant or cuisine"
            role="search"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </InputGroup>
      </Col>
      <Col className={styles.location}>
        <Button disabled={loading || hasLocation} variant="outline-primary" onClick={addLocation}>
          {loading ? (
            <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true">
              <span className="sr-only">Loading...</span>
            </Spinner>
          ) : (
            <React.Fragment>
              <FontAwesomeIcon className={'mr-2'} icon={faLocationArrow} />
              <span>Sort by distance</span>
            </React.Fragment>
          )}
        </Button>
        {hasError && (
          <span className={classnames('invalid-feedback', styles.warning)}>
            Please enable location on your device.
          </span>
        )}
      </Col>
    </Row>
  );
};
