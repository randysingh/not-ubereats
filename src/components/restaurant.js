import React, { useState, useEffect } from 'react';
import Img from 'gatsby-image';
import classnames from 'classnames';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import haversine from 'haversine-distance';

import styles from './restaurant.module.css';

export default ({ restaurants, location, searchTerm }) => {
  let filteredRestaurants = restaurants;
  const restaurantsPerPage = 9;
  const [restaurantsToShow, setRestaurantsToShow] = useState([]);
  const [count, setCount] = useState(1);

  const loopThroughPosts = count => {
    const tempArray = [];
    for (let i = 0; i < restaurantsPerPage * count; i++) {
      if (filteredRestaurants[i] !== undefined) {
        tempArray.push(filteredRestaurants[i]);
      }
    }
    setRestaurantsToShow(tempArray);
  };

  const handleShowMore = () => {
    loopThroughPosts(count + 1)
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
    if (!location && !searchTerm) {
      return;
    }
    if (searchTerm) {
      filteredRestaurants = filteredRestaurants.filter(
        (restaurant) =>
          restaurant.node.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          restaurant.node.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    if (!location) {
      return;
    }
    filteredRestaurants.forEach((restaurant) => (restaurant.node.distance = distance(restaurant.node.location)));
    filteredRestaurants = filteredRestaurants.sort((a, b) => a.node.distance - b.node.distance);
  };

  useEffect(() => {
    sortRestaurants();
    setCount(1);
    loopThroughPosts(1);
  }, [searchTerm, location]);

  return (
    <React.Fragment>
      <div
        className="sr-only"
        aria-live="polite"
        role="status"
      >{`${filteredRestaurants.length} results returned.`}</div>
      <Row as="ul" className="pl-0" role="region" aria-live="polite" aria-relevant="additions removals">
        {restaurantsToShow.map(({ node }) => {
          const restaurant = node;
          return (
            <Col as="li" className="mb-4 d-flex align-items-stretch" lg={4} key={restaurant.name}>
              <Card className="shadow-sm">
                <Img
                  className={classnames('card-img-top', styles.restaurantImage)}
                  alt=""
                  fluid={restaurant.image.fluid}
                />
                <Card.Body>
                  <div className="d-flex justify-content-between">
                    <a target="_blank" rel="noreferrer" className="h5 card-title btn-link" href={restaurant.link}>
                      {restaurant.name}
                    </a>
                    {location && <p className={styles.distance}>{distance(restaurant.location)} km</p>}
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
            <Button variant="secondary" onClick={handleShowMore}>
              View More
            </Button>
          </Col>
        </Row>
      )}
    </React.Fragment>
  );
};
