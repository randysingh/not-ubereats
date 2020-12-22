import React from 'react';
import { graphql } from 'gatsby';
import { Helmet } from 'react-helmet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import Hero from '../components/hero';
import RestaurantList from '../components/restaurant';

import 'bootstrap/dist/css/bootstrap.min.css';

const Main = ({ location, data }) => {
  const restaurants = data.allContentfulRestaurant.edges;
  return (
    <main>
      <Hero></Hero>
      <Helmet title="Not UberEats" />
      <RestaurantList restaurants={restaurants} />
      <div className="footer mt-4 mb-4">
        <div className="text-center">
          Made with&nbsp;
          <FontAwesomeIcon color="red" icon={faHeart} />
          &nbsp;by{' '}
          <a href="https://www.linkedin.com/in/randynsingh/" target="_blank" rel="noreferrer">
            Randy Singh
          </a>
          . Images are property of their respective owners.</div>
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
          link
        }
      }
    }
  }
`;
