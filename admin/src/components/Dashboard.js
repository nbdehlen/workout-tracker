import React, { useState, useEffect } from "react";
import { FETCH_USERS } from "../redux/requests/actionTypes";
import { useDispatch, useSelector } from "react-redux";
import { Query, Mutation } from "@redux-requests/react";
import { fetchUsers } from "../redux/requests/action";
import Users from "./Users";
import axios from "axios";
import UserDetails from "../components/UserDetails";

const RequestError = () => (
  <p>An error occured while fetching workouts. Please try again.</p>
);

export const Dashboard = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user);
  // console.log(auth.xAccessToken);

  useEffect(() => {
    dispatch(fetchUsers(auth.xAccessToken));
  }, [auth, user]);

  return (
    <>
      {user?.isEditing ? (
        <UserDetails />
      ) : (
        <Query
          type={FETCH_USERS}
          errorComponent={RequestError}
          noDataMessage={<p>There is no entity currently.</p>}
        >
          {({ data }) => <Users data={data} />}
        </Query>
      )}
    </>
  );
};

export default Dashboard;
