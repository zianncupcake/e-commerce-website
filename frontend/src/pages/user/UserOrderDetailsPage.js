import UserOrderDetailsPageComponent from "../../components/user/UserOrderDetailsPageComponent";
import axios from 'axios'

const getOrder = async (orderId) => {
    const { data } = await axios.get(`/api/orders/getone/${orderId}`);
    return data;
}


const UserOrderDetailsPage = () => {
  return <UserOrderDetailsPageComponent getOrder={getOrder} />;
};

export default UserOrderDetailsPage;

