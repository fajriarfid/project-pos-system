// Mock API functions for authentication

export const login = async (email, password) => {
  // In a real app, this would make an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      // Dummy password check (just to use the variable)
      const isValid = password.length > 0;

      resolve({
        id: 1,
        name: "Fajri",
        email,
        isValid, // Optional, to simulate password validation
      });
    }, 500);
  });
};

export const register = async (userData) => {
  // In a real app, this would make an API call
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
  // In a real app, this would make an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: userId,
        ...userData,
      });
    }, 500);
  });
};
