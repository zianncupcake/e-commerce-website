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


// import { Outlet, Navigate } from "react-router-dom";
// import UserChatComponent from "./user/UserChatComponent";

// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import LoginPage from "../pages/LoginPage";

// const ProtectedRoutesComponent = ({ admin }) => {
//   const [isAuth, setIsAuth] = useState();

//   useEffect(() => {
//     //basically in the res of this end point it has token and isAdmin fields. 
//      axios.get("/api/get-token").then(function (data) {
//          if (data.data.token) {
//              setIsAuth(data.data.token);
//          }
//          return isAuth;
//      }) 
//   }, [isAuth])

//   if (isAuth === undefined) return <LoginPage />;

//   return isAuth && admin && isAuth !== "admin" ? (
//        <Navigate to="/login" />
//   ) : isAuth && admin ? (
//     // Outlet is everything between protected route component. if authenticated then go to those inside, if not redirected to login
//       <Outlet />
//   ) : isAuth && !admin ? (
//       <>
//       <UserChatComponent />
//       {/* have the chat function only when its users. dont need to state the specific routes in app.js anymore. embedded in this component */}
//       <Outlet />
//       </>
//   ) : (
//        <Navigate to="/login" />
//   )
// };

// export default ProtectedRoutesComponent;

