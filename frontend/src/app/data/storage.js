import AsyncStorage from "@react-native-async-storage/async-storage";


// --------------------------------------------------
// SAVE USER
// --------------------------------------------------

export const saveUser = async (user) => {
  const existingUsers =
    await AsyncStorage.getItem("users");

  const users = existingUsers
    ? JSON.parse(existingUsers)
    : [];

  users.push(user);

  await AsyncStorage.setItem(
    "users",
    JSON.stringify(users)
  );
};


// --------------------------------------------------
// GET USERS
// --------------------------------------------------

export const getUsers = async () => {
  const users =
    await AsyncStorage.getItem("users");

  return users
    ? JSON.parse(users)
    : [];
};


// --------------------------------------------------
// SAVE LOGGED-IN USER
// --------------------------------------------------

export const saveLoggedInUser = async (user) => {
  await AsyncStorage.setItem(
    "loggedInUser",
    JSON.stringify(user)
  );
};


// --------------------------------------------------
// GET LOGGED-IN USER
// --------------------------------------------------

export const getLoggedInUser = async () => {
  const user =
    await AsyncStorage.getItem("loggedInUser");

  return user
    ? JSON.parse(user)
    : null;
};


// --------------------------------------------------
// LOGOUT
// --------------------------------------------------

export const logoutUser = async () => {
  await AsyncStorage.removeItem(
    "loggedInUser"
  );
};