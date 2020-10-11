import { FETCH_USERS, DELETE_USER } from './actionTypes';

export const fetchUsers = (token) => ({
  type: FETCH_USERS,
  request: {
    url: 'http://localhost:5000/api/v1/admin',
    method: 'GET',
    headers: { 'x-access-token': token },
  },
});

export const deleteUser = (token, id) => ({
  type: DELETE_USER,
  request: {
    url: `http://localhost:5000/api/v1/admin/${id}`,
    method: 'DELETE',
    headers: { 'x-access-token': token },
  },
});
