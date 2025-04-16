import { useNavigate } from "react-router-dom";
import TopBar from "../components/TopBar";
import { useCart } from "../features/Cart/context";
import { Plus, Minus, Trash2, ShoppingBag, ArrowRight } from "react-feather";
import BreadCrumb from "../components/BreadCrumb";

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, getCartTotal } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate("/checkout");
  };

  if (cartItems.length === 0) {
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
          <BreadCrumb
            items={[{ label: "Home", link: "/home" }, { label: "Cart" }]}
          />

          <div className="card p-5 text-center mt-4">
            <div style={{ marginBottom: "1.5rem" }}>
              <ShoppingBag
                size={48}
                style={{ color: "var(--gray-400)", margin: "0 auto 1rem" }}
              />
              <h2 className="mb-2">Keranjang Belanja Kosong</h2>
              <p className="mb-4" style={{ color: "var(--gray-600)" }}>
                Anda belum menambahkan produk ke keranjang
              </p>
            </div>
            <button
              className="btn btn-primary"
              onClick={() => navigate("/home")}
            >
              Lanjutkan Belanja
            </button>
          </div>
        </div>
      </div>
    );
  }

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
        <BreadCrumb
          items={[{ label: "Home", link: "/home" }, { label: "Cart" }]}
        />

        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: "600",
            margin: "1rem 0 1.5rem",
          }}
        >
          Keranjang Belanja
        </h2>

        <div
          className="d-flex gap-4"
          style={{ flexDirection: "column", alignItems: "stretch" }}
        >
          <div className="card">
            <div className="card-body p-0">
              <table className="table">
                <thead>
                  <tr>
                    <th style={{ width: "50%" }}>Barang</th>
                    <th style={{ textAlign: "right" }}>Harga</th>
                    <th style={{ textAlign: "center" }}>Qty</th>
                    <th style={{ textAlign: "right" }}>Total</th>
                    <th style={{ width: "80px" }}></th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <div className="d-flex gap-3 align-center">
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            style={{
                              width: "64px",
                              height: "64px",
                              objectFit: "cover",
                              borderRadius: "var(--radius)",
                            }}
                          />
                          <div>
                            <p style={{ fontWeight: "500" }}>{item.name}</p>
                            {item.category && (
                              <p
                                style={{
                                  fontSize: "0.875rem",
                                  color: "var(--gray-600)",
                                }}
                              >
                                {item.category}
                              </p>
                            )}
                          </div>
                        </div>
                      </td>
                      <td style={{ textAlign: "right" }}>
                        Rp {item.price.toLocaleString()}
                      </td>
                      <td>
                        <div
                          className="d-flex align-center justify-center gap-2"
                          style={{ margin: "0 auto" }}
                        >
                          <button
                            className="btn btn-sm btn-outline d-flex align-center justify-center"
                            style={{
                              width: "28px",
                              height: "28px",
                              padding: 0,
                              borderRadius: "var(--radius-sm)",
                            }}
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            disabled={item.quantity <= 1}
                          >
                            <Minus size={16} />
                          </button>
                          <span style={{ width: "30px", textAlign: "center" }}>
                            {item.quantity}
                          </span>
                          <button
                            className="btn btn-sm btn-outline d-flex align-center justify-center"
                            style={{
                              width: "28px",
                              height: "28px",
                              padding: 0,
                              borderRadius: "var(--radius-sm)",
                            }}
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                      </td>
                      <td style={{ textAlign: "right", fontWeight: "500" }}>
                        Rp {(item.price * item.quantity).toLocaleString()}
                      </td>
                      <td>
                        <button
                          className="btn btn-sm btn-outline d-flex align-center justify-center"
                          style={{
                            color: "var(--danger)",
                            width: "32px",
                            height: "32px",
                            padding: 0,
                            borderRadius: "var(--radius-sm)",
                          }}
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="d-flex justify-between">
            <div style={{ flex: 1 }}></div>
            <div style={{ width: "350px" }}>
              <div className="card">
                <div className="card-body">
                  <h3
                    className="mb-3"
                    style={{ fontSize: "1.125rem", fontWeight: "600" }}
                  >
                    Order Summary
                  </h3>

                  <div className="d-flex justify-between mb-2">
                    <span style={{ color: "var(--gray-700)" }}>Subtotal</span>
                    <span style={{ fontWeight: "500" }}>
                      Rp {getCartTotal().toLocaleString()}
                    </span>
                  </div>

                  <div className="divider"></div>

                  <div className="d-flex justify-between mb-3">
                    <span style={{ fontWeight: "600" }}>Total</span>
                    <span
                      style={{
                        fontWeight: "700",
                        fontSize: "1.125rem",
                        color: "var(--primary)",
                      }}
                    >
                      Rp {getCartTotal().toLocaleString()}
                    </span>
                  </div>

                  <button
                    className="btn btn-primary w-100 d-flex align-center justify-center gap-2"
                    onClick={handleCheckout}
                  >
                    Checkout <ArrowRight size={18} />
                  </button>

                  <button
                    className="btn btn-outline w-100 mt-2"
                    onClick={() => navigate("/home")}
                  >
                    Lanjutkan Belanja
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
