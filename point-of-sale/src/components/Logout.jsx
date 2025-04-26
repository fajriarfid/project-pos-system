import { useNavigate } from "react-router-dom";
import { useAuth } from "../features/Auth/context";

const Logout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <button
      onClick={handleLogout}
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
  );
};

export default Logout;
