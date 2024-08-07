import React, { Fragment } from "react";
import Users from "../../components/users/Users";
import CreateUsers from "../../components/createUsers/CreateUsers";
import Profile from "../../components/profile/Profile";

const Home = () => {
  return (
    <Fragment>
      <Users />
      <Profile />
    </Fragment>
  );
};

export default Home;
