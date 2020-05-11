const axios = require("axios");

const loginTest = async (userData) => {
  console.log("logging in...", userData);
  return 200;
};

const registerUser = async (userData) => {
  // console.log('registering...', userData)
  // return 200;
  const response = await fetch(`user/register`, {
    method: "POST",
    headers: {
      //'Accept': 'application/json',
      "Content-Type": "application/json",
      // 'Authorization': `Bearer ${credentials.sessionToken}`
    },
    credentials: "same-origin",
    body: JSON.stringify({
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      password: userData.password,
    }),
  });
  let responseJson = await response.json();
  console.log("reg response", response, responseJson);
  responseJson.status = response.status;
  return responseJson;
};

const test = async () => {
  console.log("Frontend test running");
  const response = await fetch("/test", {
    method: "GET",
    // headers: {
    //   'Accept': 'application/json',
    //   'Content-Type': 'application/json'
    // },
    // credentials: 'same-origin'
  });
  let jsonRes = await response.json();
  console.log("jsonRes:", jsonRes);
  return jsonRes;
};

const login = async (loginData) => {
  const response = await fetch(`user/login`, {
    method: "POST",
    headers: {
      //'Accept': 'application/json',
      "Content-Type": "application/json",
      // 'Authorization': `Bearer ${credentials.sessionToken}`
    },
    credentials: "same-origin",
    body: JSON.stringify({
      email: loginData.email,
      password: loginData.password,
    }),
  });
  let responseJson = await response.json();
  console.log("login response", response, responseJson);
  responseJson.status = response.status;
  return responseJson;
};

export { login, test, registerUser };
