import React, { useState } from 'react';
import { graphql } from 'gatsby';
import { Helmet } from 'react-helmet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import Container from 'react-bootstrap/Container';
import Hero from '../components/hero';
import Search from '../components/search';
import RestaurantList from '../components/restaurant';

import 'bootstrap/dist/css/bootstrap.min.css';

const Main = ({ data }) => {
  const restaurants = data.allContentfulRestaurant.edges;
  const [location, setLocation] = useState(undefined);
  const [searchTerm, setSearchTerm] = useState(undefined);

  const success = (position) => {
    setLocation({ latitude: position.coords.latitude, longitude: position.coords.longitude });
  };

  if (typeof window !== 'undefined' && navigator.geolocation) {
    // navigator.geolocation.getCurrentPosition(success); Flag off for now
  }

  return (
    <main>
      <Helmet>
        <html lang="en" />
        <title>{data.site.siteMetadata.title}</title>
        <meta name="description" content={data.site.siteMetadata.description}></meta>
      </Helmet>
      <Hero></Hero>
      <div className="bg-light py-5">
        <Container>
          <Search setSearchTerm={setSearchTerm} />
          <RestaurantList restaurants={restaurants} location={location} searchTerm={searchTerm} />
        </Container>
      </div>
      <div className="footer mt-4 mb-4">
        <div className="text-center">
          Made with&nbsp;
          <FontAwesomeIcon color="red" icon={faHeart} />
          &nbsp;by{' '}
          <a href="https://www.linkedin.com/in/randynsingh/" target="_blank" rel="noreferrer">
            Randy Singh
          </a>
          . Images are property of their respective owners.
        </div>
      </div>
    </main>
  );
};

export default Main;

export const pageQuery = graphql`
  query HomeQuery {
    allContentfulRestaurant {
      edges {
        node {
          name
          image {
            fluid(maxWidth: 400) {
              ...GatsbyContentfulFluid
            }
          }
          description {
            childMarkdownRemark {
              html
            }
          }
          location {
            lat
            lon
          }
          link
          tags
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
