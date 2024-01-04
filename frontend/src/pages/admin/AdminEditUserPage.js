import AdminEditUserPageComponent from "../../components/admin/AdminEditUserPageComponent";
import axios from "axios";

const fetchUser = async (userId) => {
  const { data } = await axios.get(`/api/users/admin/${userId}`);
  return data;
}

const updateUser = async (userId, name, lastName, email, isAdmin) => {
  const { data } = await axios.put(`/api/users/admin/${userId}`, { name, lastName, email, isAdmin });
  return data;
}

const AdminEditUserPage = () => {
  
  return <AdminEditUserPageComponent updateUser={updateUser} fetchUser={fetchUser} />;
};

export default AdminEditUserPage;

