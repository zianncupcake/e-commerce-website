
import {Navbar, Nav, Container, NavDropdown, Badge, Form, Dropdown, DropdownButton, Button, InputGroup} from "react-bootstrap";
import {LinkContainer} from 'react-router-bootstrap';
import {Link} from "react-router-dom";
import axios from "axios";
import {useAuth} from '../context/UserContext'
import {useCart} from "../context/CartContext";


const HeaderComponent = () => {
 const handleLogout = () => {
    // Call the logout function from UserContext
    logout();
    // Optionally, you can redirect the user to the login page or perform other actions
  };  
  const { user, logout } = useAuth();
  const { cart } = useCart();

  console.log("user", user);
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <LinkContainer to="/">
            <Navbar.Brand href="/">ZIANN'S ONLINE SHOP</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <InputGroup>
            <DropdownButton id="dropdown-basic-button" title="All">
                <Dropdown.Item >Electronics</Dropdown.Item>
                <Dropdown.Item >Books</Dropdown.Item>
                <Dropdown.Item >Cars</Dropdown.Item>
            </DropdownButton>
            <Form.Control type="text" placeholder="Search in shop ..." />
            <Button variant="warning">
            <i className="bi bi-search text-dark" ></i>
            </Button>
            </InputGroup>
            </Nav>
            <Nav>
            {user? (
              <>
              
              <NavDropdown title={`${user.name} ${user.lastName}`} id="collasible-nav-dropdown">
              <NavDropdown.Item eventKey="/user/my-orders" as={Link} to="/user/my-orders">My orders</NavDropdown.Item>
              <NavDropdown.Item eventKey="/user" as={Link} to="/user">My profile</NavDropdown.Item>
              <NavDropdown.Item eventKey="/" as={Link} to="/" onClick={() => handleLogout()}>Logout</NavDropdown.Item>
              </NavDropdown>

              <LinkContainer to ="/cart">
                <Nav.Link >
                    <Badge pill bg="danger">
                    {cart.length === 0 ? "" : cart.length}
                    </Badge>
                    <i className="bi bi-cart"></i>
                    {/* ms is marginstart */}
                    <span className="ms-1">Cart</span>
                </Nav.Link>
            </LinkContainer>

              </>
            ) : (
              <>
                <LinkContainer to="/login">
                  <Nav.Link>Login</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/register">
                  <Nav.Link>Register</Nav.Link>
                </LinkContainer>
              </>
            )}

          </Nav>
          


        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default HeaderComponent;