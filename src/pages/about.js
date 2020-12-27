import React, { useState } from 'react';
import { graphql, Link } from 'gatsby';
import { Helmet } from 'react-helmet';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import classnames from 'classnames';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Footer from '../components/footer';

import styles from './about.module.css';

const AboutPage = ({ data }) => {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  const src = data.allContentfulHero.edges.find((element) => element.node.name === 'About').node.image.file.url;
  return (
    <main>
      <Helmet>
        <html lang="en" />
        <title>About</title>
        <meta name="description" content={data.site.siteMetadata.description}></meta>
      </Helmet>
      <Link className={classnames(styles.home, 'mt-2', 'ml-2', 'btn', 'btn-secondary')} to="/">
        Home
      </Link>
      <div className={styles.background} style={{ backgroundImage: `url(${src})` }}>
        <Container className="text-center py-5">
          <Row className={classnames('py-lg-5', 'align-items-center')}>
            <Col lg={6} md={8} className="mx-auto">
              <h1 className="font-weight-light">Support Local</h1>
            </Col>
          </Row>
          <Row>
            <Col>
              <p className="lead text-dark">
                Unfortunately, UberEats and many other companies are charging restaurants <b>30%</b> for food delivery.
                Not only that, food on UberEats is typically <b>more expensive</b> than ordering from the restaurant
                directly. By ordering from your local restaurant you're putting{' '}
                <b>more money into the local economy and helping restaurants during this critical time.</b> I built this
                site to encourage people to order directly and find new local delights.
              </p>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="bg-light">
        <Container className="pt-4 pb-4">
          <Row>
            <Col>
              <h2 className="font-weight-light">Question or Comments?</h2>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form
                method="post"
                validated={validated}
                netlify-honeypot="bot-field"
                data-netlify="true"
                name="contact"
                noValidate
                onSubmit={handleSubmit}
              >
                <input type="hidden" name="bot-field" />
                <input type="hidden" name="form-name" value="contact" />
                <Form.Group controlId="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" placeholder="Name" name="name" />
                </Form.Group>
                <Form.Group controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" placeholder="Email" name="email" />
                  <Form.Control.Feedback type="invalid">Enter valid email</Form.Control.Feedback>
                  <Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text>
                </Form.Group>
                <Form.Group controlId="message">
                  <Form.Label>Message</Form.Label>
                  <Form.Control as="textarea" rows={3} name="message" required />
                  <Form.Control.Feedback type="invalid">Message is required</Form.Control.Feedback>
                </Form.Group>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col>
              <p>
                Are you a restaurant needing help setting up delivery? Check out{' '}
                <a target="_blank" rel="noreferrer" href="https://localeats.to/">
                  LocalEats.to
                </a>
              </p>
              <p>
                This website was built by me,{' '}
                <a target="_blank" rel="noreferrer" href="https://www.linkedin.com/in/randynsingh">
                  Randy Singh
                </a>
                , in order to help restaurants during this difficult time and I do not profit in any way. Also thank you
                to <a target="_blank" rel="noreferrer" href="https://ca.linkedin.com/in/gamaliel-obinyan">Gamaliel Obinyan</a> for helping research local
                restaurants and for the encouragement.
              </p>
            </Col>
          </Row>
        </Container>
      </div>
      <Footer />
    </main>
  );
};
export default AboutPage;

export const pageQuery = graphql`
  query AboutQuery {
    allContentfulHero {
      edges {
        node {
          name
          image {
            file {
              url
            }
          }
        }
      }
    }
    site {
      siteMetadata {
        title
        description
      }
    }
  }
`;
