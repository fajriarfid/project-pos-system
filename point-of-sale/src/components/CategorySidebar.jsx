import { useState } from "react";

const CategorySidebar = ({ categories, onSelectCategory }) => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    onSelectCategory(category);
  };

  return (
    <div className="card" style={{ width: "100%" }}>
      <div className="p-4">
        <h3 className="mb-4">Kategori</h3>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li className="mb-2">
            <button
              className={`d-block p-2 w-100 text-left ${
                selectedCategory === "all" ? "bg-blue-600 text-white" : ""
              }`}
              style={{
                borderRadius: "4px",
                border: "none",
                background:
                  selectedCategory === "all" ? "#0066ff" : "transparent",
                width: "100%",
              }}
              onClick={() => handleCategoryClick("all")}
            >
              Semua
            </button>
          </li>
          {categories.map((category) => (
            <li key={category.id} className="mb-2">
              <button
                className={`d-block p-2 w-100 text-left ${
                  selectedCategory === category.id
                    ? "bg-blue-600 text-white"
                    : ""
                }`}
                style={{
                  borderRadius: "4px",
                  border: "none",
                  background:
                    selectedCategory === category.id
                      ? "#0066ff"
                      : "transparent",
                  width: "100%",
                }}
                onClick={() => handleCategoryClick(category.id)}
              >
                {category.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CategorySidebar;
