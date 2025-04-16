// Mock API functions for cart

export const saveCart = async (cartItems, userId) => {
  // In a real app, this would make an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simulate saving cart to localStorage for persistence
      localStorage.setItem(
        "cart",
        JSON.stringify({ userId, items: cartItems })
      );

      resolve({
        success: true,
        message: "Cart saved successfully",
      });
    }, 500);
  });
};

export const getCart = async (userId) => {
  // In a real app, this would make an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      // Get from localStorage as a fallback
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        const cart = JSON.parse(savedCart);
        if (cart.userId === userId) {
          resolve(cart);
        } else {
          resolve({ items: [], total: 0 });
        }
      } else {
        resolve({ items: [], total: 0 });
      }
    }, 500);
  });
};
