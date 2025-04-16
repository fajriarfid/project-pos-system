import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const AddressForm = () => {
  const [name, setName] = useState("Bandung");
  const [detail, setDetail] = useState("Sukaraja");
  const [province, setProvince] = useState("JAWA BARAT");
  const [regency, setRegency] = useState("");
  const [district, setDistrict] = useState("");
  const [village, setVillage] = useState("");
  const [provinces, setProvinces] = useState([]);
  const [regencies, setRegencies] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [villages, setVillages] = useState([]);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    // In a real app, these would be API calls
    // Mock data for now
    setProvinces([
      { id: 1, name: "ACEH" },
      { id: 2, name: "SUMATERA UTARA" },
      { id: 3, name: "SUMATERA BARAT" },
      { id: 4, name: "RIAU" },
      { id: 5, name: "JAMBI" },
      { id: 6, name: "SUMATERA SELATAN" },
      { id: 7, name: "BENGKULU" },
      { id: 8, name: "LAMPUNG" },
      { id: 9, name: "KEPULAUAN BANGKA BELITUNG" },
      { id: 10, name: "KEPULAUAN RIAU" },
      { id: 11, name: "DKI JAKARTA" },
      { id: 12, name: "JAWA BARAT" },
      { id: 13, name: "JAWA TENGAH" },
      { id: 14, name: "DI YOGYAKARTA" },
      { id: 15, name: "JAWA TIMUR" },
      { id: 16, name: "BANTEN" },
      { id: 17, name: "BALI" },
      { id: 18, name: "NUSA TENGGARA BARAT" },
      { id: 19, name: "NUSA TENGGARA TIMUR" },
    ]);

    setRegencies([
      { id: 1, name: "KOTA BOGOR" },
      { id: 2, name: "KABUPATEN BOGOR" },
      { id: 3, name: "KABUPATEN SUKABUMI" },
      { id: 4, name: "KABUPATEN CIANJUR" },
      { id: 5, name: "KABUPATEN BANDUNG" },
      { id: 6, name: "KABUPATEN GARUT" },
      { id: 7, name: "KABUPATEN TASIKMALAYA" },
      { id: 8, name: "KABUPATEN CIAMIS" },
      { id: 9, name: "KABUPATEN KUNINGAN" },
      { id: 10, name: "KABUPATEN CIREBON" },
      { id: 11, name: "KABUPATEN MAJALENGKA" },
      { id: 12, name: "KABUPATEN SUMEDANG" },
      { id: 13, name: "KABUPATEN INDRAMAYU" },
      { id: 14, name: "KABUPATEN SUBANG" },
      { id: 15, name: "KABUPATEN PURWAKARTA" },
      { id: 16, name: "KABUPATEN KARAWANG" },
      { id: 17, name: "KABUPATEN BEKASI" },
      { id: 18, name: "KABUPATEN BANDUNG BARAT" },
      { id: 19, name: "KABUPATEN PANGANDARAN" },
    ]);

    setDistricts([
      { id: 1, name: "CIBEUNYING WETAN" },
      { id: 2, name: "CIBEUNYING KIDUL" },
      { id: 3, name: "COBLONG" },
      { id: 4, name: "SUKAJADI" },
      { id: 5, name: "SUKASARI" },
    ]);

    setVillages([
      { id: 1, name: "SUKARAJA" },
      { id: 2, name: "SUKAMAJU" },
      { id: 3, name: "SUKAHAJI" },
      { id: 4, name: "SUKASENANG" },
    ]);

    // If editing an existing address, fetch its data
    if (id) {
      // In a real app, this would be an API call
      // Mock data for now
      setName("Bandung");
      setDetail("Sukaraja");
      setProvince("JAWA BARAT");
      setRegency("KOTA BANDUNG");
      setDistrict("CIBEUNYING WETAN");
      setVillage("SUKARAJA");
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // In a real app, this would be an API call
    // For now, just navigate back
    navigate("/account/addresses");
  };

  return (
    <div className="card">
      <div className="p-4">
        <h3 className="mb-4">{id ? "Edit Alamat" : "Tambah Alamat Baru"}</h3>

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
            className="btn btn-primary w-100"
            style={{ marginTop: "1rem" }}
          >
            Simpan
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddressForm;
