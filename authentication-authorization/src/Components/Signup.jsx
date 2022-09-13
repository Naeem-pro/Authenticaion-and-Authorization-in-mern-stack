import React, { useState } from "react";
import { Box } from "@mui/system";
import { Button, TextField, Typography } from "@mui/material";
const Signup = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    console.log("sunmit");
    console.log(data);
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
