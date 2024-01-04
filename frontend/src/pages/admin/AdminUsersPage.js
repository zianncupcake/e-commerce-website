import AdminUsersPageComponent from "../../components/admin/AdminUsersPageComponent";

import axios from "axios";

const fetchUsers = async () => {
  try {
    const { data } = await axios.get("/api/users/admin");
    return data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error; 
  }
};

const deleteUser = async (userId) => {
  try {
    const { data } = await axios.delete(`/api/users/admin/${userId}`);
    return data;
  } catch (error) {
    console.error(`Error deleting user with ID ${userId}:`, error);
    throw error; 
  }
};


const AdminUsersPage = () => {
  //functions passed into component as props -> use props to perform actions
  return <AdminUsersPageComponent fetchUsers={fetchUsers} deleteUser={deleteUser} />;
};

export default AdminUsersPage;

