import React, { useState } from "react";
import SCUser from "../user/User";

const SCUsers = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      firstname: "Bingo",
      lastname: "Bongo",
      email: "bingo.bongo@gmail.com",
    },
    {
      id: 2,
      firstname: "Bingo",
      lastname: "Bongo",
      email: "bingo.bongo@gmail.com",
    },
    {
      id: 3,
      firstname: "Bingo",
      lastname: "Bongo",
      email: "bingo.bongo@gmail.com",
    },
  ]);

  const deleteUserHandler = (id: number) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <ul>
      {users.map((user) => (
        <SCUser
          key={user.id}
          id={user.id}
          firstname={user.firstname}
          lastname={user.lastname}
          email={user.email}
          deleteUserHandler={deleteUserHandler}
        />
      ))}
    </ul>
  );
};

export default SCUsers;
