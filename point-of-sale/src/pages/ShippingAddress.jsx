import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAddresses, getShippingCost } from "../api/address";
import { useAuth } from "../features/Auth/context";
import Address from "./Address";
import { PlusSquare } from "react-feather";

const ShippingAddressSelector = ({ onAddressSelect, selectedAddressId }) => {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        setLoading(true);
        const data = await getAddresses(currentUser?.id);
        setAddresses(data);

        // If no address is selected yet and there's a default address, select it
        if (!selectedAddressId && data.length > 0) {
          const defaultAddress = data.find((addr) => addr.isDefault);
          if (defaultAddress) {
            onAddressSelect(defaultAddress.id);
          } else if (data.length > 0) {
            // If no default address, select the first one
            onAddressSelect(data[0].id);
          }
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching addresses:", error);
        setError("Gagal memuat daftar alamat.");
        setLoading(false);
      }
    };

    if (currentUser?.id) {
      fetchAddresses();
    } else {
      setLoading(false);
      setError(
        "Silakan login terlebih dahulu untuk melihat alamat pengiriman."
      );
    }
  }, [currentUser, onAddressSelect, selectedAddressId]);

  const handleAddressSelect = (addressId) => {
    onAddressSelect(addressId);
  };

  if (loading) {
    return (
      <div className="card">
        <div className="p-4 text-center">
          <div className="spinner"></div>
          <p>Memuat data alamat pengiriman...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="p-4">
        <div className="d-flex justify-between align-center mb-4">
          <h3>Alamat Pengiriman</h3>
          <Link
            to="/account/addresses/new?redirect=checkout"
            className="btn btn-outline-primary d-flex align-center gap-2"
          >
            <PlusSquare size={16} />
            <span>Tambah Alamat</span>
          </Link>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        {addresses.length === 0 ? (
          <div className="text-center p-4 bg-light rounded">
            <p>Anda belum memiliki alamat tersimpan.</p>
            <Link
              to="/account/addresses/new?redirect=checkout"
              className="btn btn-primary mt-2"
            >
              Tambah Alamat Baru
            </Link>
          </div>
        ) : (
          <div className="address-list">
            {addresses.map((address) => {
              // Calculate shipping cost correctly using the regency
              const shippingCost = getShippingCost(address.regency);

              console.log(
                "Address regency:",
                address.regency,
                "Shipping cost:",
                shippingCost
              );

              return (
                <Address
                  key={address.id}
                  address={address}
                  onSelect={handleAddressSelect}
                  isSelected={selectedAddressId === address.id}
                  hideControls={true}
                  showShippingCost={true}
                  shippingCost={shippingCost}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ShippingAddressSelector;
