// Mock API
export const login = async (email, password) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const isValid = password.length > 0;

      resolve({
        id: 1,
        name: "Fajri",
        email,
        isValid,
      });
    }, 500);
  });
};

export const register = async (userData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: 1,
        name: userData.name,
        email: userData.email,
      });
    }, 500);
  });
};

export const updateUserProfile = async (userId, userData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: userId,
        ...userData,
      });
    }, 500);
  });
};
