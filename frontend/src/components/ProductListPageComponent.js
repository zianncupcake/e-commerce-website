import { Row, Col, Container, ListGroup, Button, Form } from "react-bootstrap";
import { Rating } from "react-simple-star-rating";

import SortOptionsComponent from "../components/SortOptionsComponent";
import PriceFilterComponent from "../components/filterQueryResultOptions/PriceFilterComponent";
import RatingFilterComponent from "../components/filterQueryResultOptions/RatingFilterComponent";
import CategoryFilterComponent from "../components/filterQueryResultOptions/CategoryFilterComponent";
import AttributesFilterComponent from "../components/filterQueryResultOptions/AttributesFilterComponent";
import ProductForListComponent from "../components/ProductForListComponent";
import PaginationComponent from "../components/PaginationComponent";

import { useEffect, useState } from "react";

const ProductListPageComponent = ({ products, categories }) => {

  return (
    <Container fluid>
      <Row>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item className="mb-3 mt-3">
              {/* <SortOptionsComponent /> */}
              <Form.Select aria-label="Defauly select example">
                <option>SORT BY</option>
                <option value="price_1">Price: Low To High</option>
                <option value="price_-1">Price: High To Low</option>
                <option value="rating_-1">Customer Rating</option>
                <option value="name_1">Name A-Z</option>
                <option value="name_-1">Name Z-A</option>
              </Form.Select>
            </ListGroup.Item>
            <ListGroup.Item>
              FILTER: <br />
              {/* <PriceFilterComponent /> */}
              <Form.Label>
        <span className="fw-bold">Price no greater than:</span> 500$
      </Form.Label>
      <Form.Range min={10} max={1000} step={10} />

            </ListGroup.Item>
            <ListGroup.Item>
              {/* <RatingFilterComponent /> */}
              <span className="fw-bold">Rating</span>
      {Array.from({ length: 5 }).map((_, idx) => (
          <Form.Check type="checkbox" id={`check-api-${idx}`}>
            <Form.Check.Input type="checkbox" isValid />
            <Form.Check.Label style={{ cursor: "pointer" }}>
              <Rating readonly size={20} initialValue={5 - idx} />
            </Form.Check.Label>
          </Form.Check>
      ))}
            </ListGroup.Item>
            <ListGroup.Item>
              {/* <CategoryFilterComponent /> */}
              <span className="fw-bold">Category</span>
      <Form>
        {Array.from({ length: 5 }).map((_, idx) => (
          <div key={idx}>
            <Form.Check type="checkbox" id={`check-api2-${idx}`}>
              <Form.Check.Input type="checkbox" isValid />
              <Form.Check.Label style={{ cursor: "pointer" }}>
                Category-{idx}
              </Form.Check.Label>
            </Form.Check>
          </div>
        ))}
      </Form>

            </ListGroup.Item>
            <ListGroup.Item>
              {/* <AttributesFilterComponent /> */}
              {[{ color: ["red", "blue", "green"] }, { ram: ["1 TB", "2 TB"] }].map(
        (item, idx) => (
          <div key={idx} className="mb-3">
            <Form.Label>
              <b>{Object.keys(item)}</b>
            </Form.Label>
            {item[Object.keys(item)].map((i, idx) => (
              <Form.Check key={idx} type="checkbox" label={i} />
            ))}
          </div>
        )
      )}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button variant="primary">Filter</Button>{" "}
              <Button variant="danger">Reset filters</Button>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={9}>
          {products?.map((product) => (
            <ProductForListComponent
              key={product._id}
              images={product.images}
              name={product.name}
              description={product.description}
              price={product.price}
              rating={product.rating}
              reviewsNumber={product.reviewsNumber}
              productId={product._id}
            />
          ))}
          <PaginationComponent />
        </Col>
      </Row>
    </Container>
  );
};

export default ProductListPageComponent;
