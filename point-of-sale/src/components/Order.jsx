import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ChevronDown,
  ChevronUp,
  FileText,
  Clock,
  CheckCircle,
  AlertTriangle,
  Package,
} from "react-feather";

const Order = ({ order }) => {
  const [expanded, setExpanded] = useState(false);

  const getStatusIcon = (status) => {
    switch (status) {
      case "waiting_payment":
        return <Clock size={18} style={{ color: "var(--warning)" }} />;
      case "processing":
        return <Package size={18} style={{ color: "var(--primary)" }} />;
      case "shipped":
        return <Package size={18} style={{ color: "var(--primary)" }} />;
      case "delivered":
        return <CheckCircle size={18} style={{ color: "var(--success)" }} />;
      case "completed":
        return <CheckCircle size={18} style={{ color: "var(--success)" }} />;
      case "cancelled":
        return <AlertTriangle size={18} style={{ color: "var(--danger)" }} />;
      default:
        return <Clock size={18} style={{ color: "var(--gray-600)" }} />;
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

  return (
    <div className="card mb-3" style={{ overflow: "hidden" }}>
      <div className="p-4">
        <div className="d-flex justify-between align-center mb-3">
          <div>
            <div className="d-flex gap-4 mb-2">
              <div className="d-flex align-center gap-1">
                <span style={{ fontWeight: "500" }}>Order ID:</span> #{order.id}
              </div>
              <div className="d-flex align-center gap-1">
                <span style={{ fontWeight: "500" }}>Total:</span> Rp{" "}
                {order.total.toLocaleString()}
              </div>
            </div>
            <div
              className="d-flex align-center gap-1"
              style={{
                color: getStatusColor(order.status),
                fontWeight: "500",
              }}
            >
              {getStatusIcon(order.status)}
              <span>{getStatusLabel(order.status)}</span>
            </div>
          </div>
          <div className="d-flex gap-2">
            <Link
              to={`/invoices/${order.id}`}
              className="btn btn-sm btn-outline-primary d-flex align-center gap-1"
            >
              <FileText size={16} /> Invoice
            </Link>
            <button
              className="btn btn-sm btn-outline d-flex align-center"
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
          </div>
        </div>

        {expanded && (
          <div
            style={{
              marginTop: "1rem",
              animation: "fade-in 0.3s ease-in-out",
            }}
          >
            <h4
              className="mb-2"
              style={{
                fontSize: "0.875rem",
                fontWeight: "600",
                color: "var(--gray-700)",
              }}
            >
              Items
            </h4>
            <div className="card" style={{ boxShadow: "var(--shadow-sm)" }}>
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Barang</th>
                    <th style={{ textAlign: "center" }}>Jumlah</th>
                    <th style={{ textAlign: "right" }}>Harga</th>
                    <th style={{ textAlign: "right" }}>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items.map((item) => (
                    <tr key={item.id}>
                      <td>{item.name}</td>
                      <td style={{ textAlign: "center" }}>{item.quantity}</td>
                      <td style={{ textAlign: "right" }}>
                        Rp {item.price.toLocaleString()}
                      </td>
                      <td style={{ textAlign: "right" }}>
                        Rp {(item.price * item.quantity).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Order;
