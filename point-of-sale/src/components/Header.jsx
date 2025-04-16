import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";
import { ShoppingCart, User } from "react-feather";

const Header = () => {
  const { getCartCount } = useCart();
  const { currentUser: _currentUser } = useAuth();

  return (
    <header className="bg-blue-600 text-white">
      <div
        className="container d-flex justify-between align-center"
        style={{ height: "60px" }}
      >
        <Link to="/products" className="d-flex align-center">
          <h1 style={{ fontWeight: "bold", fontSize: "1.5rem" }}>POS</h1>
        </Link>

        <div className="d-flex align-center gap-4">
          <div className="search-container" style={{ width: "400px" }}>
            <input
              type="text"
              placeholder="Cari barang..."
              className="form-control"
              style={{ width: "100%", borderRadius: "4px" }}
            />
          </div>

          <Link
            to="/cart"
            className="d-flex align-center"
            style={{ position: "relative" }}
          >
            <ShoppingCart size={24} />
            {getCartCount() > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: "-8px",
                  right: "-8px",
                  background: "red",
                  color: "white",
                  borderRadius: "50%",
                  width: "20px",
                  height: "20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "12px",
                }}
              >
                {getCartCount()}
              </span>
            )}
          </Link>

          <Link to="/account" className="d-flex align-center">
            <User size={24} />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
