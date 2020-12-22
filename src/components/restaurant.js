import React from 'react';
import Img from 'gatsby-image';
import classnames from 'classnames';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

import styles from './restaurant.module.css';

export default ({ restaurants }) => (
  <div className="bg-light py-5">
    <Container>
      <Row>
        {restaurants.map(({ node }) => {
          const restaurant = node;
          return (
            <Col className="mb-4 d-flex align-items-stretch" lg={4} key={restaurant.name}>
              <Card className="shadow-sm">
                <Img
                  className={classnames('card-img-top', styles.restaurantImage)}
                  alt=""
                  fluid={restaurant.image.fluid}
                />
                <Card.Body>
                  <a target="_blank" rel="noreferrer" className="h5 card-title btn-link" href={restaurant.link}>
                    {restaurant.name}
                  </a>
                  <div className="card-text mt-4"
                    dangerouslySetInnerHTML={{
                      __html: restaurant.description.childMarkdownRemark.html,
                    }}
                  ></div>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  </div>
);
