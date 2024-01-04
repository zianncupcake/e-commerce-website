import {
    Row,
    Col,
    Container,
    Form,
    Button,
    CloseButton,
    Table,
    Alert,
  } from "react-bootstrap";
  import { Link, useNavigate, useParams } from "react-router-dom";
  import { useState,useEffect } from "react";
  
  const AdminEditProductPageComponent = ({getProduct, uploadImages, updateProduct, getCategories, makeNewCategory, makeNewAttribute}) => {
    const [validated, setValidated] = useState(false);
    const [files, setFiles] = useState(false);
    const [attributesTable, setAttributesTable] = useState([])
    const [product, setProduct] = useState({});
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState({});
    const [newSelectedCategory, setNewSelectedCategory] = useState("");
    const [selectedAttribute, setSelectedAttribute] = useState({});
    const [selectedValue, setSelectedValue] = useState("");
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    //submit everything tgt. 
    //1a. if new category writen, we need to create new category with those atrributes table
    //1b. if not save new attributes for each attribute
    //then after that create product

    const {id} = useParams();

    useEffect(() => {
        getProduct(id)
        .then((res) => {
            setProduct(res);
            console.log("product details", res);
            setAttributesTable(res.attrs.map(({ key, value }) => ({ key, value })));

            getCategories()
            .then((res2) => {
                setCategories(res2);
                setSelectedCategory(res2.find(category => category.name === res.category))

            })
            .catch(err => console.log(err))
        })
        .catch((er) => console.log(er));

    },[])


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProduct((prevData) => ({ ...prevData, [name]: value }));
      };

     const handleCategoryChange = (event) => {
        const selected = event.target.value;
        console.log(selected);

        if (selected == "") {
            const categoryObjecta = {name:""}
            console.log(categoryObjecta);
            setSelectedCategory(categoryObjecta);
        } else {
            const categoryObjectb = categories.find((category) => category.name === selected);
            console.log(categoryObjectb);
            setSelectedCategory(categoryObjectb);

        }

        // Find the selected category object from the categories array
        // Update the state with the selected category object
        console.log("selected category changing", selectedCategory)
        
      };

      const handleAttributeChange = (event) => {
        const selectedAttribute = event.target.value;
        console.log(selectedAttribute);
    
        // Find the selected attribute object from the attrs array
        const attributeObject = selectedCategory.attrs.find((attribute) => attribute.key === selectedAttribute);
        console.log(attributeObject);
        // Update the state with the selected category object
        setSelectedAttribute(attributeObject);
      };

      const handleAddAttribute =() => {
        const newAttribute = { key: selectedAttribute.key, value: selectedValue };
        setAttributesTable((prevAttributes) => [...prevAttributes, newAttribute]);
      }

      const handleAddNewAttribute =() => {

        const newAttributeKey = document.getElementById('newAttrKey').value;
        const newAttributeValue = document.getElementById('newAttrValue').value;
    
        const newAttribute = { key: newAttributeKey, value: newAttributeValue };
        setAttributesTable((prevAttributes) => [...prevAttributes, newAttribute]);
      }


      const handleDeleteAttribute = (index) => {
        const updatedAttributes = [...attributesTable];
        updatedAttributes.splice(index, 1);
        setAttributesTable(updatedAttributes);
      };
    

    const handleSubmit = (event) => {
        event.preventDefault();
        // console.log("validity", event.currentTarget.checkValidity())


        console.log("check if selected category is corect", newSelectedCategory);
        console.log("files", files)
        console.log("files[0]", files[0])

        const form = event.currentTarget.elements;
        const formInputs = {
            name: form.name.value,
            description: form.description.value,
            count: form.count.value,
            price: form.price.value,
            category: "",
            attributesTable: attributesTable
        }


        if (newSelectedCategory) {
            formInputs.category = newSelectedCategory;

            makeNewCategory({category: `${newSelectedCategory}`})
            .then(res => console.log(res))
            .catch(er => console.log(er))

            attributesTable.forEach(attribute => {
                makeNewAttribute({ key: attribute.key, value: attribute.value, categoryChosen: newSelectedCategory })
                .then(res => console.log("updated categories", res))
                .catch(er => console.log(er))
            })
            console.log("forminputs 1", formInputs)

          } else {

            formInputs.category = selectedCategory.name;

            attributesTable.forEach(attribute => {
                makeNewAttribute({ key: attribute.key, val: attribute.value, categoryChosen: selectedCategory.name })
                .then(res => console.log("updated categories", res))
                .catch(er => console.log(er))
            })

            console.log("forminputs 2", formInputs)

          }
        console.log("imagessss", files);

        // if (event.currentTarget.checkValidity() === true) {
            updateProduct(id, formInputs)
            .then(data => {
                // if (files) {
                //     //data is the res from createProduct backend
                //     uploadImages(files, data.productId)
                //     .then(res => console.log(res))
                //     .catch((er) => console.log(er.response.data.message ? er.response.data.message : er.response.data))
                // }
                console.log("data.message",data.message);
                if (data.message === "product updated") setSuccess(true);
            })
            .catch(er => {
                console.log(er.response.data.message ? er.response.data.message : er.response.data );
            })
        // }
    
        //   setValidated(true);
    }
    return (
      <Container>
        <Row className="justify-content-md-center mt-5">
          <Col md={1}>
            <Link to="/admin/products" className="btn btn-info my-3">
              Go Back
            </Link>
          </Col>
          <Col md={6}>
                <Alert variant="success" show={success}>
                Successfully updated product
              </Alert>

            <h1>Edit Product</h1>
            <Form noValidate validated={validated} onSubmit = {(e) => handleSubmit(e)}  >
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Name</Form.Label>
                <Form.Control name="name" required type="text" value={product.name} onChange={(e) => handleInputChange(e)}/>
              </Form.Group>
  
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Description</Form.Label>
                <Form.Control
                  name="description"
                  required
                  as="textarea"
                  rows={3}
                  value={product.description} 
                  onChange={(e) => handleInputChange(e)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicCount">
                <Form.Label>Count in stock</Form.Label>
                <Form.Control name="count" required type="number" value={product.count} onChange={(e) => handleInputChange(e)} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPrice">
                <Form.Label>Price</Form.Label>
                <Form.Control name="price" required type="text" value={product.price} onChange={(e) => handleInputChange(e)} />
              </Form.Group>
              <Row className="mt-5">
              <Form.Group className="mb-3" controlId="formBasicCategory">
                <Form.Label>
                  Category
                  {/* <CloseButton />(<small>remove selected</small>) */}
                </Form.Label>
                <Form.Select
                  name="category"
                  aria-label="Default select example"
                  value={selectedCategory?.name}
                  onChange={(e) => handleCategoryChange(e)}
                  disabled = {newSelectedCategory}
                  required= {!newSelectedCategory}
                >
                    <option value="">Existing category</option>

                    
                    {categories && categories.map((category) => (
                        <option value={category.name}>
                            {category.name}
                        </option>
                    ))}
                </Form.Select>

              </Form.Group>
              </Row>
  
              <Form.Group className="mb-3" controlId="formBasicNewCategory">
                <Form.Label>
                  Or create a new category (e.g. Computers/Laptops/Intel){" "}
                </Form.Label>
                <Form.Control 
                required= {!selectedCategory.name}
                name="newCategory" 
                type="text" 
                onChange={(e) => setNewSelectedCategory(e.target.value)}
                disabled = { selectedCategory.name && !(selectedCategory.name == "")}
                />
              </Form.Group>
  
              <Row className="mt-5">
                <Col md={8}>
                  <Form.Group className="mb-3" controlId="formBasicAttributes">
                    <Form.Label>Choose exisiting attribute of {selectedCategory && `${selectedCategory.name}`}</Form.Label>
                    <Form.Select
                      name="attrKey"
                      aria-label="Default select example"
                      value={selectedAttribute.key}
                      onChange={(e) => handleAttributeChange(e)}
                      disabled = {newSelectedCategory}
                      
                      
                    >
                    <option value="">Exisiting attribute</option>                    
                    {selectedCategory && selectedCategory?.attrs?.map((attribute) => (
                        <option value={attribute.key}>
                            {attribute.key}
                        </option>
                    ))}

                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group
                    className="mb-3"
                    controlId="formBasicAttributeValue"
                  >
                    <Form.Label>Choose value</Form.Label>
                    <Form.Select
                      name="attrVal"
                      aria-label="Default select example"
                      value={selectedValue}
                      onChange={(e) => setSelectedValue(e.target.value)}
                      disabled = {newSelectedCategory}


                    >
                        <option>Attribute value</option>
                        {selectedAttribute && selectedAttribute?.value?.map((v) => (
                        <option value={v}>
                            {v}
                        </option>
                    ))}

                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
              <Button variant="light" onClick={() => handleAddAttribute()}>
                Add attribute
              </Button>

              </Row>
              <Row>
                <Col md={8}>
                  <Form.Group className="mb-3" controlId="formBasicNewAttribute">
                    <Form.Label>Or create new attribute</Form.Label>
                    <Form.Control
                      disabled={false}
                      placeholder="New attribute"
                      id="newAttrKey"
                      type="text"
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group
                    className="mb-3"
                    controlId="formBasicNewAttributeValue"
                  >
                    <Form.Label>New value</Form.Label>
                    <Form.Control
                      disabled={false}
                      placeholder="New attribute value"
                      id="newAttrValue"
                      type="text"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
              <Button variant="light" onClick={() => handleAddNewAttribute()}>
                Add attribute
              </Button>
              </Row>


  
              <Row className="mt-5">
                <Table hover>
                  <thead>
                    <tr>
                      <th>Attribute</th>
                      <th>Value</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {attributesTable && attributesTable?.map((attribute, index) => (
                        <tr key={index}>
                        <td>{attribute.key}</td>
                        <td>{attribute.value}</td>
                        <td>
                            <CloseButton onClick={() => handleDeleteAttribute(index)}></CloseButton>
                        </td>
                        </tr>
                    ))}
                    </tbody>
                  {/* <tbody>
                    <tr>
                      <td>attr key</td>
                      <td>attr value</td>
                      <td>
                        <CloseButton />
                      </td>
                    </tr>
                  </tbody> */}
                </Table>
              </Row>
  
  
              {/* <Alert variant="primary">
                After typing attribute key and value press enter on one of the
                field
              </Alert> */}
  
              {/* <Form.Group controlId="formFileMultiple" className="mb-3 mt-3">
                <Form.Label>Reupload images</Form.Label>
                <Form.Control required type="file" multiple onChange={(e) => setFiles(e.target.files)} />
              </Form.Group> */}
              <Row>
              <Button variant="primary" type="submit">
                Update
              </Button>
              </Row>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  };
  
  export default AdminEditProductPageComponent;
  
  