import {
  BASE_URL,
  GET_USERS,
  DELETE_AND_UPDATE_USER,
  SIGNUP,
} from "./Constants";

export const getUsersList = async () => {
  return await fetch(BASE_URL + GET_USERS)
    .then((res) => res.json())
    .then(
      (result) => {
        return result;
      },
      (error) => {
        return error;
      }
    );
};

export const signup = async (usersData) => {
  return await fetch(BASE_URL + SIGNUP, {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      firstName: usersData.firstName,
      lastName: usersData.lastName,
      password: usersData.password,
      email: usersData.email,
    }),
  })
    .then((res) => res.json())
    .then(
      (result) => {
        return result;
      },
      (error) => {
        return error;
      }
    );
};

export const updateUser = async (id, usersData) => {
  return await fetch(BASE_URL + DELETE_AND_UPDATE_USER + id, {
    method: "PUT",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      firstName: usersData.firstName,
      lastName: usersData.lastName,
      password: usersData.password,
      email: usersData.email,
    }),
  })
    .then((res) => res.json())
    .then(
      (result) => {
        return result;
      },
      (error) => {
        return error;
      }
    );
};

export const deleteUser = async (id) => {
  return await fetch(BASE_URL + DELETE_AND_UPDATE_USER + id, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then(
      (result) => {
        return result;
      },
      (error) => {
        return error;
      }
    );
};
