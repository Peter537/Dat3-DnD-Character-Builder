const URL = import.meta.env.VITE_SERVER_URL;

function handleHttpErrors(res) {
  if (!res.ok) {
    return Promise.reject({ status: res.status, fullError: res.json() });
  }
  return res.json();
}

function apiFacade() {
  const login = async (user, password) => {
    const options = makeOptions("POST", true, {
      username: user,
      password: password,
    });
    const res = await fetch(URL + "/api/v1/auth/login", options);
    const res_1 = await handleHttpErrors(res);
    return res_1.token;
  };

  const fetchData = async () => {
    const options = makeOptions("GET", true);
    return fetch(URL + "/api/v1/", options).then(handleHttpErrors);
  };

  const makeOptions = (method, addToken, body) => {
    var opts = {
      method: method,
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
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
    fetchData,
  };
}

const facade = apiFacade();
export default facade;
