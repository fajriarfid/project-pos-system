// Mock API functions for products

const products = [
  {
    id: 1,
    name: "Toast",
    price: 12000,
    image: "images/toast.jpg",
    categoryId: "bread",
    category: "Utama",
  },
  {
    id: 2,
    name: "Bread Bundle",
    price: 42000,
    image: "images/bread bundle.jpg",
    categoryId: "bread",
    category: "Utama",
  },
  {
    id: 3,
    name: "Pita Bread",
    price: 14000,
    image: "images/pita bread.jpg",
    categoryId: "bread",
    category: "Utama",
  },
  {
    id: 4,
    name: "Sour Dough",
    price: 11000,
    image: "images/sourdough.jpg",
    categoryId: "bread",
    category: "Utama",
  },
  {
    id: 5,
    name: "Burger",
    price: 18000,
    image: "images/burger.jpg",
    categoryId: "burger",
    category: "Utama",
  },
  {
    id: 6,
    name: "Tripple Burger",
    price: 33000,
    image: "images/trippleburger.jpg",
    categoryId: "burger",
    category: "Utama",
  },
  {
    id: 7,
    name: "Burger Package",
    price: 51000,
    image: "images/burgerpackage.jpg",
    categoryId: "burger",
    category: "Utama",
  },
  {
    id: 8,
    name: "Hot Americano",
    price: 14000,
    image: "images/americano.jpg",
    categoryId: "drink",
    category: "Minuman",
  },
  {
    id: 9,
    name: "Pizza",
    price: 31000,
    image: "images/pizza.jpg",
    categoryId: "pizza",
    category: "Utama",
  },
];

export const getProducts = async () => {
  // In a real app, this would make an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(products);
    }, 500);
  });
};

export const getProductById = async (productId) => {
  // In a real app, this would make an API call
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const product = products.find((p) => p.id === productId);
      if (product) {
        resolve(product);
      } else {
        reject(new Error("Product not found"));
      }
    }, 500);
  });
};

export const getCategories = async () => {
  // In a real app, this would make an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: "bread",
          name: "Roti",
        },
        {
          id: "burger",
          name: "Burger",
        },
        {
          id: "pizza",
          name: "Pizza",
        },
        {
          id: "drink",
          name: "Minuman",
        },
        {
          id: "pastry",
          name: "Pastry",
        },
      ]);
    }, 500);
  });
};
