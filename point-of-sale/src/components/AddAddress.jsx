import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getProvinces,
  getRegencies,
  getDistricts,
  getVillages,
  createAddress,
  updateAddress,
  getAddressById,
} from "../api/address";
import { useAuth } from "../features/Auth/context";

const AddAddress = () => {
  const [name, setName] = useState("");
  const [detail, setDetail] = useState("");
  const [province, setProvince] = useState("");
  const [regency, setRegency] = useState("");
  const [district, setDistrict] = useState("");
  const [village, setVillage] = useState("");

  const [provinces, setProvinces] = useState([]);
  const [regencies, setRegencies] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [villages, setVillages] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const data = await getProvinces();
        setProvinces(data);
      } catch {
        setError("Gagal mengambil data provinsi.");
      }
    };

    fetchProvinces();

    if (id) {
      const fetchAddress = async () => {
        try {
          setLoading(true);
          const address = await getAddressById(Number(id));

          setName(address.name);
          setDetail(address.detail);
          setProvince(address.province);
          setRegency(address.regency);
          setDistrict(address.district);
          setVillage(address.village);

          // Load dependent dropdowns
          const regenciesData = await getRegencies(address.province);
          setRegencies(regenciesData);

          const districtsData = await getDistricts(address.regency);
          setDistricts(districtsData);

          const villagesData = await getVillages(address.district);
          setVillages(villagesData);

          setLoading(false);
        } catch {
          setError("Gagal mengambil data alamat.");
          setLoading(false);
        }
      };

      fetchAddress();
    }
  }, [id]);

  useEffect(() => {
    if (province) {
      const fetchRegencies = async () => {
        try {
          const data = await getRegencies(province);
          setRegencies(data);
        } catch {
          setError("Gagal mengambil data kabupaten.");
        }
      };

      fetchRegencies();
      setRegency("");
      setDistrict("");
      setVillage("");
      setDistricts([]);
      setVillages([]);
    }
  }, [province]);

  useEffect(() => {
    if (regency) {
      const fetchDistricts = async () => {
        try {
          const data = await getDistricts(regency);
          setDistricts(data);
        } catch {
          setError("Gagal mengambil data kecamatan.");
        }
      };

      fetchDistricts();
      setDistrict("");
      setVillage("");
      setVillages([]);
    }
  }, [regency]);

  useEffect(() => {
    if (district) {
      const fetchVillages = async () => {
        try {
          const data = await getVillages(district);
          setVillages(data);
        } catch {
          setError("Gagal mengambil data kelurahan.");
        }
      };

      fetchVillages();
      setVillage("");
    }
  }, [district]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !province || !regency || !district || !village || !detail) {
      setError("Mohon lengkapi semua data.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const addressData = {
        userId: currentUser?.id,
        name,
        detail,
        province,
        regency,
        district,
        village,
      };

      if (id) {
        await updateAddress(Number(id), addressData);
      } else {
        await createAddress(addressData);
      }

      navigate("/account/addresses");
    } catch {
      setError("Gagal menyimpan alamat.");
    } finally {
      setLoading(false);
    }
  };

  if (loading && id) {
    return <div>Memuat data...</div>;
  }

  return (
    <div className="card">
      <div className="p-4">
        <h3 className="mb-4">{id ? "Edit Alamat" : "Tambah Alamat Baru"}</h3>

        {error && <div className="alert alert-danger mb-4">{error}</div>}

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
            <label className="form-label">Provinsi</label>
            <select
              className="form-control"
              value={province}
              onChange={(e) => setProvince(e.target.value)}
              required
            >
              <option value="">Pilih lokasi...</option>
              {provinces.map((prov) => (
                <option key={prov.id} value={prov.name}>
                  {prov.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Kabupaten</label>
            <select
              className="form-control"
              value={regency}
              onChange={(e) => setRegency(e.target.value)}
              required
              disabled={!province}
            >
              <option value="">Pilih lokasi...</option>
              {regencies.map((reg) => (
                <option key={reg.id} value={reg.name}>
                  {reg.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Kecamatan</label>
            <select
              className="form-control"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              required
              disabled={!regency}
            >
              <option value="">Pilih lokasi...</option>
              {districts.map((dist) => (
                <option key={dist.id} value={dist.name}>
                  {dist.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Kelurahan</label>
            <select
              className="form-control"
              value={village}
              onChange={(e) => setVillage(e.target.value)}
              required
              disabled={!district}
            >
              <option value="">Pilih lokasi...</option>
              {villages.map((vil) => (
                <option key={vil.id} value={vil.name}>
                  {vil.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Detail alamat</label>
            <input
              type="text"
              className="form-control"
              value={detail}
              onChange={(e) => setDetail(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100 mt-3"
            disabled={loading}
          >
            {loading ? "Menyimpan..." : "Simpan"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddAddress;
