import React from 'react';
import { Helmet } from 'react-helmet';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ResponsiveEmbed from 'react-bootstrap/ResponsiveEmbed';
import Nav from '../components/nav';

import styles from './map.module.css';

export default () => (
  <main>
    <Helmet>
      <html lang="en" />
      <title>Map</title>
      <description>View all restaurants on a map</description>
    </Helmet>
    <Nav />
    <Container as="section" className="text-center">
      <Row>
        <Col className={styles.map}>
          <h1 className="font-weight-light">Map</h1>
          <ResponsiveEmbed aspectRatio="16by9" className="h-100">
            <iframe
              title="Map"
              className="embed-responsive-item"
              src="https://web.mapstr.com/?user=S3erNwbzxW&theme.foreground=%23343a40"
            ></iframe>
          </ResponsiveEmbed>
          <p className="mt-4">
            Note for a better experience check out the{' '}
            <a target="_blank" rel="noopener noreferrer" href="https://go.mapstr.com/notUberEats">
              full version here
            </a>
          </p>
        </Col>
      </Row>
    </Container>
  </main>
);
