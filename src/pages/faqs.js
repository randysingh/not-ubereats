import React from 'react';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
import { Helmet } from 'react-helmet';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'gatsby';

import Nav from '../components/nav';

export default () => (
  <main>
    <Helmet>
      <html lang="en" />
      <title>FAQs</title>
      <description>Frequently asked questions(FAQs)</description>
    </Helmet>
    <Nav />
    <Container as="section" className="text-center py-5">
      <Row className="py-lg-5">
        <Col className="mx-auto">
          <h1 className="font-weight-light">FAQs</h1>
          <Accordion defaultActiveKey="0">
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey="0">
                How does this work?
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
                  Many delivery apps take 30% of the order as a commission. Additionally, with delivery apps you'll
                  notice service fees. By ordering directly, the restaurant can keep more of the money and eliminate
                  service fees. This puts more money directly into your local restaurants and saving you money to boot!
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey="1">
                How do I add my restaurant?
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="1">
                <Card.Body>
                  Click <Link to="/submit-business">here.</Link> The more details you can add the faster we can get your
                  submission up as we do this in our spare time :).
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey="2">
                Do you make any money off the site?
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="2">
                <Card.Body>
                  Nada. We are completely non-profit. We really want this to be a community initiative. Restaurants have
                  been hard hit and we're trying to do what we can so that, hopefully, we can enjoy them in person after
                  the pandemic.
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey="3">
                How can I add restaurants in my city?
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="3">
                <Card.Body>
                  We're looking for volunteers to help catalog restaurants in their city. If you think you can come up
                  with a list of restaurants(at least 50) for your city <Link to="/about">contact us here.</Link> Please
                  be patient as we do have full-time jobs outside of this.
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey="4">
                What gives? Why am I ordering through Ritual?/A DoorDash driver delivered my order?
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="4">
                <Card.Body>
                  It's quite expensive for restaurants to hire their own drivers. Many Toronto restaurants have
                  partnered with Ritual since it's{' '}
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.toronto.ca/news/city-of-toronto-partnership-with-ritual-open-for-business-supports-more-than-1000-local-businesses-with-free-delivery-until-november-8/"
                  >
                    free through 2021
                  </a>
                  . They may use DoorDash drivers at a flat rate fee but DoorDash is not receiving a commission on these
                  order. If you think a restaurant shouldn't be on the platform or want clarification{' '}
                  <Link to="/about">contact me.</Link>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </Col>
      </Row>
    </Container>
  </main>
);
