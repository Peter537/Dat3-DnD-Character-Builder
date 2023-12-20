const URL = import.meta.env.VITE_SERVER_URL;

function handleHttpErrors(res) {
  if (!res.ok) {
    return Promise.reject({ status: res.status, fullError: res.json() });
  }
  return res.json();
}

function apiFacade() {
  const login = async (email, password) => {
    const options = makeOptions("POST", false, {
      email: email,
      password: password,
    });
    const res = await fetch(URL + "/api/v1/auth/login", options);
    const res_1 = await handleHttpErrors(res);
    return res_1.token;
  };

  const register = async (email, username, password) => {
    const options = makeOptions("POST", false, {
      email: email,
      username: username,
      password: password,
    });
    const res = await fetch(URL + "/api/v1/auth/register", options);
    const res_1 = await handleHttpErrors(res);
    return res_1.token;
  };

  const updateUser = async (id, user) => {
    const options = makeOptions("PUT", true, user);
    const res = await fetch(URL + "/api/v1/users/" + id, options);
    const res_1 = await handleHttpErrors(res);
    return res_1;
  };

  const fetchData = async (route, addToken) => {
    const options = makeOptions("GET", addToken || true);
    return fetch(URL + "/api/v1/" + route, options).then(handleHttpErrors);
  };

  const makeOptions = (method, addToken, body) => {
    var opts = {
      method: method,
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
    };
    if (addToken && loggedIn()) {
      opts.headers["Authentication"] = `Baerer ${getToken()}`;
    }
    if (body) {
      opts.body = JSON.stringify(body);
    }
    return opts;
  };

  const getToken = () => {
    var token;

    if (localStorage.getItem("token")) {
      token = localStorage.getItem("token");
    } else if (sessionStorage.getItem("token")) {
      token = sessionStorage.getItem("token");
    } else {
      return null;
    }

    return token;
  };

  const loggedIn = () => {
    const loggedIn = getToken() != null;
    console.log(URL);
    return loggedIn;
  };

  return {
    makeOptions,
    getToken,
    loggedIn,
    login,
    register,
    fetchData,
    updateUser,
  };
}

const facade = apiFacade();
export default facade;
