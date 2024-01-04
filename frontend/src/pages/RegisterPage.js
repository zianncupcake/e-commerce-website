import axios from "axios";
import RegisterPageComponent from "../components/RegisterPageComponent";

const registerUser = async (name, lastName, email, password) => {
    const { data } = await axios.post("/api/users/register", { name, lastName, email, password });
    return data;
}

const RegisterPage = () => {
  
  return <RegisterPageComponent registerUser={registerUser} />
};

export default RegisterPage;

