import React, { useState } from 'react';
import classnames from 'classnames';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationArrow } from '@fortawesome/free-solid-svg-icons';

export default ({ setLocation, setLocationError }) => {
  const [loading, setLoading] = useState(false);
  const [hasLocation, setHasLocation] = useState(false);
  const success = (position) => {
    setLoading(false);
    setHasLocation(true);
    setLocation({ latitude: position.coords.latitude, longitude: position.coords.longitude });
  };

  const error = () => {
    setLocationError(true);
    setLoading(false);
  };

  const addLocation = () => {
    if (typeof window !== 'undefined' && navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(success, error, { timeout: 5000 });
    }
  };

  return (
    <div>
      <Button size="sm" disabled={loading || hasLocation} variant="outline-primary" onClick={addLocation}>
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
    </div>
  );
};
