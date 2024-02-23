import axios from "axios";
import React, { useEffect, useState } from "react";

export const Home = () => {
  const [users, setUsers] = useState();

  useEffect(() => {
    console.log("useefect");
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  console.log("Sta");
  return (
    <>
      {users && (
        <div>
          <h1>User List</h1>
          <ul>
            {users.map((user) => (
              <li key={user.id}>
                <p>ID: {user.id}</p>
                <p>First Name: {user.firstname}</p>
                <p>Last Name: {user.lastname}</p>
                <p>Location: {user.location}</p>
                <hr />
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};
