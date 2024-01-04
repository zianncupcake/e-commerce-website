import { Container, Row, Col, Alert, ListGroup, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import CartItemComponent from "./CartItemComponent";
import {useCart} from "../context/CartContext";

const CartPageComponent = () => {
    const { cart } = useCart();
    console.log(cart)
//   const changeCount = (productID, count) => {
//     reduxDispatch(addToCart(productID, count));
//   };

//   const removeFromCartHandler = (productID, quantity, price) => {
//      if (window.confirm("Are you sure?")) {
//          reduxDispatch(removeFromCart(productID, quantity, price));
//      } 
//   }

  return (
    <Container fluid>
      <Row className="mt-4">
        <Col md={8}>
          <h1>Shopping Cart</h1>
          {cart.length === 0 ? (
            <Alert variant="info">Your cart is empty</Alert>
          ) : (
            <ListGroup variant="flush">
              {cart.map((item, idx) => (
                <CartItemComponent
                  idx={idx}
                />
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <ListGroup>
            <ListGroup.Item>
              <h3>{`Cart Summary: ${cart.length}`}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              Total Price: <span className="fw-bold">{`$${cart.reduce((total, item) => total + item.itemPrice*item.itemQuantity, 0)}`}</span>
            </ListGroup.Item>
            <ListGroup.Item>
              <LinkContainer to="/user/cart-details">
                <Button type="button">Proceed To Checkout</Button>
              </LinkContainer>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default CartPageComponent;

