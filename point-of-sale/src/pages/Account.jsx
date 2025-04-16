import { useState, useEffect } from "react";
import { Routes, Route, NavLink, useNavigate } from "react-router-dom";
import TopBar from "../components/TopBar";
import Profile from "../components/Profile";
import AddAddress from "../components/AddAddress";
import Logout from "../components/Logout";
import { useAuth } from "../features/Auth/context";
import { getAddresses, deleteAddress } from "../api/address";
import { getOrders } from "../api/order";
import Address from "../components/Address";
import Order from "../components/Order";
import {
  User,
  MapPin,
  ShoppingBag,
  LogOut,
  Plus,
  AlertTriangle,
} from "react-feather";

const Account = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [addresses, setAddresses] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loadingAddresses, setLoadingAddresses] = useState(true);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        setLoadingAddresses(true);
        setErrorMessage(""); // Reset error state before fetch
        const data = await getAddresses(currentUser.id);
        setAddresses(data);
        setLoadingAddresses(false);
      } catch (error) {
        console.error("Failed to fetch addresses:", error);
        setErrorMessage("Failed to fetch addresses");
        setLoadingAddresses(false);
      }
    };

    const fetchOrders = async () => {
      try {
        setLoadingOrders(true);
        setErrorMessage(""); // Reset error state before fetch
        const data = await getOrders(currentUser.id);
        setOrders(data);
        setLoadingOrders(false);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
        setErrorMessage("Failed to fetch orders");
        setLoadingOrders(false);
      }
    };

    fetchAddresses();
    fetchOrders();
  }, [currentUser.id]);

  const handleDeleteAddress = async (addressId) => {
    if (window.confirm("Are you sure you want to delete this address?")) {
      try {
        setErrorMessage(""); // Reset error state before delete
        await deleteAddress(addressId);
        setAddresses(addresses.filter((addr) => addr.id !== addressId));
      } catch (error) {
        console.error("Failed to delete address:", error);
        setErrorMessage("Failed to delete address");
      }
    }
  };

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
        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: "600",
            marginBottom: "1.5rem",
          }}
        >
          My Account
        </h2>

        <div className="d-flex gap-4" style={{ alignItems: "flex-start" }}>
          <div
            className="card"
            style={{ width: "250px", position: "sticky", top: "90px" }}
          >
            <div className="p-4">
              <div className="d-flex align-center gap-3 mb-4">
                <div
                  className="avatar"
                  style={{
                    backgroundColor: "var(--primary-light)",
                    color: "var(--primary)",
                    fontWeight: "600",
                  }}
                >
                  {currentUser.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p style={{ fontWeight: "600" }}>{currentUser.name}</p>
                  <p style={{ fontSize: "0.875rem", color: "var(--gray-600)" }}>
                    {currentUser.email}
                  </p>
                </div>
              </div>

              <nav>
                <ul style={{ listStyle: "none", padding: 0 }}>
                  <li className="mb-2">
                    <NavLink
                      to="/account"
                      end
                      className={({ isActive }) =>
                        `d-flex align-center gap-2 p-3 ${
                          isActive ? "bg-primary-light" : ""
                        }`
                      }
                      style={({ isActive }) => ({
                        borderRadius: "var(--radius)",
                        color: isActive ? "var(--primary)" : "var(--gray-700)",
                        fontWeight: isActive ? "500" : "400",
                      })}
                    >
                      <User size={18} />
                      Profil
                    </NavLink>
                  </li>
                  <li className="mb-2">
                    <NavLink
                      to="/account/orders"
                      className={({ isActive }) =>
                        `d-flex align-center gap-2 p-3 ${
                          isActive ? "bg-primary-light" : ""
                        }`
                      }
                      style={({ isActive }) => ({
                        borderRadius: "var(--radius)",
                        color: isActive ? "var(--primary)" : "var(--gray-700)",
                        fontWeight: isActive ? "500" : "400",
                      })}
                    >
                      <ShoppingBag size={18} />
                      Pemesanan
                    </NavLink>
                  </li>
                  <li className="mb-2">
                    <NavLink
                      to="/account/addresses"
                      className={({ isActive }) =>
                        `d-flex align-center gap-2 p-3 ${
                          isActive ? "bg-primary-light" : ""
                        }`
                      }
                      style={({ isActive }) => ({
                        borderRadius: "var(--radius)",
                        color: isActive ? "var(--primary)" : "var(--gray-700)",
                        fontWeight: isActive ? "500" : "400",
                      })}
                    >
                      <MapPin size={18} />
                      Alamat
                    </NavLink>
                  </li>
                  <li className="mb-2">
                    <div
                      className="d-flex align-center gap-2 p-3"
                      style={{
                        borderRadius: "var(--radius)",
                        color: "var(--gray-700)",
                        cursor: "pointer",
                      }}
                    >
                      <LogOut size={18} />
                      <Logout />
                    </div>
                  </li>
                </ul>
              </nav>
            </div>
          </div>

          <div style={{ flex: 1 }}>
            {errorMessage && (
              <div className="alert alert-danger d-flex align-center gap-2 mb-4">
                <AlertTriangle size={18} />
                <span>{errorMessage}</span>
              </div>
            )}

            <Routes>
              <Route path="/" element={<Profile />} />

              <Route
                path="/orders"
                element={
                  <div className="card">
                    <div className="card-header d-flex justify-between align-center">
                      <h3 style={{ fontSize: "1.25rem", fontWeight: "600" }}>
                        Pemesanan
                      </h3>
                    </div>

                    <div className="card-body">
                      {loadingOrders ? (
                        <div className="d-flex flex-column gap-3">
                          {[1, 2, 3].map((i) => (
                            <div
                              key={i}
                              className="skeleton"
                              style={{
                                height: "120px",
                                borderRadius: "var(--radius)",
                              }}
                            />
                          ))}
                        </div>
                      ) : orders.length === 0 ? (
                        <div className="text-center p-4">
                          <ShoppingBag
                            size={48}
                            style={{
                              color: "var(--gray-400)",
                              margin: "0 auto 1rem",
                            }}
                          />
                          <p className="mb-4">Anda belum memiliki pesanan.</p>
                          <button
                            className="btn btn-primary"
                            onClick={() => navigate("/home")}
                          >
                            Mulai Belanja
                          </button>
                        </div>
                      ) : (
                        <div>
                          {orders.map((order) => (
                            <Order key={order.id} order={order} />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                }
              />

              <Route
                path="/addresses"
                element={
                  <div className="card">
                    <div className="card-header d-flex justify-between align-center">
                      <h3 style={{ fontSize: "1.25rem", fontWeight: "600" }}>
                        Alamat
                      </h3>
                      <button
                        className="btn btn-primary d-flex align-center gap-2"
                        onClick={() => navigate("/account/addresses/new")}
                      >
                        <Plus size={18} /> Tambah Alamat
                      </button>
                    </div>

                    <div className="card-body">
                      {loadingAddresses ? (
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
                          <p className="mb-4">Anda belum memiliki alamat.</p>
                          <button
                            className="btn btn-primary d-flex align-center gap-2 mx-auto"
                            onClick={() => navigate("/account/addresses/new")}
                          >
                            <Plus size={18} /> Tambah Alamat
                          </button>
                        </div>
                      ) : (
                        <div>
                          {addresses.map((address) => (
                            <Address
                              key={address.id}
                              address={address}
                              onDelete={handleDeleteAddress}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                }
              />

              <Route path="/addresses/new" element={<AddAddress />} />
              <Route path="/addresses/:id" element={<AddAddress />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
