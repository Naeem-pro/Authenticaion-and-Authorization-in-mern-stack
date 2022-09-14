import React, { useState, useEffect } from "react";
import axios from "axios";
axios.defaults.withCredentials = true;
const Welcome = () => {
  const [user, setUser] = useState({});
  useEffect(() => {
    const getUser = async () => {
      let response = await axios.get("http://localhost:4000/api/user", {
        withCredentials: true,
      });
      setUser(response.data);
    };
    getUser();
  }, []);
  return <>{user && <h1>{user.name}</h1>}</>;
};

export default Welcome;
