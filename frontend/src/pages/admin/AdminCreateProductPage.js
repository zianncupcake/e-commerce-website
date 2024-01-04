import AdminCreateProductPageComponent from "../../components/admin/AdminCreateProductPageComponent";
import axios from "axios";

const createProduct = async (formInputs) => {
    const { data } = await axios.post(`/api/products/admin`, { ...formInputs });
    return data;
}

const getCategories = async () => {
  const { data } = await axios.get("/api/categories/");
  return data;
}

const makeNewCategory = async (categoryInfo) => {
  const { data } = await axios.post("/api/categories/", {...categoryInfo});
  return data;
}

const makeNewAttribute = async (AttributeInfo) => {
  const { data } = await axios.post("/api/categories/attr", {...AttributeInfo});
  return data;
}

const uploadImages = async (images, productId) => {
  //makes use of express fileupload middleware. intercept incoming http req and process files attached to it
  //when client send req with files attached e.g. through a form, middleware auto parse files and populated req.files with the file info
    const formData = new FormData();
    Array.from(images).forEach(image => {
        formData.append("images", image);
    })
    // u need req.query.productId to get the product
    await axios.post(`/api/products/admin/upload?productId=${productId}`, formData);
}

const AdminCreateProductPage = () => {
  
  return <AdminCreateProductPageComponent createProduct={createProduct} uploadImages={uploadImages} getCategories={getCategories} makeNewCategory={makeNewCategory} makeNewAttribute={makeNewAttribute}/>;
};

export default AdminCreateProductPage;

