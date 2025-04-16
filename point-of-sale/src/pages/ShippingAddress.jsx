"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { useAuth } from "../contexts/AuthContext";

const ShippingAddress = () => {
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const navigate = useNavigate();
  const { currentUser: _currentUser } = useAuth();

  useEffect(() => {
    // In a real app, this would be an API call
    // Mock data for now
    setAddresses([
      {
        id: 1,
        name: "Bandung",
        detail:
          "JAWA BARAT, KOTA BANDUNG, BOJONGKIDUL, CIBEUNYING WETAN, Sukaraja",
      },
    ]);

    if (addresses.length > 0) {
      setSelectedAddressId(addresses[0].id);
    }
  }, []);

  const handleContinue = () => {
    if (!selectedAddressId) {
      alert("Silakan pilih alamat pengiriman");
      return;
    }

    navigate("/checkout");
  };

  return (
    <div
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <Header />

      <div className="container" style={{ flex: 1, padding: "2rem 1rem" }}>
        <div className="card">
          <div className="p-4">
            <h2 className="mb-4">Checkout</h2>

            <div className="card mb-4">
              <div className="p-4">
                <h3 className="mb-4">Pilih Alamat Pengiriman</h3>

                {addresses.length === 0 ? (
                  <div>
                    <p>Anda belum memiliki alamat pengiriman.</p>
                    <button
                      className="btn btn-primary"
                      style={{ marginTop: "1rem" }}
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
                        className="d-flex align-center mb-2"
                        style={{
                          padding: "1rem",
                          border: "1px solid #eee",
                          borderRadius: "4px",
                        }}
                      >
                        <input
                          type="radio"
                          id={`address-${address.id}`}
                          name="shipping-address"
                          checked={selectedAddressId === address.id}
                          onChange={() => setSelectedAddressId(address.id)}
                          style={{ marginRight: "1rem" }}
                        />
                        <label
                          htmlFor={`address-${address.id}`}
                          style={{ flex: 1 }}
                        >
                          <div>
                            <strong>{address.name}</strong>
                          </div>
                          <div>{address.detail}</div>
                        </label>
                      </div>
                    ))}

                    <div className="text-right">
                      <button
                        className="btn btn-primary"
                        onClick={handleContinue}
                      >
                        Lanjut Bayar
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingAddress;
