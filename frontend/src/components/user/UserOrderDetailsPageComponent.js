import {
    Container,
    Row,
    Col,
    Form,
    Alert,
    ListGroup,
    Button,
    Image
  } from "react-bootstrap";
  import { useState, useEffect } from "react";
  import { useNavigate } from "react-router-dom";
  import { useParams } from "react-router-dom";


  
  const UserOrderDetailsPageComponent = ({getOrder}) => {
    // const [userInfo, setUserInfo] = useState({});
    const [orderInfo, setOrderInfo] = useState({});

    const { id } = useParams();

    // useEffect(() => {
    //     fetchUser(user._id)
    //     .then((data) => {
    //         setUserInfo(data);
    //         console.log("userinfo", userInfo);
    //         console.log("userinfo data", data);        
    //     })
    //     .catch((er) => console.log(er));
    // }, []);

    useEffect(() => {
        getOrder(id)
        .then((data) => {
            setOrderInfo(data);
            console.log("orderinfo", orderInfo);
            console.log("order info data", data);        
        })
        .catch((er) => console.log(er));
    }, [id])

  
    return (
      <Container fluid>
        <Row className="mt-4">
            {orderInfo && orderInfo.user? (
                <>
          <h1>Order Details</h1>
          <Col md={8}>
            <br />
            <Row>
              <Col md={6}>
                <h2>Shipping</h2>
                <b>Name</b>: {orderInfo.user.name} {orderInfo.user.lastName}  <br />
                <b>Address</b>: {orderInfo.user.address} <br />
                <b>Phone</b>: {orderInfo.user.phoneNumber}
              </Col>
              <Col md={6}>
                <h2>Payment</h2>
                <b>Payment Method</b>: {orderInfo.paymentMethod}  <br />
              </Col>
              <Row>
                <Col>
                <Row>
                <Alert show={!orderInfo.isDelivered} className="mt-3" variant="danger">
                  Not delivered
                </Alert>     
                </Row>
                <Row>
                {/* <Alert show={missingAddress} className="mt-3" variant="danger">
                In order to make order, fill out your profile with correct address, city etc.
                </Alert> */}
                <Alert show={orderInfo.isDelivered} className="mt-3" variant="danger">
                  Delivered at {orderInfo.isDelivered}
                </Alert>     
                </Row>
                </Col>
                <Col>
                {/* i just assume its paid when u place the order */}
                  <Alert  className="mt-3" variant="success">
                    Paid at {orderInfo.isPaid} haha
                  </Alert>
                </Col>
              </Row>
            </Row>
            <br />
            <h2>Order items</h2>

            <ListGroup variant="flush">
              {orderInfo && orderInfo.cartItems.map((item) => (
                    <>
                    <ListGroup.Item>
                    <Row>
                        <Col md={2}>
                        <Image
                            src={item.image.path}
                            fluid
                        />
                        </Col>
                        <Col md={3}>{item.name}</Col>
                        <Col md={3}>
                        <b>${item.price}</b>
                        </Col>
                        <Col md={4}>{item.quantity}</Col>

                        {/* <Col md={4}>
                                <Form.Select onChange={editQuantity} value ={quantity}> 
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                </Form.Select>
                        </Col> */}
                        {/* <Col md={3}>
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={() => handleRemoveFromCart()}
                        >
                            <i className="bi bi-trash"></i>
                        </Button>
                        </Col> */}
                    </Row>
                    </ListGroup.Item>
                    <br />
                </>
                            ))}
            </ListGroup>

          </Col>
          <Col md={4}>
            <ListGroup>
              <ListGroup.Item>
                <h3>Order Summary</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                Total Price (before tax & shipping): <span className="fw-bold">{`$${orderInfo.orderTotal.cartSubtotal - 20}`}</span>
              </ListGroup.Item>
              <ListGroup.Item>
                Shipping: <span className="fw-bold">$10</span>
              </ListGroup.Item>
              <ListGroup.Item>
                Tax: <span className="fw-bold">$10</span>
              </ListGroup.Item>
              <ListGroup.Item className="text-danger">
              Final Price: <span className="fw-bold">{`$${orderInfo.orderTotal.cartSubtotal}`}</span>
              </ListGroup.Item>
              <ListGroup.Item>
                <div className="d-grid gap-2">
                  <Button size="lg" variant="danger" type="button" disabled={true}>
                    Order Placed
                  </Button>
                </div>
              </ListGroup.Item>
            </ListGroup>
          </Col>
          </>
            ) : (
                <h1>Loading order information...</h1>
            )}
        </Row>
      </Container>
    );
  };
  
  export default UserOrderDetailsPageComponent;
  
  