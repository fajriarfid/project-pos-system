import { createContext, useContext, useReducer, useEffect } from "react";
import authReducer from "./reducer";
import { LOGIN, LOGOUT, UPDATE_PROFILE } from "./constants";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const initialState = {
    currentUser: null,
    isAuthenticated: false,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      dispatch({
        type: LOGIN,
        payload: JSON.parse(storedUser),
      });
    }
  }, []);

  const loginUser = async (email) => {
    // Bisa tambahkan password jika dibutuhkan
    const user = {
      id: 1,
      name: "Pelita Nur Zsa Zsa",
      email,
    };

    localStorage.setItem("user", JSON.stringify(user));

    dispatch({
      type: LOGIN,
      payload: user,
    });

    return user;
  };

  const logoutUser = () => {
    localStorage.removeItem("user");
    dispatch({ type: LOGOUT });
  };

  const updateUserProfile = (userData) => {
    const updatedUser = {
      ...state.currentUser,
      ...userData,
    };

    localStorage.setItem("user", JSON.stringify(updatedUser));

    dispatch({
      type: UPDATE_PROFILE,
      payload: userData,
    });
  };

  const value = {
    currentUser: state.currentUser,
    isAuthenticated: state.isAuthenticated,
    login: loginUser,
    logout: logoutUser,
    updateProfile: updateUserProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
