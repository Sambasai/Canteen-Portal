import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import "./App.css";

import UsersList from "./components/users/UsersList";
import Home from "./components/common/Home";
import Register from "./components/common/Register";
import Login from "./components/common/Login";
import Navbar from "./components/templates/Navbar";
import Profile from "./components/users/Profile";
import RegBuyer from "./components/common/Register_Buyer"
import RegVendor from "./components/common/Register_Vendor"
import Buyer from "./components/common/Buyer"
import BuyerProfile from "./components/common/Buyer_Profile"
import BuyerDashboard from "./components/common/Buyer_Dashboard"
import VendorDashboard from "./components/common/Vendor_Dashboard"
import BuyerOrders from "./components/common/Buyer_Orders"
import VendorOrders from "./components/common/Vendor_Orders"
import VendorProfile from "./components/common/Vendor_Profile"
import VendorStatistics from "./components/common/Vendor_Statistics"
import Vendor from "./components/common/Vendor"

const Layout = () => {
  return (
    <div>
      <Navbar />
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="users" element={<UsersList />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="register/Buyer" element={<RegBuyer />} />
          <Route path="register/Vendor" element={<RegVendor />} />
          <Route path="Buyer" element={<Buyer />} />
          <Route path="BuyerProfile" element={<BuyerProfile />} />
          <Route path="BuyerDashboard" element={<BuyerDashboard />} />
          <Route path="BuyerOrders" element={<BuyerOrders />} />
          <Route path="Vendor" element={<Vendor />} />
          <Route path="VendorProfile" element={<VendorProfile />} />
          <Route path="VendorDashboard" element={<VendorDashboard />} />
          <Route path="VendorOrders" element={<VendorOrders />} />
          <Route path="VendorStatistics" element={<VendorStatistics />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
