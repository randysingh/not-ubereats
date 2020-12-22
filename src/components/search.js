import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

export default ({ data, setSearchTerm }) => (
  <Row>
    <Col>
      <InputGroup className="mb-4">
        <InputGroup.Prepend>
          <div className="input-group-text bg-white border-right-0">
            <FontAwesomeIcon icon={faSearch} />
          </div>
        </InputGroup.Prepend>
        <FormControl
          className="border-left-0 pl-0"
          placeholder="Search for restaurant or cuisine"
          aria-label="Search for restaurant or cuisine"
          role="search"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </InputGroup>
    </Col>
  </Row>
);
