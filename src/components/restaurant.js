import React, { useState, useEffect } from 'react';
import Img from 'gatsby-image';
import classnames from 'classnames';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import haversine from 'haversine-distance';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkedAlt } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'gatsby';
import Autocomplete from 'react-google-autocomplete';
import Location from './location';

import styles from './restaurant.module.css';

export default ({ restaurants, searchTerm }) => {
  const [filteredRestaurants, setFilteredRestaurants] = useState(restaurants);
  const currentDayofWeek = new Date().toLocaleString('en-us', { weekday: 'long' });
  const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
  const restaurantsPerPage = 9;
  const [restaurantsToShow, setRestaurantsToShow] = useState([]);
  const [count, setCount] = useState(1);
  const [showOpenOnly, setShowOpenOnly] = useState(false);
  const [location, setLocation] = useState(undefined);
  const [hasLocationError, setLocationError] = useState(false);
  const [showAddressBar, setShowAddressBar] = useState(false);

  const isOpen = (deliveryHours) => {
    if (!deliveryHours) {
      return false;
    }
    if (deliveryHours.length > 0) {
      const hours = deliveryHours[0].Everyday || deliveryHours[0][currentDayofWeek];
      if (hours) {
        if (hours.open <= currentTime && hours.closed > currentTime) {
          return true;
        }
        // If restaurant closes past midnight
        else if (parseInt(currentTime.charAt(0)) > 0 && parseInt(hours.closed.charAt(0)) === 0) {
          return true;
        }
        // If currently past midnight and the restaurant is still open
        else if (parseInt(currentTime.charAt(0)) === 0 && hours.closed > currentTime && hours.closed < hours.open) {
          return true;
        }
        return false;
      }
    }
  };

  const loopThroughPosts = (count) => {
    const tempArray = [];
    for (let i = 0; i < restaurantsPerPage * count; i++) {
      if (filteredRestaurants[i] !== undefined) {
        tempArray.push(filteredRestaurants[i]);
      }
    }
    setRestaurantsToShow(tempArray);
  };

  const handleShowMore = () => {
    setCount(count + 1);
  };

  const hasMore = () => count * restaurantsPerPage <= restaurantsToShow.length;

  const distance = ({ lat, lon }) => {
    const distance =
      haversine({ latitude: location.latitude, longitude: location.longitude }, { latitude: lat, longitude: lon }) /
      1000;
    return Math.round((distance + Number.EPSILON) * 10) / 10;
  };

  const sortRestaurants = () => {
    let currentRestaurants = restaurants;
    currentRestaurants.forEach(
      (restaurant) =>
        (restaurant.node.isOpen =
          restaurant.node.isOpen === undefined && restaurant.node.deliveryHours
            ? isOpen(restaurant.node.deliveryHours)
            : restaurant.node.isOpen)
    );

    currentRestaurants.sort((a, b) => {
      return a.node.isOpen === b.node.isOpen ? 0 : a.node.isOpen ? -1 : 1;
    });

    if (showOpenOnly) {
      currentRestaurants = currentRestaurants.filter((restaurant) => restaurant.node.isOpen);
    }

    if (!location && !searchTerm) {
      setFilteredRestaurants(currentRestaurants);
      return;
    }
    if (searchTerm) {
      currentRestaurants = currentRestaurants.filter(
        (restaurant) =>
          restaurant.node.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          restaurant.node.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    if (!location) {
      setFilteredRestaurants(currentRestaurants);
      return;
    }
    currentRestaurants.forEach((restaurant) => (restaurant.node.distance = distance(restaurant.node.location)));
    currentRestaurants = currentRestaurants.sort((a, b) => a.node.distance - b.node.distance);
    setFilteredRestaurants(currentRestaurants);
  };

  useEffect(() => {
    sortRestaurants();
    setCount(1);
  }, [searchTerm, location, showOpenOnly]);

  useEffect(() => {
    loopThroughPosts(count);
  }, [location, count, filteredRestaurants]);

  const createMapUrl = (restaurant) => {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(restaurant.name)}+toronto`;
  };

  return (
    <React.Fragment>
      <div
        className="sr-only"
        aria-live="polite"
        role="status"
      >{`${filteredRestaurants.length} results returned.`}</div>
      <Row className="mb-4">
        <Col>
          <div className="d-flex">
            <Location setLocation={setLocation} setLocationError={setLocationError}></Location>
            <ToggleButtonGroup className="ml-1" type="checkbox">
              <ToggleButton
                type="checkbox"
                variant="outline-success"
                checked={showOpenOnly}
                size="sm"
                onChange={(e) => setShowOpenOnly(e.currentTarget.checked)}
              >
                Open now
              </ToggleButton>
            </ToggleButtonGroup>
            <Link to="/map" className="ml-1 btn btn-sm btn-outline-primary">View map</Link>
          </div>
          <div>
            <Button className="pl-0" onClick={() => setShowAddressBar(true)} variant="link" type="submit" size="sm">
              Not home? Enter address
            </Button>
            {hasLocationError && (
              <span className={classnames('invalid-feedback', styles.warning)}>
                Please enable location services on your device or try entering your address below:
              </span>
            )}
            {(showAddressBar || hasLocationError) && (
              <Autocomplete
                apiKey={process.env.GATSBY_GOOGLE_PLACES_KEY}
                className="form-control mt-2"
                aria-label="Enter a location"
                onPlaceSelected={(place) => {
                  setLocation({ latitude: place.geometry.location.lat(), longitude: place.geometry.location.lng() });
                }}
                types={['address']}
                componentRestrictions={{ country: 'ca' }}
              />
            )}
          </div>
        </Col>
      </Row>
      <Row as="ul" className="pl-0" role="region" aria-live="polite" aria-relevant="additions removals">
        {restaurantsToShow.map(({ node }) => {
          const restaurant = node;
          return (
            <Col as="li" className="mb-4 d-flex align-items-stretch" lg={4} key={restaurant.name}>
              <Card className="shadow-sm">
                <a aria-hidden="true" target="_blank" rel="noreferrer" href={restaurant.link}>
                  <Img
                    className={classnames('card-img-top', styles.restaurantImage)}
                    alt=""
                    fluid={restaurant.image.fluid}
                  />
                </a>
                <Card.Body>
                  <div className="d-flex justify-content-between">
                    <div className="d-flex flex-column align-items-start">
                      <a target="_blank" rel="noreferrer" className="h5 card-title btn-link" href={restaurant.link}>
                        {restaurant.name}
                      </a>
                      {restaurant.isOpen && (
                        <Badge className="mb-0" as="p" variant="success">
                          OPEN
                        </Badge>
                      )}
                    </div>
                    <div className="d-flex align-items-start">
                      {location && <p className={styles.distance}>{distance(restaurant.location)} km</p>}
                      <a
                        className="h5 card-title btn-link"
                        title="View on map"
                        target="_blank"
                        rel="noreferrer"
                        href={createMapUrl(restaurant)}
                      >
                        <FontAwesomeIcon icon={faMapMarkedAlt} />
                      </a>
                    </div>
                  </div>
                  <div
                    className="card-text mt-4"
                    dangerouslySetInnerHTML={{
                      __html: restaurant.description.childMarkdownRemark.html,
                    }}
                  ></div>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
        {restaurantsToShow.length === 0 && (
          <Col className="mb-4">
            <p>Sorry no results! Please clear your search and try again.</p>
          </Col>
        )}
      </Row>
      {hasMore() && (
        <Row>
          <Col className="text-center">
            <Button variant="dark" onClick={handleShowMore}>
              Show more
            </Button>
          </Col>
        </Row>
      )}
    </React.Fragment>
  );
};
