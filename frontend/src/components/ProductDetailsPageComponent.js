import {
    Row,
    Col,
    Container,
    Image,
    ListGroup,
    Form,
    Button,
    Alert,
  } from "react-bootstrap";
  import { Rating } from "react-simple-star-rating";
  import AddedToCartMessageComponent from "../components/AddedToCartMessageComponent";
  
  import ImageZoom from "js-image-zoom";
  import { useEffect, useState} from "react";
  import { useParams } from "react-router-dom";
  import { useCart } from "../context/CartContext"; 
  import {useAuth} from '../context/UserContext';


  const ProductDetailsPageComponent = ({productInfo, writeReview}) => {
    const [product, setProduct] = useState({});
    const [quantity, setQuantity] = useState(1);
    const [showCartMessage, setShowCartMessage] = useState(false);
    const [success, setSuccess] = useState(false);
    const { user } = useAuth();



    const { addToCart, cart } = useCart();

    const addToCartHandler = () => {
        const item = {
            itemName: product.name,
            itemPrice: product.price,
            itemImage: product.images[0].path,
            itemQuantity: quantity,
            itemCount: product.count
        }
      addToCart(item);
      setShowCartMessage(true);
      console.log("cart",cart);
    };  
      const {id} = useParams();

      const sendReviewHandler = (e) => {
        e.preventDefault();
        const form = e.currentTarget.elements;
        const formInputs = {
            comment: form.comment.value,
            rating: form.rating.value,
        }
        if (e.currentTarget.checkValidity() === true) {
            console.log(product._id, formInputs, user);
            writeReview(product._id, formInputs, user)
            .then(data => {
                if (data === "review created") {
                    setSuccess(true);
                }
            })
            .catch((er) => console.log(er.response.data.message ? er.response.data.message : er.response.data));
   
        }
     }
   
  
  
    var options = {
      // width: 400,
      // zoomWidth: 500,
      // fillContainer: true,
      // zoomPosition: "bottom",
      scale: 2,
      offset: { vertical: 0, horizontal: 0 },
    };
    useEffect(() => {
            productInfo(id)
            .then((res) => {
                setProduct(res);
                console.log("product details", res);
            })
            .catch((er) => console.log(er));

      
    //   new ImageZoom(document.getElementById("first"), options);
    //   new ImageZoom(document.getElementById("second"), options);
    //   new ImageZoom(document.getElementById("third"), options);
    //   new ImageZoom(document.getElementById("fourth"), options);
    }, [id]);
    return (
      <Container>
        <AddedToCartMessageComponent showCartMessage={showCartMessage} setShowCartMessage={setShowCartMessage} />
        <Row className="mt-5">
          <Col style={{ zIndex: 1 }} md={4}>
            {product.images && product.images.map((image, index) => (
                <div id={index}>
                <br />
                <Image fluid src={image.path} />
                <br />
                </div>
            ))}

            {/* <div id="first">
              <Image
                crossOrigin="anonymous"
                fluid
                src="/images/games-category.png"
              />
            </div>
            <br />
            <div id="second">
              <Image fluid src="/images/monitors-category.png" />
            </div>
            <br />
            <div id="third">
              <Image fluid src="/images/tablets-category.png" />
            </div>
            <br />
            <div id="fourth">
              <Image fluid src="/images/games-category.png" />
            </div>
            <br /> */}
          </Col>
          <Col md={8}>
            <Row>
              <Col md={8}>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h1>{`${product.name}`}</h1>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Rating readonly size={20} initialValue={4} /> (1)
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Price <span className="fw-bold">{`$${product.price}`}</span>
                  </ListGroup.Item>
                  <ListGroup.Item>{`${product.description}`}</ListGroup.Item>
                </ListGroup>
              </Col>
              <Col md={4}>
                <ListGroup>
                  <ListGroup.Item>Availability: <span className="fw-bold">{product.count > 0 ? "In stock" : "Sold out"}</span></ListGroup.Item>
                  <ListGroup.Item>
                    Price: <span className="fw-bold">{`$${product.price}`}</span>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Quantity:
                    <Form.Select size="lg" aria-label="Default select example" onChange={(e) => setQuantity(parseInt(e.target.value))} value ={quantity}> 
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                    </Form.Select>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    {/* access current value of the html element that triggered the event */}
                    <Button onClick={() => addToCartHandler()} variant="danger" className="w-100" disabled={(product.count==0)?true:false}>Add to cart</Button>
                  </ListGroup.Item>
                </ListGroup>
              </Col>
            </Row>
            <Row>
              <Col className="mt-5">
                <h5>REVIEWS</h5>
                <ListGroup variant="flush">
                {product.reviews &&
                      product.reviews.map((review, idx) => (
                        <ListGroup.Item key={idx}>
                          {review.user.name} <br />
                          <Rating readonly size={20} initialValue={review.rating} />
                          <br />
                          {/* grabbing the first 10 characters of the string. This is commonly used to extract the date portion of a timestamp. */}
                          {review.createdAt.substring(0, 10)} <br /> 
                          {review.comment}
                        </ListGroup.Item>
                      ))}
                </ListGroup>
              </Col>
            </Row>
            <hr />
            {!user && <Alert variant="danger">Login first to write a review</Alert>}
            <Form onSubmit={sendReviewHandler}>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Write a review</Form.Label>
                <Form.Control name="comment" required as="textarea" disabled={!user} rows={3} />
              </Form.Group>
              <Form.Label>Your rating</Form.Label>
              <Form.Select name="rating" required disabled={!user} aria-label="Default select example">
                <option value="5">5 (very good)</option>
                <option value="4">4 (good)</option>
                <option value="3">3 (average)</option>
                <option value="2">2 (bad)</option>
                <option value="1">1 (awful)</option>
              </Form.Select>
              <Button disabled={!user} className="mb-3 mt-3 w-100" variant="primary" type="submit">
                Submit review
              </Button>
              <Alert variant="success" show={success}>
                Successfully reviewed product
              </Alert>

            </Form>
          </Col>
        </Row>
      </Container>
    );
  };
  
  export default ProductDetailsPageComponent;
  
  