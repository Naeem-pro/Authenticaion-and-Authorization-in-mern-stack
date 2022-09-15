import React, { useState, useEffect } from "react";
import axios from "axios";
axios.defaults.withCredentials = true;
let firstRender = true;
const Welcome = () => {
  const [user, setUser] = useState({});
  useEffect(() => {
    const refreshUser = async () => {
      let response = await axios.get("http://localhost:4000/api/refresh", {
        withCredentials: true,
      });
      setUser(response.data);
    };
    const getUser = async () => {
      let response = await axios.get("http://localhost:4000/api/user", {
        withCredentials: true,
      });
      setUser(response.data);
    };
    if (firstRender) {
      getUser();
      firstRender = false;
    }
    let interval = setInterval(() => {
      refreshUser();
    }, 1000 * 28);
    return () => clearInterval(interval);
  }, []);
  return <>{user && <h1>{user.name}</h1>}</>;
};

export default Welcome;
