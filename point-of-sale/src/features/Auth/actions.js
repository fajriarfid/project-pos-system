import { LOGIN, LOGOUT, UPDATE_PROFILE } from "./constants";
import { login as apiLogin } from "../../api/auth";

export const login = (email, password) => {
  return async (dispatch) => {
    try {
      const user = await apiLogin(email, password);

      localStorage.setItem("user", JSON.stringify(user));

      dispatch({
        type: LOGIN,
        payload: user,
      });

      return user;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };
};

export const logout = () => {
  localStorage.removeItem("user");

  return {
    type: LOGOUT,
  };
};

export const updateProfile = (userData) => {
  return {
    type: UPDATE_PROFILE,
    payload: userData,
  };
};
