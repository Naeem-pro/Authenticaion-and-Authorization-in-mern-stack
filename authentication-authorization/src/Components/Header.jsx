import React, { useState, useContext } from "react";
import axios from "axios";
import { AppBar, Tab, Tabs, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Link, useNavigate } from "react-router-dom";
import { ValidAuth } from "../ContextApi/AuthProvider";
axios.defaults.withCredentials = true;
const Header = () => {
  const [value, setValue] = useState();
  const { account, setAccount } = useContext(ValidAuth);
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      let response = await axios.get("http://localhost:4000/api/logout", {
        withCredentials: true,
      });
      setAccount({
        isLoggedin: false,
        isLoggedout: true,
      });
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h3">Mern Auth</Typography>
          <Box sx={{ marginLeft: "auto" }}>
            <Tabs
              indicatorColor="secondary"
              onChange={(e, val) => setValue(val)}
              value={value}
              textColor="inherit"
            >
              {!account.isLoggedin && (
                <>
                  <Tab to="/login" LinkComponent={Link} label="login" />
                  <Tab to="/signup" LinkComponent={Link} label="signup" />
                </>
              )}
              {account.isLoggedin && (
                <Tab
                  to="/logout"
                  LinkComponent={Link}
                  label="logout"
                  onClick={handleLogout}
                />
              )}
            </Tabs>
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
