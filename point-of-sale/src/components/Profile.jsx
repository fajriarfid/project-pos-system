import { useAuth } from "../features/Auth/context";

const Profile = () => {
  const { currentUser } = useAuth();

  return (
    <div className="card">
      <div className="p-4">
        <h3 className="mb-4">Profil</h3>

        <div className="mb-4">
          <div className="d-flex mb-2">
            <div style={{ width: "100px", fontWeight: "bold" }}>Nama</div>
            <div>{currentUser?.name || "Fajri"}</div>
          </div>

          <div className="d-flex">
            <div style={{ width: "100px", fontWeight: "bold" }}>Email</div>
            <div>{currentUser?.email || ""}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
