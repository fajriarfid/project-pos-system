import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TopBar from "../components/TopBar";
import { useCart } from "../features/Cart/context";
import { useAuth } from "../features/Auth/context";
import { getAddresses } from "../api/address";
import { createOrder } from "../api/order";
import BreadCrumb from "../components/BreadCrumb";
import {
  Check,
  ChevronRight,
  MapPin,
  Truck,
  CreditCard,
  AlertCircle,
} from "react-feather";

const Checkout = () => {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [processingOrder, setProcessingOrder] = useState(false);

  const [step, setStep] = useState(1); // 1: Select Address, 2: Confirmation
  const [shippingCost, setShippingCost] = useState(0);

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        setLoading(true);
        const data = await getAddresses(currentUser.id);
        setAddresses(data);

        if (data.length > 0) {
          setSelectedAddressId(data[0].id);
        }

        setLoading(false);
      } catch (err) {
        console.error("Error fetching addresses:", err);
        setError(err.message || "Failed to fetch addresses");
        setLoading(false);
      }
    };

    fetchAddresses();
  }, [currentUser.id]);

  // Calculate shipping cost when address or cart items change
  useEffect(() => {
    const calculateShippingCost = () => {
      if (!selectedAddressId || cartItems.length === 0) return;

      // Get selected address
      const selectedAddress = addresses.find(
        (addr) => addr.id === selectedAddressId
      );
      if (!selectedAddress) return;

      // Base shipping cost
      let baseCost = 10000;

      // Add cost based on region
      // This is a simple example - in a real app, you would likely call an API
      // that calculates shipping based on distance, weight, etc.
      const region = selectedAddress.province.toLowerCase();

      if (region.includes("jawa")) {
        baseCost += 5000;
      } else if (region.includes("sumatra")) {
        baseCost += 15000;
      } else if (region.includes("kalimantan")) {
        baseCost += 20000;
      } else if (region.includes("sulawesi")) {
        baseCost += 25000;
      } else if (region.includes("papua") || region.includes("maluku")) {
        baseCost += 35000;
      } else {
        baseCost += 30000; // Other regions
      }

      // Add cost based on total cart items (simple weight estimation)
      const totalItems = cartItems.reduce(
        (total, item) => total + item.quantity,
        0
      );
      const weightCost = totalItems * 1000; // 1000 per item

      setShippingCost(baseCost + weightCost);
    };

    calculateShippingCost();
  }, [selectedAddressId, cartItems, addresses]);

  const handleContinue = () => {
    if (!selectedAddressId) {
      setError("Please select a shipping address");
      return;
    }

    setError("");
    setStep(2);
  };

  const handleBack = () => {
    setStep(1);
  };

  const handlePlaceOrder = async () => {
    if (!selectedAddressId) {
      setError("Please select a shipping address");
      return;
    }

    try {
      setProcessingOrder(true);
      setError("");

      const selectedAddress = addresses.find(
        (addr) => addr.id === selectedAddressId
      );

      if (!selectedAddress) {
        throw new Error("Selected address not found");
      }

      const orderData = {
        items: cartItems,
        total: getCartTotal() + shippingCost,
        shippingAddress: selectedAddress,
        shippingCost: shippingCost,
        userId: currentUser.id,
        orderDate: new Date().toISOString(),
      };

      const order = await createOrder(orderData);

      if (!order || !order.id) {
        throw new Error("Failed to create order. Please try again.");
      }

      // Clear the cart
      clearCart();

      // Navigate to the invoice page
      navigate(`/invoices/${order.id}`);
    } catch (err) {
      console.error("Error placing order:", err);
      setError(err.message || "Failed to place order. Please try again.");
      setProcessingOrder(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div
        style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
      >
        <TopBar />
        <div className="container" style={{ flex: 1, padding: "2rem 1rem" }}>
          <div className="card p-5 text-center">
            <div style={{ marginBottom: "1.5rem" }}>
              <AlertCircle
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

  const selectedAddress = addresses.find(
    (addr) => addr.id === selectedAddressId
  );

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
          items={[
            { label: "Home", link: "/home" },
            { label: "Cart", link: "/cart" },
            { label: "Checkout" },
          ]}
        />

        <div
          className="d-flex gap-4"
          style={{
            marginTop: "1.5rem",
            flexDirection: "column",
            alignItems: "stretch",
          }}
        >
          {/* Checkout Steps */}
          <div className="card p-4">
            <div className="d-flex" style={{ position: "relative" }}>
              <div
                className="d-flex flex-column align-center"
                style={{
                  zIndex: 1,
                  flex: "1",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    backgroundColor:
                      step >= 1 ? "var(--primary)" : "var(--gray-200)",
                    color: step >= 1 ? "white" : "var(--gray-500)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "0.5rem",
                  }}
                >
                  {step > 1 ? <Check size={18} /> : <MapPin size={18} />}
                </div>
                <span
                  style={{
                    fontSize: "0.875rem",
                    fontWeight: step >= 1 ? "500" : "400",
                    color: step >= 1 ? "var(--gray-900)" : "var(--gray-500)",
                  }}
                >
                  Alamat
                </span>
              </div>

              <div
                className="d-flex flex-column align-center"
                style={{
                  zIndex: 1,
                  flex: "1",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    backgroundColor:
                      step >= 2 ? "var(--primary)" : "var(--gray-200)",
                    color: step >= 2 ? "white" : "var(--gray-500)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "0.5rem",
                  }}
                >
                  <CreditCard size={18} />
                </div>
                <span
                  style={{
                    fontSize: "0.875rem",
                    fontWeight: step >= 2 ? "500" : "400",
                    color: step >= 2 ? "var(--gray-900)" : "var(--gray-500)",
                  }}
                >
                  Konfirmasi
                </span>
              </div>

              {/* Progress line */}
              <div
                style={{
                  position: "absolute",
                  top: "18px",
                  left: "18px",
                  right: "18px",
                  height: "2px",
                  backgroundColor: "var(--gray-200)",
                  zIndex: 0,
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: step > 1 ? "100%" : "0%",
                    backgroundColor: "var(--primary)",
                    transition: "width 0.3s ease-in-out",
                  }}
                />
              </div>
            </div>
          </div>

          {error && (
            <div className="alert alert-danger d-flex align-center gap-2">
              <AlertCircle size={18} />
              <span>{error}</span>
            </div>
          )}

          <div
            className="d-flex gap-4"
            style={{ flexDirection: "column", alignItems: "stretch" }}
          >
            {step === 1 ? (
              <div className="card">
                <div className="card-header">
                  <h3 style={{ fontSize: "1.25rem", fontWeight: "600" }}>
                    Pilih Alamat Pengiriman
                  </h3>
                </div>

                <div className="card-body">
                  {loading ? (
                    <div className="d-flex flex-column gap-3">
                      {[1, 2].map((i) => (
                        <div
                          key={i}
                          className="skeleton"
                          style={{
                            height: "100px",
                            borderRadius: "var(--radius)",
                          }}
                        />
                      ))}
                    </div>
                  ) : addresses.length === 0 ? (
                    <div className="text-center p-4">
                      <MapPin
                        size={48}
                        style={{
                          color: "var(--gray-400)",
                          margin: "0 auto 1rem",
                        }}
                      />
                      <p className="mb-4">
                        Anda belum memiliki alamat pengiriman.
                      </p>
                      <button
                        className="btn btn-primary"
                        onClick={() => navigate("/account/addresses/new")}
                      >
                        Tambah Alamat Baru
                      </button>
                    </div>
                  ) : (
                    <div>
                      {addresses.map((address) => (
                        <div
                          key={address.id}
                          className="mb-3 p-4"
                          style={{
                            border:
                              selectedAddressId === address.id
                                ? "2px solid var(--primary)"
                                : "1px solid var(--gray-200)",
                            borderRadius: "var(--radius)",
                            backgroundColor:
                              selectedAddressId === address.id
                                ? "var(--primary-light)"
                                : "white",
                            cursor: "pointer",
                            transition: "all 0.2s",
                          }}
                          onClick={() => setSelectedAddressId(address.id)}
                        >
                          <div className="d-flex justify-between mb-2">
                            <div className="d-flex gap-2 align-center">
                              <h4 style={{ fontWeight: "600" }}>
                                {address.name}
                              </h4>
                              {selectedAddressId === address.id && (
                                <span className="badge badge-primary">
                                  Selected
                                </span>
                              )}
                            </div>
                          </div>
                          <p style={{ color: "var(--gray-700)" }}>
                            {address.province}, {address.regency},{" "}
                            {address.district}, {address.village},{" "}
                            {address.detail}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="card-footer d-flex justify-between">
                  <button
                    className="btn btn-outline"
                    onClick={() => navigate("/cart")}
                  >
                    Kembali ke Keranjang
                  </button>

                  <button
                    className="btn btn-primary d-flex align-center gap-2"
                    onClick={handleContinue}
                    disabled={!selectedAddressId || loading}
                  >
                    Lanjutkan <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            ) : (
              <div
                className="d-flex gap-4"
                style={{ flexDirection: "column", alignItems: "stretch" }}
              >
                <div className="card">
                  <div className="card-header">
                    <h3 style={{ fontSize: "1.25rem", fontWeight: "600" }}>
                      Konfirmasi Pesanan
                    </h3>
                  </div>

                  <div className="card-body">
                    <div className="mb-4">
                      <h4
                        className="mb-2"
                        style={{
                          fontSize: "1rem",
                          fontWeight: "600",
                          color: "var(--gray-700)",
                        }}
                      >
                        <MapPin
                          size={18}
                          style={{
                            verticalAlign: "middle",
                            marginRight: "0.5rem",
                          }}
                        />
                        Alamat Pengiriman
                      </h4>
                      {selectedAddress && (
                        <div
                          className="p-3"
                          style={{
                            backgroundColor: "var(--gray-50)",
                            borderRadius: "var(--radius)",
                            border: "1px solid var(--gray-200)",
                          }}
                        >
                          <p
                            style={{
                              fontWeight: "500",
                              marginBottom: "0.25rem",
                            }}
                          >
                            {selectedAddress.name}
                          </p>
                          <p
                            style={{
                              color: "var(--gray-700)",
                              fontSize: "0.875rem",
                            }}
                          >
                            {selectedAddress.province},{" "}
                            {selectedAddress.regency},{" "}
                            {selectedAddress.district},{" "}
                            {selectedAddress.village}, {selectedAddress.detail}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="mb-4">
                      <h4
                        className="mb-2"
                        style={{
                          fontSize: "1rem",
                          fontWeight: "600",
                          color: "var(--gray-700)",
                        }}
                      >
                        <Truck
                          size={18}
                          style={{
                            verticalAlign: "middle",
                            marginRight: "0.5rem",
                          }}
                        />
                        Detail Pesanan
                      </h4>

                      <div
                        className="card"
                        style={{ boxShadow: "var(--shadow-sm)" }}
                      >
                        <table className="table">
                          <thead>
                            <tr>
                              <th>Barang</th>
                              <th style={{ textAlign: "center" }}>Jumlah</th>
                              <th style={{ textAlign: "right" }}>Harga</th>
                              <th style={{ textAlign: "right" }}>Total</th>
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
                                        width: "48px",
                                        height: "48px",
                                        objectFit: "cover",
                                        borderRadius: "var(--radius-sm)",
                                      }}
                                    />
                                    <div>
                                      <p style={{ fontWeight: "500" }}>
                                        {item.name}
                                      </p>
                                    </div>
                                  </div>
                                </td>
                                <td style={{ textAlign: "center" }}>
                                  {item.quantity}
                                </td>
                                <td style={{ textAlign: "right" }}>
                                  Rp {item.price.toLocaleString()}
                                </td>
                                <td style={{ textAlign: "right" }}>
                                  Rp{" "}
                                  {(
                                    item.price * item.quantity
                                  ).toLocaleString()}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  <div className="card-footer">
                    <div className="d-flex justify-between mb-2">
                      <span>Sub Total</span>
                      <span>Rp {getCartTotal().toLocaleString()}</span>
                    </div>
                    <div className="d-flex justify-between mb-2">
                      <span>Ongkir</span>
                      <span>Rp {shippingCost.toLocaleString()}</span>
                    </div>
                    <div className="divider"></div>
                    <div
                      className="d-flex justify-between"
                      style={{ fontWeight: "600" }}
                    >
                      <span>Total</span>
                      <span
                        style={{
                          fontSize: "1.125rem",
                          color: "var(--primary)",
                        }}
                      >
                        Rp {(getCartTotal() + shippingCost).toLocaleString()}
                      </span>
                    </div>

                    <div className="d-flex justify-between mt-4">
                      <button
                        className="btn btn-outline"
                        onClick={handleBack}
                        disabled={processingOrder}
                      >
                        Kembali
                      </button>

                      <button
                        className="btn btn-primary"
                        onClick={handlePlaceOrder}
                        disabled={processingOrder}
                      >
                        {processingOrder
                          ? "Memproses..."
                          : "Selesaikan Pesanan"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
