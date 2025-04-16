import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../features/Auth/context";
import { register } from "../api/auth";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      setError("Silakan lengkapi semua field.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Password tidak cocok.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await register({ name, email, password }); // Tidak simpan ke const karena tidak digunakan

      await login(email, password);

      navigate("/home");
    } catch (err) {
      console.error("Register error:", err);
      if (err?.response?.data?.message) {
        setError(err.response.data.message);
      } else if (err?.message) {
        setError(err.message);
      } else {
        setError("Gagal melakukan registrasi.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="d-flex justify-between align-center"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #ffffff, #e0e0e0)",
      }}
    >
      <div className="container" style={{ maxWidth: "400px" }}>
        <div className="card p-4">
          <h2 className="text-center mb-4">Register</h2>

          {error && <div className="alert alert-danger">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Nama</label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Alamat Email</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Konfirmasi Password</label>
              <input
                type="password"
                className="form-control"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100"
              style={{ marginTop: "1rem" }}
              disabled={loading}
            >
              {loading ? "Sedang mendaftar..." : "Daftar"}
            </button>

            <div className="text-center" style={{ marginTop: "1rem" }}>
              <Link to="/login">Sudah punya akun? Login</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
