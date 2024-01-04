import ProductDetailsPageComponent from "../components/ProductDetailsPageComponent";
import axios from "axios";

const ProductDetailsPage = () => {

  const productInfo = async (id) => {
    const { data } = await axios.get(`/api/products/getone/${id}`);
    return data;
}

const writeReview = async (productId, formInputs, user) => {
  const { data } = await axios.post(`/api/users/review/${productId}`, { formInputs, user });
  return data;
}

  
  return <ProductDetailsPageComponent productInfo={productInfo} writeReview={writeReview}/>;
};

export default ProductDetailsPage;
