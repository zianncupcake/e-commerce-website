
import axios from "axios";
import AdminOrderDetailsPageComponent from "../../components/admin/AdminOrderDetailsPageComponent";

const getOrder = async(id) => {
    const { data } = await axios.get(`/api/orders/getone/${id}`);
    return data
}

const markAsDelivered = async (id) => {
  const { data } = await axios.put(`/api/orders/admin/delivered/${id}`);
  if (data) {
      return data;
  }
}


const AdminOrderDetailsPage = () => {
  return <AdminOrderDetailsPageComponent getOrder={getOrder} markAsDelivered={markAsDelivered}/>
};

export default AdminOrderDetailsPage;

