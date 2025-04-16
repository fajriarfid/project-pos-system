import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const AddressList = () => {
  const [addresses, setAddresses] = useState([]);

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
  }, []);

  return (
    <div className="card">
      <div className="p-4">
        <div className="d-flex justify-between align-center mb-4">
          <h3>Alamat</h3>
          <Link to="/account/addresses/new" className="btn btn-primary">
            Tambah Alamat
          </Link>
        </div>

        {addresses.length === 0 ? (
          <p>There are no records to display</p>
        ) : (
          <div>
            {addresses.map((address) => (
              <div
                key={address.id}
                className="mb-4 p-4"
                style={{ border: "1px solid #eee", borderRadius: "4px" }}
              >
                <div className="d-flex justify-between mb-2">
                  <h4>{address.name}</h4>
                  <Link to={`/account/addresses/${address.id}`}>Edit</Link>
                </div>
                <p>{address.detail}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AddressList;
