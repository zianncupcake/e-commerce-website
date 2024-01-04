import UserOrdersPageComponent from "../../components/user/UserOrdersPageComponent";
import axios from "axios";

const getOrders = async (userId) => {
    const { data } = await axios.get(`/api/orders/${userId}`);
    return data;
}

const UserOrdersPage = () => {
  return <UserOrdersPageComponent getOrders={getOrders} />;
};

export default UserOrdersPage;

