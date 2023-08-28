import React, { useEffect, useState } from "react";

const ListUsers = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://playground.4geeks.com/apis/fake/todos/", {
      method: GET,
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setData(response);
      });
  }, []);

  return (
    <div>
      <h1>User list</h1>
    </div>
  );
};

export default ListUsers;
