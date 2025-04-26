// Mock API Function
export const saveCart = async (cartItems, userId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
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
  return new Promise((resolve) => {
    setTimeout(() => {
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
