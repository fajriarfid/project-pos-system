import { Link } from "react-router-dom";
import { useCart } from "../features/Cart/context";
import { useAuth } from "../features/Auth/context";
import { ShoppingCart, User, Search, Menu } from "react-feather";
import { useState } from "react";

const TopBar = () => {
  const { getCartCount } = useCart();
  const { currentUser: _currentUser } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (typeof getCartCount !== "function") {
    console.error("getCartCount is not a function:", getCartCount);
  }

  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div
        className="container d-flex justify-between align-center"
        style={{ height: "70px" }}
      >
        <div className="d-flex align-center gap-2">
          <button
            className="btn p-2 d-flex md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{ background: "transparent" }}
          >
            <Menu size={24} color="var(--gray-700)" />
          </button>

          <Link to="/home" className="d-flex align-center">
            <h1
              style={{
                fontWeight: "700",
                fontSize: "1.5rem",
                background:
                  "linear-gradient(90deg, var(--primary) 0%, var(--secondary) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              POS System
            </h1>
          </Link>
        </div>

        <div className="d-flex align-center gap-4">
          <div
            className="search-container"
            style={{ width: "400px", display: "none" }}
          >
            <div
              className="d-flex align-center"
              style={{ position: "relative" }}
            >
              <input
                type="text"
                placeholder="Cari barang..."
                className="form-control"
                style={{
                  width: "100%",
                  borderRadius: "9999px",
                  paddingLeft: "2.5rem",
                  paddingRight: "1rem",
                  backgroundColor: "var(--gray-100)",
                  border: "none",
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

          <Link
            to="/cart"
            className="d-flex align-center justify-center"
            style={{
              position: "relative",
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              backgroundColor: "var(--gray-100)",
              transition: "all 0.2s",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = "var(--gray-200)")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = "var(--gray-100)")
            }
          >
            <ShoppingCart size={20} color="var(--gray-700)" />
            {getCartCount() > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: "-5px",
                  right: "-5px",
                  background: "var(--primary)",
                  color: "white",
                  borderRadius: "50%",
                  width: "20px",
                  height: "20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.75rem",
                  fontWeight: "500",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                }}
              >
                {getCartCount()}
              </span>
            )}
          </Link>

          <Link
            to="/account"
            className="d-flex align-center justify-center"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              backgroundColor: "var(--gray-100)",
              transition: "all 0.2s",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = "var(--gray-200)")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = "var(--gray-100)")
            }
          >
            <User size={20} color="var(--gray-700)" />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
