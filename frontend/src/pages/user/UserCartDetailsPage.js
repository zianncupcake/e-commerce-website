import UserCartDetailsPageComponent from "../../components/user/UserCartDetailsPageComponent";
import axios from 'axios';

const fetchUser = async (id) => {
    const { data } = await axios.get(`/api/users/profile/${id}`);
    return data;
}

const createOrder = async (orderData) => {
    const { data } = await axios.post("/api/orders", { ...orderData });
    return data;
}

const productInfo = async (id) => {
    const { data } = await axios.get(`/api/products/getone/${id}`);
    return data;
}


const UserCartDetailsPage = () => {
    return <UserCartDetailsPageComponent fetchUser={fetchUser}  createOrder={createOrder} productInfo={productInfo} />
}

export default UserCartDetailsPage