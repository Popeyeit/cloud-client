import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import UserService from "../services/UserService";
import { logoutOperation } from "../store/user";
function Home() {
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  console.log(users);
  return <div></div>;
}

export default Home;
