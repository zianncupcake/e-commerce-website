import CartPage from "./pages/CartPage";
import HomePage from "./pages/HomePage";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import ProductListPage from "./pages/ProductListPage";
import RegisterPage from "./pages/RegisterPage";
import UserCartDetailsPage from "./pages/user/UserCartDetailsPage";
import UserOrderDetailsPage from "./pages/user/UserOrderDetailsPage";
import UserOrdersPage from "./pages/user/UserOrdersPage";
import UserProfilePage from "./pages/user/UserProfilePage";
import ProtectedRoutesComponent from "./components/ProtectedRoutesComponent";
import AdminAnalyticsPage from "./pages/admin/AdminAnalyticsPage";
import AdminChatsPage from "./pages/admin/AdminChatsPage";
import AdminCreateProductPage from "./pages/admin/AdminCreateProductPage";
import AdminEditProductPage from "./pages/admin/AdminEditProductPage";
import AdminEditUserPage from "./pages/admin/AdminEditUserPage";
import AdminOrdersPage from "./pages/admin/AdminOrdersPage";
import AdminOrderDetailsPage from "./pages/admin/AdminOrderDetailsPage";
import AdminProductsPage from "./pages/admin/AdminProductsPage";
import AdminUsersPage from "./pages/admin/AdminUsersPage";
import HeaderComponent from "./components/HeaderComponent";
import FooterComponent from "./components/FooterComponent";
import RoutesWithUserChatComponent from "./components/user/RoutesWithUserChatComponent";

function App() {
  return (
    <BrowserRouter>
      <HeaderComponent />
      <Routes>
      <Route element={<ProtectedRoutesComponent admin={false}/>}>
          <Route path="/" element={<HomePage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/product-details" element={<LoginPage />} />
          <Route path="/product-details/:id" element={<ProductDetailsPage />} />
          <Route path="/product-list" element={<ProductListPage />} />
          <Route path="/product-list/category/:categoryname" element={<ProductListPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />

         
            <Route path="/user/cart-details" element={<UserCartDetailsPage />} />
            <Route path="/user/order-details/:id" element={<UserOrderDetailsPage />} />
            <Route path="/user/my-orders" element={<UserOrdersPage />} />
            <Route path="/user" element={<UserProfilePage />} />
          </Route>

          {/* <Route element={<ProtectedRoutesComponent admin={true}/>}> */}
            <Route path="/admin/analytics" element={<AdminAnalyticsPage />} />
            <Route path="/admin/chats" element={<AdminChatsPage />} />
            <Route path="/admin/create-new-product" element={<AdminCreateProductPage />} />
            <Route path="/admin/edit-product/:id" element={<AdminEditProductPage />} />
            <Route path="/admin/edit-user/:id" element={<AdminEditUserPage />} />
            <Route path="/admin/order-details/:id" element={<AdminOrderDetailsPage />} />
            <Route path="/admin/orders" element={<AdminOrdersPage />} />
            <Route path="/admin/products" element={<AdminProductsPage />} />
            <Route path="/admin/users" element={<AdminUsersPage />} />
          {/* </Route> */}
        
      </Routes>
      <FooterComponent />
    </BrowserRouter>
  );
}

export default App;
