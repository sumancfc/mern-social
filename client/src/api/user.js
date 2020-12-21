//create user
export const createUser = async (user) => {
  try {
    const response = await fetch("/api/user/signup", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

//get users
export const getUsers = async (signal) => {
  try {
    const response = await fetch("/api/users/", {
      method: "GET",
      signal: signal,
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

//get user by id
export const getUserById = async (userId, authtoken, signal) => {
  try {
    const response = await fetch("/api/user/" + userId, {
      method: "GET",
      signal: signal,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + authtoken.t,
      },
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

//update user
export const updateUser = async (userId, authtoken, user) => {
  try {
    const response = await fetch("/api/user/" + userId, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + authtoken.t,
      },
      body: JSON.stringify(user),
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

//delete User
export const deleteUser = async (userId, authtoken) => {
  try {
    const response = await fetch("/api/user/" + userId, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + authtoken.t,
      },
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};
