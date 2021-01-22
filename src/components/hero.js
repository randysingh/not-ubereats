import React from 'react';
import { Link } from 'gatsby';
import classnames from 'classnames';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import TakeoutIcon from "../images/takeout.svg";
import styles from './hero.module.css';

export default ({ src }) => (
  <Container as="section" className={classnames("text-left py-5", styles.container)}>
    <Row className="py-lg-5">
      <Col lg={7} md={6}>
        <h1 className="font-weight-light">Not UberEats</h1>
        <p className={classnames("pt-lg-3 lead text-dark", styles.subtitle)}>
          A list of local restaurants in Toronto that offer their own delivery service. Support local instead of letting
          delivery apps take 30% of every order!
        </p>
        <Link className={classnames("btn btn-primary", styles.button)} to="/submit-business/">
          Submit a restaurant
        </Link>
      </Col>
      <Col lg={5} md={6}>
        <img alt="" className={styles.icon} src={TakeoutIcon}></img>
      </Col>
    </Row>
  </Container>
);
