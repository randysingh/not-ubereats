import React, { useState } from 'react';
import { graphql } from 'gatsby';
import { Helmet } from 'react-helmet';
import Container from 'react-bootstrap/Container';
import Hero from './hero';
import Search from './search';
import RestaurantList from './restaurant';
import Footer from './footer';
import Nav from './nav';
import DeliveryToggle from './delivery-toggle'

const App = ({ data, city }) => {
  const restaurants = data.allContentfulRestaurant.edges;
  const imageUrl = data.allContentfulHero.edges.find(element => element.node.name === 'Home').node.image.file.url;
  const [searchTerm, setSearchTerm] = useState(undefined);
  const [showDelivery, setShowDelivery] = useState(true);
  const description = city ? data.site.siteMetadata.description.replace("Toronto", city) : data.site.siteMetadata.description
  return (
    <main>
      <Nav />
      <Helmet>
        <html lang="en" />
        <title>{data.site.siteMetadata.title}</title>
        <meta name="description" content={description}></meta>
      </Helmet>
      <Hero src={imageUrl} city={city}></Hero>
      <div className="bg-light py-3">
        <Container>
          <DeliveryToggle showDelivery={showDelivery} setShowDelivery={setShowDelivery}></DeliveryToggle>
          <Search setSearchTerm={setSearchTerm} />
          <RestaurantList restaurants={restaurants} searchTerm={searchTerm} showDelivery={showDelivery} />
        </Container>
      </div>
      <Footer />
    </main>
  );
};

export default App;
