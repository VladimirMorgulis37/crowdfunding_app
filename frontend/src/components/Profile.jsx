import React, { useState, useEffect } from "react";
import AuthService from "../services/auth.service";

const Profile = () => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  if (!currentUser) {
    return <div>Loading...</div>; // или другой контент, пока пользователь не загрузился
  }

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          Профиль пользователя <strong>{currentUser.username}</strong>
        </h3>
      </header>
      <p>
        <strong>Token:</strong> {currentUser.accessToken.substring(0, 20)} ...{" "}
        {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
      </p>
      <p>
        <strong>Id:</strong> {currentUser.id}
      </p>
      <p>
        <strong>Email:</strong> {currentUser.email}
      </p>
      <strong>Права доступа:</strong>
      <ul>
        {currentUser.roles &&
          currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
      </ul>
    </div>
  );
};

export default Profile;