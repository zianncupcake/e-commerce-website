

import axios from "axios";
import AdminProductsPageComponent from "../../components/admin/AdminProductsPageComponent";

const fetchProducts = async (abctrl) => {
    const { data } = await axios.get("/api/products/admin")
    return data;
}

const deleteProduct = async (productId) => {
    const { data } = await axios.delete(`/api/products/admin/${productId}`);
    return data
}

const AdminProductsPage = () => {
  return <AdminProductsPageComponent fetchProducts={fetchProducts} deleteProduct={deleteProduct} />
};

export default AdminProductsPage;

