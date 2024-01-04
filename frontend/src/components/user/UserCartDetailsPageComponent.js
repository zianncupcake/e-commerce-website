import {
    Container,
    Row,
    Col,
    Form,
    Alert,
    ListGroup,
    Button,
  } from "react-bootstrap";
  import CartItemComponent from "../CartItemComponent";
  import {useAuth} from '../../context/UserContext';
  import {useCart} from "../../context/CartContext";
  import { useState, useEffect } from "react";
  import { useNavigate } from "react-router-dom";

  

  const UserCartDetailsPageComponent = ({fetchUser, createOrder}) => {
    const { user } = useAuth();
    const { cart, clearCart } = useCart();
    const [userInfo, setUserInfo] = useState({});
    const [missingAddress, setMissingAddress] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState("PayPal");
    const navigate = useNavigate();

    // const choosePayment = (e) => {
    //     setPaymentMethod(e.target.value);
    // }


    useEffect(() => {
        fetchUser(user._id)
        .then((data) => {
            setUserInfo(data);
            console.log("userinfo", userInfo);
            console.log("data", data);
            if (!data.address || !data.city || !data.country || !data.zipCode || !data.state || !data.phoneNumber) {
                // setButtonDisabled(true);
                setMissingAddress(true);
            } else {
                setMissingAddress(false);
            }
        
        })
        .catch((er) => console.log(er));
    }, [])

    const orderHandler = () => {

        const orderData = {
            orderTotal: {
               itemsCount: cart.length, 
               cartSubtotal: 20 + cart.reduce((total, item) => total + item.itemPrice*item.itemQuantity, 0),
            },
            cartItems: cart.map(item => {
                return {
                    name: item.itemName,
                    price: item.itemPrice,
                    image: {path: item.itemImage},
                    quantity: item.itemQuantity,
                    count: item.itemCount,        
                }
            }),
            paymentMethod: paymentMethod,
            userId: user._id
        }
        console.log(orderData);
       createOrder(orderData)
       .then(data => {
           if (data) {
               navigate("/user/order-details/" + data._id);
               clearCart();

           }
       })
       .catch((err) => console.log(err));
    }

  
    return (
      <Container fluid>
        <Row className="mt-4">
          <h1>Cart Details</h1>
          <Col md={8}>
            <br />
            <Row>
              <Col md={6}>
                <h2>Shipping</h2>
                <b>Name</b>: {userInfo.name} {userInfo.lastName}  <br />
                <b>Address</b>: {userInfo.address} <br />
                <b>Phone</b>: {userInfo.phoneNumber}
              </Col>
              <Col md={6}>
                <h2>Payment method</h2>
                <Form.Select onChange={(e) => setPaymentMethod(e.target.value)}>
                  <option value="PayPal">PayPal</option>
                  <option value="Visa">Visa</option>
                  <option value="Mastercard">Mastercard</option>
                  <option value="Amercian Express">American Express</option>

                </Form.Select>
              </Col>
              <Row>
                <Col>
                <Row>
                <Alert className="mt-3" variant="danger">
                  Not delivered
                </Alert>     
                </Row>
                <Row>
                <Alert show={missingAddress} className="mt-3" variant="danger">
                In order to make order, fill out your profile with correct address, city etc.
                </Alert>
                </Row>
                </Col>
                <Col>
                  <Alert className="mt-3" variant="success">
                    Not paid yet
                  </Alert>
                </Col>
              </Row>
            </Row>
            <br />
            <h2>Order items</h2>
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
                <h3>Order Summary</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                Total Price (before tax & shipping): <span className="fw-bold">{`$${cart.reduce((total, item) => total + item.itemPrice*item.itemQuantity, 0)}`}</span>
              </ListGroup.Item>
              <ListGroup.Item>
                Shipping: <span className="fw-bold">$10</span>
              </ListGroup.Item>
              <ListGroup.Item>
                Tax: <span className="fw-bold">$10</span>
              </ListGroup.Item>
              <ListGroup.Item className="text-danger">
              Final Price: <span className="fw-bold">{`$${20 + cart.reduce((total, item) => total + item.itemPrice*item.itemQuantity, 0)}`}</span>
              </ListGroup.Item>
              <ListGroup.Item>
                <div className="d-grid gap-2">
                  <Button size="lg" variant="danger" type="button" disabled = {missingAddress} onClick={() => orderHandler()}>
                    Place Order
                  </Button>
                </div>
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      </Container>
    );
  };
  
  export default UserCartDetailsPageComponent;
  
  