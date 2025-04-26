import { useState, useEffect } from "react";
import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import CategorySidebar from "../components/CategorySidebar";
import { productsData } from "../data/products";
import { categoriesData } from "../data/categories";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    // Simulasi fetch data produk
    setProducts(productsData);
    setFilteredProducts(productsData);
  }, []);

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);

    if (categoryId === "all") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(
        (product) => product.categoryId === categoryId
      );
      setFilteredProducts(filtered);
    }
  };

  return (
    <div
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <Header />

      <div className="container" style={{ flex: 1, padding: "2rem 1rem" }}>
        <div className="d-flex gap-4" style={{ alignItems: "flex-start" }}>
          {/* Sidebar Kategori */}
          <div style={{ width: "250px" }}>
            <CategorySidebar
              categories={categoriesData}
              selectedCategory={selectedCategory}
              onSelectCategory={handleCategorySelect}
            />
          </div>

          {/* Produk */}
          <div style={{ flex: 1 }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                gap: "1rem",
              }}
            >
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))
              ) : (
                <p>Tidak ada produk dalam kategori ini.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
