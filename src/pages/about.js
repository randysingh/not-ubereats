import React from 'react';
import { graphql, Link } from 'gatsby';
import { Helmet } from 'react-helmet';
import classnames from 'classnames';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import styles from './about.module.css';

const AboutPage = ({ data }) => (
  <main>
    <Helmet>
      <html lang="en" />
      <title>About</title>
      <meta name="description" content={data.site.siteMetadata.description}></meta>
    </Helmet>
    <Link className={classnames(styles.home, 'mt-2', 'ml-2', 'btn', 'btn-secondary')} to="/">
      Home
    </Link>
    <div className={styles.background}>
      <Container className='text-center py-5'>
        <Row className={classnames('py-lg-5', 'align-items-center')}>
          <Col lg={6} md={8} className="mx-auto">
            <h1 className="font-weight-light">Support Local</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <p>
              Unfortunately UberEats and many other companies are charging restaurants <b>30%</b> for food delivery. Not only
              that, food on UberEats is typically <b>more expensive</b> than ordering from the restaurant directly. By ordering
              from your local restaurant directly you're putting <b>more money into the local economy.</b> I built this site to encourage people to order directly and find new local delights.
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  </main>
);
export default AboutPage;

export const pageQuery = graphql`
  query AboutQuery {
    site {
      siteMetadata {
        title
        description
      }
    }
  }
`;
