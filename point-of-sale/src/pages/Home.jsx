import { useState, useEffect } from "react";
import TopBar from "../components/TopBar";
import CardProduct from "../components/CardProduct";
import CardProductPlaceholder from "../components/CardProductPlaceholder";
import { getProducts, getCategories } from "../api/product";
import { Search } from "react-feather";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [productsData, categoriesData] = await Promise.all([
          getProducts(),
          getCategories(),
        ]);

        setProducts(productsData);
        setFilteredProducts(productsData);
        setCategories(categoriesData);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Filter products based on category and search term
    let result = products;

    // Apply category filter
    if (selectedCategory !== "all") {
      result = result.filter(
        (product) => product.categoryId === selectedCategory
      );
    }

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(term) ||
          product.category.toLowerCase().includes(term)
      );
    }

    setFilteredProducts(result);
  }, [selectedCategory, searchTerm, products]);

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "var(--gray-50)",
      }}
    >
      <TopBar />

      <div className="container" style={{ flex: 1, padding: "1.5rem 1rem" }}>
        <div className="d-flex justify-between align-center mb-4">
          <h2 style={{ fontSize: "1.5rem", fontWeight: "600" }}>Products</h2>

          <div className="search-container" style={{ width: "300px" }}>
            <div
              className="d-flex align-center"
              style={{ position: "relative" }}
            >
              <input
                type="text"
                placeholder="Search products..."
                className="form-control"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: "100%",
                  borderRadius: "9999px",
                  paddingLeft: "2.5rem",
                  paddingRight: "1rem",
                  backgroundColor: "white",
                  border: "1px solid var(--gray-200)",
                }}
              />
              <Search
                size={18}
                style={{
                  position: "absolute",
                  left: "0.75rem",
                  color: "var(--gray-500)",
                }}
              />
            </div>
          </div>
        </div>

        <div className="d-flex gap-4" style={{ alignItems: "flex-start" }}>
          <div style={{ width: "250px" }}>
            <div className="card">
              <div className="p-4">
                <h3
                  className="mb-3"
                  style={{ fontSize: "1.125rem", fontWeight: "600" }}
                >
                  Kategori
                </h3>
                <ul style={{ listStyle: "none", padding: 0 }}>
                  <li className="mb-2">
                    <button
                      className={`d-block p-3 w-100 text-left ${
                        selectedCategory === "all" ? "bg-primary-light" : ""
                      }`}
                      style={{
                        borderRadius: "var(--radius)",
                        border: "none",
                        background:
                          selectedCategory === "all"
                            ? "var(--primary-light)"
                            : "transparent",
                        width: "100%",
                        color:
                          selectedCategory === "all"
                            ? "var(--primary)"
                            : "var(--gray-700)",
                        fontWeight: selectedCategory === "all" ? "500" : "400",
                        transition: "all 0.2s",
                      }}
                      onClick={() => handleCategorySelect("all")}
                    >
                      Semua
                    </button>
                  </li>
                  {categories.map((category) => (
                    <li key={category.id} className="mb-2">
                      <button
                        className={`d-block p-3 w-100 text-left ${
                          selectedCategory === category.id
                            ? "bg-primary-light"
                            : ""
                        }`}
                        style={{
                          borderRadius: "var(--radius)",
                          border: "none",
                          background:
                            selectedCategory === category.id
                              ? "var(--primary-light)"
                              : "transparent",
                          width: "100%",
                          color:
                            selectedCategory === category.id
                              ? "var(--primary)"
                              : "var(--gray-700)",
                          fontWeight:
                            selectedCategory === category.id ? "500" : "400",
                          transition: "all 0.2s",
                        }}
                        onClick={() => handleCategorySelect(category.id)}
                      >
                        {category.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div style={{ flex: 1 }}>
            {filteredProducts.length === 0 && !loading ? (
              <div className="card p-5 text-center">
                <p>No products found. Try a different search or category.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {loading
                  ? Array(8)
                      .fill()
                      .map((_, index) => <CardProductPlaceholder key={index} />)
                  : filteredProducts.map((product) => (
                      <CardProduct key={product.id} product={product} />
                    ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
