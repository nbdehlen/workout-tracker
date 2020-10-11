import { FETCH_USERS } from './actionTypes';

export const fetchUsers = (token) => ({
  type: FETCH_USERS,
  request: {
    url: 'http://localhost:5000/api/v1/admin',
    method: 'GET',
    headers: { 'x-access-token': token },
  },
});
