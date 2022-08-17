import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

// sessionStorage.setItem("type", 0);

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div>
      {(() => {
        if (!sessionStorage.getItem("type") || sessionStorage.getItem("type") == 0) {
          return (
            <Box sx={{ flexGrow: 1 }}>
              <AppBar position="static">
                <Toolbar>
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{ cursor: "pointer" }}
                    onClick={() => navigate("/")}
                  >
                    Canteen Portal
                  </Typography>
                  <Box sx={{ flexGrow: 1 }} />
                  <Button color="inherit" onClick={() => navigate("/users")}>
                    Users0
                  </Button>
                  <Button color="inherit" onClick={() => navigate("/register")}>
                    Register
                  </Button>
                  <Button color="inherit" onClick={() => navigate("/login")}>
                    Login
                  </Button>
                </Toolbar>
              </AppBar>
            </Box>
          )
        } else if (sessionStorage.getItem("type") == 1) {
          return (
            <Box sx={{ flexGrow: 1 }}>
              <AppBar position="static">
                <Toolbar>
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{ cursor: "pointer" }}
                    onClick={() => navigate("/")}
                  >
                    Canteen Portal
                  </Typography>
                  <Box sx={{ flexGrow: 1 }} />
                  <Button color="inherit" onClick={() => navigate("/VendorProfile")}>
                    Profile
                  </Button>
                  <Button color="inherit" onClick={() => navigate("/VendorDashboard")}>
                    Dashboard
                  </Button>
                  <Button color="inherit" onClick={() => navigate("/VendorOrders")}>
                    Orders
                  </Button>
                  <Button color="inherit" onClick={() => navigate("/VendorStatistics")}>
                    Statistics
                  </Button>
                  <Button color="inherit" onClick={() => { navigate("/login"); sessionStorage.setItem("type", 0); }}>
                    Logout
                  </Button>
                </Toolbar>
              </AppBar>
            </Box>
          )
        } else if (sessionStorage.getItem("type") == 2) {
          return (
            <Box sx={{ flexGrow: 1 }}>
              <AppBar position="static">
                <Toolbar>
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{ cursor: "pointer" }}
                    onClick={() => navigate("/")}
                  >
                    Canteen Portal
                  </Typography>
                  <Box sx={{ flexGrow: 1 }} />
                  <Button color="inherit" onClick={() => navigate("/BuyerProfile")}>
                    Profile
                  </Button>
                  <Button color="inherit" onClick={() => navigate("/BuyerDashboard")}>
                    Dashboard
                  </Button>
                  <Button color="inherit" onClick={() => navigate("/BuyerOrders")}>
                    My Orders
                  </Button>
                  <Button color="inherit" onClick={() => { navigate("/login"); sessionStorage.setItem("type", 0); }}>
                    Logout
                  </Button>
                </Toolbar>
              </AppBar>
            </Box>
          )
        }
      })()}
    </div >
  );
};
export default Navbar;
