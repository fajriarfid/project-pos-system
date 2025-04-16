import { NavLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Sidebar = () => {
  const { logout } = useAuth();

  return (
    <div className="card" style={{ width: "250px" }}>
      <div className="p-4">
        <h3 className="mb-4">Account</h3>
        <nav>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li className="mb-2">
              <NavLink
                to="/account"
                end
                className={({ isActive }) =>
                  `d-block p-2 ${isActive ? "bg-blue-600 text-white" : ""}`
                }
                style={{ borderRadius: "4px" }}
              >
                Profil
              </NavLink>
            </li>
            <li className="mb-2">
              <NavLink
                to="/account/orders"
                className={({ isActive }) =>
                  `d-block p-2 ${isActive ? "bg-blue-600 text-white" : ""}`
                }
                style={{ borderRadius: "4px" }}
              >
                Pemesanan
              </NavLink>
            </li>
            <li className="mb-2">
              <NavLink
                to="/account/addresses"
                className={({ isActive }) =>
                  `d-block p-2 ${isActive ? "bg-blue-600 text-white" : ""}`
                }
                style={{ borderRadius: "4px" }}
              >
                Alamat
              </NavLink>
            </li>
            <li className="mb-2">
              <button
                onClick={logout}
                className="d-block p-2 w-100 text-left"
                style={{
                  background: "none",
                  border: "none",
                  borderRadius: "4px",
                  width: "100%",
                }}
              >
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
