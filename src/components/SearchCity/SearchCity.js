import React from "react";
import { Form, FormControl, Button, InputGroup } from "react-bootstrap";
import "./style.css"

const SearchCity = (props) => {
  return (
    <div>
      <Form onSubmit={props.handleSubmit}>
        <InputGroup>
          <FormControl
            type="text"
            placeholder="Search city's weather here"
            value={props.query}
            onChange={props.handleChange}
            className="bg-transparent text-light formSearchBox"
          />
          <InputGroup.Append>
            <Button variant="transparent" className="text-light formButton" type="submit">
              Search
            </Button>
          </InputGroup.Append>
        </InputGroup>
      </Form>
    </div>
  );
};

export default SearchCity;
