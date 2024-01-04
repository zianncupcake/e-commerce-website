import ProductListPageComponent from "../components/ProductListPageComponent";
import axios from "axios";
import {useEffect, useState} from "react";

const ProductListPage = () => {
  const [categories, setCategories] = useState(null);
  const [products, setProducts] = useState(null);

  const getProducts = async () => {
    const { data } = await axios.get('/api/products');
    return data
}

const getCategories = async () => {
  const { data } = await axios.get("/api/categories/");
  return data;
}
  useEffect(() => {
    getCategories()
    .then((res) => {
        setCategories(res);
        console.log("res categories", res);        
    })
    .catch((er) => console.log(er));
}, [])

useEffect(() => {
  getProducts()
  .then((res) => {
      setProducts(res.products);
      console.log("res products", res.products);        
  })
  .catch((er) => console.log(er));
}, [])

  return <ProductListPageComponent products={products} categories={categories} />;
};

export default ProductListPage;

