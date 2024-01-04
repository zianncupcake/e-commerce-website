import AdminOrdersPageComponent from "../../components/admin/AdminOrdersPageComponent";

import axios from "axios";

const adminGetOrders = async() => {
    const { data } = await axios.get("/api/orders/admin");
    return data
}

const AdminOrdersPage = () => {
  return <AdminOrdersPageComponent adminGetOrders={adminGetOrders} />
};

export default AdminOrdersPage;

