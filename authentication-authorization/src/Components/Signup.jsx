import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Box } from "@mui/system";
import { Button, TextField, Typography } from "@mui/material";
const Signup = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      let response = await axios.post("http://localhost:4000/api/signup", data);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form>
        <Box
          marginLeft="auto"
          marginRight="auto"
          width="300px"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Typography variant="h2">Signup</Typography>
          <TextField
            name="name"
            value={data.name}
            onChange={handleChange}
            type="text"
            variant="outlined"
            placeholder="Name"
            margin="normal"
          />
          <TextField
            name="email"
            value={data.email}
            onChange={handleChange}
            type="email"
            variant="outlined"
            placeholder="E-mail"
            margin="normal"
          />
          <TextField
            name="password"
            value={data.password}
            onChange={handleChange}
            type="password"
            variant="outlined"
            placeholder="Password"
            margin="normal"
          />
          <Button variant="contained" type="submit" onClick={handlesubmit}>
            Signup
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default Signup;
