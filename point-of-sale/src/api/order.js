// Mock API functions for orders

const orders = [
  {
    id: 4,
    userId: 1,
    items: [
      { id: 6, name: "Tripple Burger", price: 33000, quantity: 4 },
      { id: 9, name: "Pizza", price: 31000, quantity: 3 },
    ],
    total: 230000,
    status: "waiting_payment",
    shippingAddress: {
      name: "Bandung",
      detail:
        "JAWA BARAT, KOTA BANDUNG, BOJONGKIDUL, CIBEUNYING WETAN, Sukaraja",
    },
    shippingCost: 20000,
    createdAt: new Date().toISOString(),
  },
];

export const createOrder = async (orderData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newOrder = {
        id: orders.length + 1,
        userId: 1,
        ...orderData,
        status: "waiting_payment",
        createdAt: new Date().toISOString(),
      };

      orders.push(newOrder);

      resolve(newOrder);
    }, 500);
  });
};

export const getOrders = async (userId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const userOrders = orders.filter((order) => order.userId === userId);
      resolve(userOrders);
    }, 500);
  });
};

export const getOrderById = async (orderId) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const order = orders.find((o) => o.id === Number.parseInt(orderId));
      if (order) {
        resolve(order);
      } else {
        reject(new Error("Order not found"));
      }
    }, 500);
  });
};

export const updateOrderStatus = async (orderId, status) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const orderIndex = orders.findIndex(
        (o) => o.id === Number.parseInt(orderId)
      );
      if (orderIndex !== -1) {
        orders[orderIndex].status = status;
        resolve(orders[orderIndex]);
      } else {
        reject(new Error("Order not found"));
      }
    }, 500);
  });
};
