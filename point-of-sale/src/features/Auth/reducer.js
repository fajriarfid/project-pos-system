import { LOGIN, LOGOUT, UPDATE_PROFILE } from "./constants";

const initialState = {
  currentUser: null,
  isAuthenticated: false,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        currentUser: action.payload,
        isAuthenticated: true,
      };

    case LOGOUT:
      return {
        ...state,
        currentUser: null,
        isAuthenticated: false,
      };

    case UPDATE_PROFILE:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          ...action.payload,
        },
      };

    default:
      return state;
  }
}
