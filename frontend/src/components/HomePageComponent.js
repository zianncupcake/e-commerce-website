import ProductCarouselComponent from "./ProductCarouselComponent";
import CategoryCardComponent from "./CategoryCardComponent";
import { Row, Container } from "react-bootstrap";

import { useEffect, useState } from "react";

const HomePageComponent = (props) => {
    console.log("props", props);
    const {categories} = props;
    console.log("categories", categories);

    const mainCategories= categories.filter((item) => !item.name.includes("/"))
    console.log("main categories", mainCategories)
  return (
    <>
      <ProductCarouselComponent />
      <Container>
        <Row xs={1} md={2} className="g-4 mt-5">
          {mainCategories.map((category, idx) => (
            <CategoryCardComponent key={idx} category={category} idx={idx} />
          ))}
        </Row>
      </Container>
    </>
  );
};

export default HomePageComponent;

