import { FETCH_USERS, DELETE_USER, EDIT_USER, ADD_USER } from "./actionTypes";

export const fetchUsers = (token) => ({
  type: FETCH_USERS,
  request: {
    url: `${process.env.REACT_APP_BASE_API_URL}/api/v1/admin`,
    method: "GET",
    headers: { "x-access-token": token },
  },
});

export const deleteUser = (token, id) => ({
  type: DELETE_USER,
  request: {
    url: `${process.env.REACT_APP_BASE_API_URL}/api/v1/admin/${id}`,
    method: "DELETE",
    headers: { "x-access-token": token },
  },
});

export const editUser = (token, id, username, email) => ({
  type: EDIT_USER,
  request: {
    url: `${process.env.REACT_APP_BASE_API_URL}/api/v1/admin/${id}`,
    method: "PATCH",
    data: {
      username: username,
      email: email,
    },
    headers: { "x-access-token": token },
  },
});

export const addUser = (token, username, email, password) => ({
  type: ADD_USER,
  request: {
    url: `${process.env.REACT_APP_BASE_API_URL}/api/v1/admin/`,
    method: "POST",
    data: {
      username: username,
      email: email,
      password: password,
    },
    headers: { "x-access-token": token },
  },
});
