import {
    Row,
    Col,
    Container,
    Form,
    Button,
    Alert
  } from "react-bootstrap";
  import { Link } from "react-router-dom";
  import { useState, useEffect } from "react";
  import { useParams } from "react-router-dom";


  
  
  const AdminEditUserPageComponent = ({updateUser, fetchUser}) => {
    const [validated, setValidated] = useState(false);
    const [isAdminState, setIsAdminState] = useState(false);
    const [user, setUser] = useState([]);
    const [success, setSuccess] = useState(false);


    const { id } = useParams();

    useEffect(() => {
        fetchUser(id)
        .then(data => {
            setUser(data);
            setIsAdminState(data.isAdmin);
            console.log(data)
        })
        .catch((er) => console.log(er.response.data.message ? er.response.data.message : er.response.data));
    }, [id])


    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget.elements;
        console.log("form", form)
        console.log("form.name", form.name)
        console.log("form.name.value", form.name.value)
        const name = form.name.value;
        const lastName = form.lastName.value;
        const email = form.email.value;
        const isAdmin = form.isAdmin.checked;

        if (event.currentTarget.checkValidity() === true) {
          updateUser(id, name, lastName, email, isAdmin)
          .then(data => {
            console.log(data)
              if (data.message === "user updated") {
                 setSuccess(true);
              }
          })
          .catch(er => {
              console.log(er)
          })
      }
  
      setValidated(true);
  
    };
    return (
      <Container>
        <Row className="justify-content-md-center mt-5">
          <Col md={1}>
            <Link to="/admin/users" className="btn btn-info my-3">
              Go Back
            </Link>
          </Col>
          <Col md={6}>
          <Alert variant="success" show={success}>
                Successfully updated user
              </Alert>

            <h1>Edit user</h1>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicFirstName">
                <Form.Label>First name</Form.Label>
                <Form.Control
                name="name"
                required
                type="text"
                defaultValue={user.name}
              />
              </Form.Group>
  
              <Form.Group
                className="mb-3"
                controlId="formBasicLastName"
              >
                <Form.Label>Last name</Form.Label>
                <Form.Control
                name="lastName"
                required
                type="text"
                defaultValue={user.lastName}
              />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                name="email"
                required
                type="email"
                defaultValue={user.email}
              />
              </Form.Group>
  
              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check name="isAdmin" type="checkbox" label="Is admin" checked={isAdminState} onChange={(e) => setIsAdminState(e.target.checked)}/>
              </Form.Group>
              <Row>
              <Button variant="primary" type="submit">
                Update user
              </Button>
              </Row>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  };
  
  export default AdminEditUserPageComponent;
  
  