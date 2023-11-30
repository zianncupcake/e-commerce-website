import {Outlet,Navigate} from "react-router-dom";
import UserChatComponent from "./user/UserChatComponent";

const ProtectedRoutesComponent = ({admin}) => {
    if (admin) {
        let adminAuth = true;
            // Outlet is everything between protected route component. if authenticated then go to those inside, if not redirected to login
        return adminAuth ? <Outlet /> :  <Navigate to="/login"/>;
    } else {
        let userAuth = true;
        // have the chat function only when its users. dont need to state the specific routes in app.js anymore. embedded in this component
        return userAuth ? <><UserChatComponent /><Outlet /></> :  <Navigate to="/login"/>;
    }

};

export default ProtectedRoutesComponent
