const cohort = "2303-FTB-MT-WEB-FT";
const BASE_URL = `https://strangers-things.herokuapp.com/api/${cohort}`;

export const registerUser = async (username, password) => {
  try {
    const response = await fetch(`${BASE_URL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          username,
          password,
        },
      }),
    });
    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error.message || 'Something went wrong');
    }

    const {
      data: { token },
    } = result;
    localStorage.setItem("token", token);
    return token;
  } catch (error) {
    console.error(error);
    throw error;
  }

};

export const loginUser = async (username, password) => {
  try {
    const response = await fetch(`${BASE_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          username,
          password,
        },
      }),
    });
    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error.message || 'Something went wrong');
    }

    const {
      data: { token },
    } = result;
    localStorage.setItem("token", token);
    return token;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const fetchMe = async (token) => {
  try {
    const response = await fetch(`${BASE_URL}/users/me`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error.message || 'Something went wrong');
    }

    console.log(result);
    return result;
  } catch (error) {
    console.error(error);
  }
};
export const logout = (setToken, setUser) => {
  localStorage.removeItem("token");
  setToken(null);
  setUser({});
};