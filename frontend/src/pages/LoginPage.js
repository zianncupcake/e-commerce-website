import axios from "axios";
import LoginPageComponent from "../components/LoginPageComponent";

const loginUser = async (email, password, doNotLogout) => {
    const { data } = await axios.post("/api/users/login", { email, password, doNotLogout });
     return data;
}
const LoginPage = () => {
  
  return <LoginPageComponent loginUser={loginUser} />
};

export default LoginPage;

