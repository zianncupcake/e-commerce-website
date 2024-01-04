import { Row, Col, Image, ListGroup, Form, Button } from "react-bootstrap";
import { useCart } from "../context/CartContext"; 
import { useEffect, useState} from "react";


const CartItemComponent = ({idx }) => {
  const { removeFromCart, cart } = useCart();
  const [quantity, setQuantity] = useState(cart[idx].itemQuantity);

  const editQuantity = (e) => {
    const updated = parseInt(e.target.value);
    setQuantity(updated);
    cart[idx].itemQuantity = updated;
    console.log("updated cart", cart)

  };

  const handleRemoveFromCart = () => {
    if (window.confirm("Are you sure?")) {
      removeFromCart(idx)

    }

  };


  return (
    <>
      <ListGroup.Item>
        <Row>
          <Col md={2}>
            <Image
              crossOrigin="anonymous"
              src={cart[idx].itemImage}
              fluid
            />
          </Col>
          <Col md={2}>{cart[idx].itemName}</Col>
          <Col md={2}>
            <b>${cart[idx].itemPrice}</b>
          </Col>
          <Col md={3}>
                    <Form.Select onChange={editQuantity} value ={quantity}> 
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                    </Form.Select>
          </Col>
          <Col md={3}>
            <Button
              type="button"
              variant="secondary"
              onClick={() => handleRemoveFromCart()}
            >
              <i className="bi bi-trash"></i>
            </Button>
          </Col>
        </Row>
      </ListGroup.Item>
      <br />
    </>
  );
};

export default CartItemComponent;

