import { useCart } from "../features/Cart/context";
import { ShoppingCart, Plus } from "react-feather";
import { useState } from "react";

const CardProduct = ({ product }) => {
  const { addToCart } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart(product);

    // Animation effect
    setTimeout(() => {
      setIsAdding(false);
    }, 500);
  };

  return (
    <div
      className="card"
      style={{
        height: "100%",
        transition: "transform 0.2s, box-shadow 0.2s",
        transform: isHovered ? "translateY(-4px)" : "translateY(0)",
        boxShadow: isHovered ? "var(--shadow-md)" : "var(--shadow)",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        style={{
          padding: "1rem",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "relative",
            flex: "1",
            display: "flex",
            justifyContent: "center",
            marginBottom: "1rem",
            overflow: "hidden",
            borderRadius: "var(--radius)",
          }}
        >
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            style={{
              width: "100%",
              height: "180px",
              objectFit: "cover",
              transition: "transform 0.3s",
              transform: isHovered ? "scale(1.05)" : "scale(1)",
            }}
          />

          {product.category && (
            <span
              className="badge badge-primary"
              style={{
                position: "absolute",
                top: "0.5rem",
                left: "0.5rem",
                zIndex: 1,
              }}
            >
              {product.category}
            </span>
          )}
        </div>

        <div>
          <h3
            style={{
              fontSize: "1rem",
              fontWeight: "600",
              marginBottom: "0.25rem",
              color: "var(--gray-800)",
            }}
          >
            {product.name}
          </h3>

          <div className="d-flex justify-between align-center mt-2">
            <p
              style={{
                fontWeight: "700",
                fontSize: "1.125rem",
                color: "var(--gray-900)",
              }}
            >
              Rp {product.price.toLocaleString()}
            </p>

            <button
              className="btn btn-primary"
              style={{
                padding: "0.5rem",
                borderRadius: "50%",
                width: "36px",
                height: "36px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "transform 0.2s",
                transform: isAdding ? "scale(0.9)" : "scale(1)",
              }}
              onClick={handleAddToCart}
            >
              {isAdding ? <ShoppingCart size={18} /> : <Plus size={18} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardProduct;
