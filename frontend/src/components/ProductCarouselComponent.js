import {Carousel} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const ProductCarouselComponent = () => {
    const cursorP = {
        cursor:"pointer"
    };
  return (
    <Carousel>
      <Carousel.Item>
        <img crossorigin="anonymmous" className="d-block w-100" src="/images/carousel/carousel-1.png" alt="First slide" style ={{objectFit:"cover", height:"300px"}} />
        <Carousel.Caption>
            <LinkContainer to="/product-details" style= {cursorP}>
                <h3>Bestseller in Laptops Category</h3>
            </LinkContainer>
            <p>Dell Inspiron 15 3000 Laptop, 15.6 inch HD</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src="/images/carousel/carousel-2.png" alt="second slide" style ={{objectFit:"cover", height:"300px"}}  />
        <Carousel.Caption>
            <LinkContainer to="/product-details" style= {cursorP}>
                <h3>Bestseller in Books Category</h3>
            </LinkContainer>
            <p>I Want to Die but I Want to Eat Tteokbokki</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <img className="d-block w-100" src="/images/carousel/carousel-3.png" alt="third slide" style ={{objectFit:"cover", height:"300px"}}  />        
        <Carousel.Caption>
            <LinkContainer to="/product-details" style= {cursorP}>
                <h3>Bestseller in Cameras Category</h3>
            </LinkContainer>
            <p>Minolta SRT 101 Film Camera</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default ProductCarouselComponent;