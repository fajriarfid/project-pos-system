import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  getAddresses,
  deleteAddress,
  setDefaultAddress,
  getShippingCost,
} from "../api/address";
import { useAuth } from "../features/Auth/context";
import Address from "./Address";
import { PlusSquare } from "react-feather";

const AddressList = () => {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const { currentUser } = useAuth();

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      setLoading(true);
      const data = await getAddresses(currentUser?.id);
      setAddresses(data);
      setLoading(false);
    } catch {
      setError("Gagal memuat daftar alamat.");
      setLoading(false);
    }
  };

  const handleDelete = async (addressId) => {
    if (!window.confirm("Apakah Anda yakin ingin menghapus alamat ini?")) {
      return;
    }

    try {
      await deleteAddress(addressId);
      setSuccessMessage("Alamat berhasil dihapus");
      fetchAddresses(); // Refresh the list after deletion
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch {
      setError("Gagal menghapus alamat.");
      setTimeout(() => setError(""), 3000);
    }
  };

  const handleSetDefault = async (addressId) => {
    try {
      await setDefaultAddress(addressId);
      setSuccessMessage("Alamat default berhasil diubah");
      fetchAddresses();
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch {
      setError("Gagal mengubah alamat default.");
      setTimeout(() => setError(""), 3000);
    }
  };

  return (
    <div className="card">
      <div className="p-4">
        <div className="d-flex justify-between align-center mb-4">
          <h3>Alamat</h3>
          <Link
            to="/account/addresses/new"
            className="btn btn-primary d-flex align-center gap-2"
          >
            <PlusSquare size={18} />
            <span>Tambah Alamat</span>
          </Link>
        </div>

        {error && <div className="alert alert-danger mb-4">{error}</div>}
        {successMessage && (
          <div className="alert alert-success mb-4">{successMessage}</div>
        )}

        {loading ? (
          <div className="text-center p-4">
            <div className="spinner"></div>
            <p>Memuat data alamat...</p>
          </div>
        ) : addresses.length === 0 ? (
          <div className="text-center p-4 bg-light rounded">
            <p>Belum ada alamat tersimpan.</p>
            <Link to="/account/addresses/new" className="btn btn-outline mt-2">
              Tambah Alamat Baru
            </Link>
          </div>
        ) : (
          <div>
            {addresses.map((address) => (
              <Address
                key={address.id}
                address={address}
                onDelete={handleDelete}
                onSetDefault={handleSetDefault}
                showShippingCost={true}
                shippingCost={getShippingCost(address.regency)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AddressList;
