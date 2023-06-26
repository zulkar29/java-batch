import axios from "./axiosConfig";
const login = async ({ email, password }) => {
  try {
    const user = await axios.post("/v1/login", {
      email,
      password,
    });
    return user.data;
  } catch (error) {
    throw error.response.data.error || "Something went wrong, please try again";
  }
};

export { login };
