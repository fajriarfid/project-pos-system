import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TopBar from "../components/TopBar";
import BreadCrumb from "../components/BreadCrumb";
import { getOrderById } from "../api/order";
import { useAuth } from "../features/Auth/context";
import {
  Printer,
  Download,
  ArrowLeft,
  CheckCircle,
  Clock,
  AlertTriangle,
} from "react-feather";

const Invoices = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        const data = await getOrderById(id);

        if (!data) {
          throw new Error("Order not found");
        }

        setOrder(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching order:", err);
        setError(err.message || "Failed to fetch order");
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  const getStatusIcon = (status) => {
    switch (status) {
      case "waiting_payment":
        return <Clock size={20} style={{ color: "var(--warning)" }} />;
      case "completed":
        return <CheckCircle size={20} style={{ color: "var(--success)" }} />;
      case "cancelled":
        return <AlertTriangle size={20} style={{ color: "var(--danger)" }} />;
      default:
        return <Clock size={20} style={{ color: "var(--primary)" }} />;
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case "waiting_payment":
        return "Menunggu Pembayaran";
      case "processing":
        return "Diproses";
      case "shipped":
        return "Dikirim";
      case "delivered":
        return "Diterima";
      case "completed":
        return "Selesai";
      case "cancelled":
        return "Dibatalkan";
      default:
        return status;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "waiting_payment":
        return "var(--warning)";
      case "processing":
      case "shipped":
        return "var(--primary)";
      case "delivered":
      case "completed":
        return "var(--success)";
      case "cancelled":
        return "var(--danger)";
      default:
        return "var(--gray-600)";
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    alert("Download PDF functionality would be implemented here");
  };

  if (loading) {
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
        <div className="container" style={{ flex: 1, padding: "2rem 1rem" }}>
          <div className="card p-5">
            <div className="d-flex flex-column align-center gap-3">
              <div
                className="skeleton"
                style={{
                  width: "100%",
                  height: "24px",
                  borderRadius: "var(--radius-sm)",
                }}
              />
              <div
                className="skeleton"
                style={{
                  width: "70%",
                  height: "16px",
                  borderRadius: "var(--radius-sm)",
                }}
              />
              <div
                className="skeleton"
                style={{
                  width: "100%",
                  height: "200px",
                  borderRadius: "var(--radius)",
                }}
              />
              <div
                className="skeleton"
                style={{
                  width: "100%",
                  height: "150px",
                  borderRadius: "var(--radius)",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !order) {
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
        <div className="container" style={{ flex: 1, padding: "2rem 1rem" }}>
          <div className="alert alert-danger d-flex align-center gap-2">
            <AlertTriangle size={20} />
            <span>{error || "Order not found"}</span>
          </div>
          <button
            className="btn btn-primary mt-3 d-flex align-center gap-2"
            onClick={() => navigate("/account/orders")}
          >
            <ArrowLeft size={18} /> Back to Orders
          </button>
        </div>
      </div>
    );
  }

  // Safety check for required order properties
  const orderDate = order.createdAt ? new Date(order.createdAt) : new Date();
  const shippingAddress = order.shippingAddress || {};
  const items = Array.isArray(order.items) ? order.items : [];
  const shippingCost = order.shippingCost || 0;
  const total = order.total || 0;

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
            { label: "Account", link: "/account" },
            { label: "Orders", link: "/account/orders" },
            { label: `Invoice #${order.id}` },
          ]}
        />

        <div
          className="d-flex justify-between align-center"
          style={{ marginTop: "1.5rem", marginBottom: "1rem" }}
        >
          <h2 style={{ fontSize: "1.5rem", fontWeight: "600" }}>
            Invoice #{order.id}
          </h2>

          <div className="d-flex gap-2">
            <button
              className="btn btn-outline d-flex align-center gap-2"
              onClick={handlePrint}
            >
              <Printer size={18} /> Print
            </button>
            <button
              className="btn btn-primary d-flex align-center gap-2"
              onClick={handleDownloadPDF}
            >
              <Download size={18} /> Download PDF
            </button>
          </div>
        </div>

        <div className="card mb-4">
          <div className="card-body p-5">
            <div className="d-flex justify-between mb-5">
              <div>
                <h1
                  style={{
                    fontWeight: "700",
                    fontSize: "1.5rem",
                    marginBottom: "0.5rem",
                    background:
                      "linear-gradient(90deg, var(--primary) 0%, var(--secondary) 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  POS System
                </h1>
                <p style={{ color: "var(--gray-600)" }}>Invoice #{order.id}</p>
              </div>

              <div className="text-right">
                <p style={{ marginBottom: "0.25rem" }}>
                  <span style={{ fontWeight: "500" }}>Date:</span>{" "}
                  {orderDate.toLocaleDateString()}
                </p>
                <div
                  className="d-flex align-center gap-1 justify-end"
                  style={{
                    color: getStatusColor(order.status),
                    fontWeight: "500",
                  }}
                >
                  {getStatusIcon(order.status)}
                  <span>{getStatusLabel(order.status)}</span>
                </div>
              </div>
            </div>

            <div
              className="d-flex justify-between mb-5"
              style={{ gap: "2rem" }}
            >
              <div style={{ flex: 1 }}>
                <h3
                  style={{
                    fontSize: "1rem",
                    fontWeight: "600",
                    marginBottom: "0.75rem",
                    color: "var(--gray-700)",
                  }}
                >
                  Billed To
                </h3>
                <p style={{ fontWeight: "500", marginBottom: "0.25rem" }}>
                  {currentUser?.name || "Customer"}
                </p>
                <p
                  style={{ marginBottom: "0.25rem", color: "var(--gray-600)" }}
                >
                  {currentUser?.email || "customer@example.com"}
                </p>
                <p style={{ color: "var(--gray-600)" }}>
                  {shippingAddress.province || ""}
                  {shippingAddress.province ? ", " : ""}
                  {shippingAddress.regency || ""}
                  {shippingAddress.regency ? ", " : ""}
                  {shippingAddress.district || ""}
                  {shippingAddress.district ? ", " : ""}
                  {shippingAddress.village || ""}
                  {shippingAddress.village ? ", " : ""}
                  {shippingAddress.detail || ""}
                </p>
              </div>

              <div style={{ flex: 1 }}>
                <h3
                  style={{
                    fontSize: "1rem",
                    fontWeight: "600",
                    marginBottom: "0.75rem",
                    color: "var(--gray-700)",
                  }}
                >
                  Payment To
                </h3>
                <p style={{ fontWeight: "500", marginBottom: "0.25rem" }}>
                  Fajri Arfid
                </p>
                <p
                  style={{ marginBottom: "0.25rem", color: "var(--gray-600)" }}
                >
                  fajriarfid@gmail.com
                </p>
                <p
                  style={{ marginBottom: "0.25rem", color: "var(--gray-600)" }}
                >
                  BCA
                </p>
                <p style={{ color: "var(--gray-600)" }}>xxxxx-xxxxx-222-30</p>
              </div>
            </div>

            <div>
              <h3
                style={{
                  fontSize: "1rem",
                  fontWeight: "600",
                  marginBottom: "0.75rem",
                  color: "var(--gray-700)",
                }}
              >
                Order Details
              </h3>

              <div className="card" style={{ boxShadow: "var(--shadow-sm)" }}>
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th style={{ width: "50%" }}>Item</th>
                      <th style={{ textAlign: "center" }}>Quantity</th>
                      <th style={{ textAlign: "right" }}>Price</th>
                      <th style={{ textAlign: "right" }}>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.length > 0 ? (
                      items.map((item, index) => (
                        <tr key={item.id || index}>
                          <td>{item.name || "Item"}</td>
                          <td style={{ textAlign: "center" }}>
                            {item.quantity || 0}
                          </td>
                          <td style={{ textAlign: "right" }}>
                            Rp {(item.price || 0).toLocaleString()}
                          </td>
                          <td style={{ textAlign: "right" }}>
                            Rp{" "}
                            {(
                              (item.price || 0) * (item.quantity || 0)
                            ).toLocaleString()}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" style={{ textAlign: "center" }}>
                          No items in this order
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div className="d-flex justify-end mt-4">
                <div style={{ width: "300px" }}>
                  <div className="d-flex justify-between mb-2">
                    <span style={{ color: "var(--gray-600)" }}>Subtotal</span>
                    <span>Rp {(total - shippingCost).toLocaleString()}</span>
                  </div>
                  <div className="d-flex justify-between mb-2">
                    <span style={{ color: "var(--gray-600)" }}>Shipping</span>
                    <span>Rp {shippingCost.toLocaleString()}</span>
                  </div>
                  <div className="divider"></div>
                  <div
                    className="d-flex justify-between"
                    style={{ fontWeight: "600" }}
                  >
                    <span>Total</span>
                    <span
                      style={{ fontSize: "1.125rem", color: "var(--primary)" }}
                    >
                      Rp {total.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="d-flex justify-between">
          <button
            className="btn btn-outline d-flex align-center gap-2"
            onClick={() => navigate("/account/orders")}
          >
            <ArrowLeft size={18} /> Back to Orders
          </button>
        </div>
      </div>
    </div>
  );
};

export default Invoices;
