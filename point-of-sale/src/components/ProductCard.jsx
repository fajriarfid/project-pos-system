import { useCart } from "../contexts/CartContext";
import { ShoppingCart } from "react-feather";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="card" style={{ height: "100%" }}>
      <div
        style={{
          padding: "1rem",
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <div
          style={{
            flex: "1",
            display: "flex",
            justifyContent: "center",
            marginBottom: "1rem",
          }}
        >
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            style={{ width: "100%", height: "150px", objectFit: "contain" }}
          />
        </div>

        <div>
          <h3 style={{ fontSize: "1.1rem", marginBottom: "0.25rem" }}>
            {product.name}
          </h3>
          <p
            style={{
              fontSize: "0.9rem",
              color: "#666",
              marginBottom: "0.5rem",
            }}
          >
            {product.category}
          </p>

          <div className="d-flex justify-between align-center">
            <p style={{ fontWeight: "bold" }}>
              Rp {product.price.toLocaleString()}
            </p>
            <button
              className="btn btn-primary"
              style={{ padding: "0.5rem", borderRadius: "4px" }}
              onClick={() => addToCart(product)}
            >
              <ShoppingCart size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
