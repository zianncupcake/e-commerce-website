import UserProfilePageComponent from "../../components/user/UserProfilePageComponent"
import axios from 'axios';


const updateUser = async(id, name, lastName, phoneNumber, address, country, zipCode, city, state, password) => {
        const { data } = await axios.put(
          `/api//users/profile/${id}`,
            { name, lastName, phoneNumber, address, country, zipCode, city, state, password },
        )
        return data
    }

const fetchUser = async (id) => {
    const { data } = await axios.get(`/api/users/profile/${id}`);
    return data;
}

const UserProfilePage = () => {  
  return <UserProfilePageComponent updateUser={updateUser} fetchUser={fetchUser} />
};

export default UserProfilePage;

