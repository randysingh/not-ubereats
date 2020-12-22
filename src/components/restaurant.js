import React from 'react';
import Img from 'gatsby-image';
import classnames from 'classnames';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import haversine from 'haversine-distance';

import styles from './restaurant.module.css';

export default ({ restaurants, location, searchTerm }) => {
  let filteredRestaurants = restaurants;
  const distance = ({ lat, lon }) => {
    const distance =
      haversine({ latitude: location.latitude, longitude: location.longitude }, { latitude: lat, longitude: lon }) /
      1000;
    return Math.round((distance + Number.EPSILON) * 10) / 10;
  };
  const sortedRestaurants = () => {
    if (!location && !searchTerm) {
      return;
    }
    if (searchTerm) {
      filteredRestaurants = restaurants.filter(
        (restaurant) =>
          restaurant.node.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          restaurant.node.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    if (!location) {
      return;
    }
    restaurants.forEach((restaurant) => (restaurant.node.distance = distance(restaurant.node.location)));
    return restaurants.sort((a, b) => a.node.distance - b.node.distance);
  };
  sortedRestaurants();
  return (
    <React.Fragment>
      <div
        className="sr-only"
        aria-live="polite"
        role="status"
      >{`${filteredRestaurants.length} results returned.`}</div>
      <Row as="ul" className="pl-0">
        {filteredRestaurants.map(({ node }) => {
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
                    {location && <p>{distance(restaurant.location)} km</p>}
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
        {filteredRestaurants.length === 0 && (
          <Col className="mb-4">
            <p>Sorry no results! Please clear your search and try again.</p>
          </Col>
        )}
      </Row>
    </React.Fragment>
  );
};
