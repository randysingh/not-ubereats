import React from 'react';
import { Link } from 'gatsby';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import styles from './hero.module.css';

export default ({ src }) => (
  <div className={styles.background} style={{'backgroundImage': `url(${src})`}}>
    <Container as="section" className="text-center py-5">
      <Row className="py-lg-5">
        <Col lg={6} md={8} className="mx-auto">
          <h1 className="font-weight-light">Not UberEats</h1>
          <p className="pt-lg-4 lead text-dark">
            A list of local restaurants in Toronto that offer their own delivery service. Support local instead of
            letting delivery apps take 30% of every order!
          </p>
          <Link className="btn btn-primary" to="/submit-business/">Submit a Business</Link>
        </Col>
      </Row>
    </Container>
  </div>
);
