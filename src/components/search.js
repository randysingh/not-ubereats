import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import styles from './hero.module.css';

export default ({ data, searchTerm, setSearchTerm }) => (
  <Row>
    <Col>
      <InputGroup className="mb-4">
        <InputGroup.Prepend>
          <div class="input-group-text bg-white border-right-0">
            <FontAwesomeIcon icon={faSearch} />
          </div>
        </InputGroup.Prepend>
        <FormControl
          className="border-left-0 pl-0"
          placeholder="Search for restaurant or cuisine"
          aria-label="Search for restaurant or cuisine"
          role="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </InputGroup>
    </Col>
  </Row>
);
