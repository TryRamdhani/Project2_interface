import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api";

function PenjualanForm() {
  const [idNota, setIdNota] = useState("");
  const [tgl, setTgl] = useState("");
  const [idPelanggan, setIdPelanggan] = useState("");
  const [subtotal, setSubtotal] = useState("");
  const [pelangganList, setPelangganList] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  // Ambil data pelanggan untuk dropdown
  useEffect(() => {
    api.get("/pelanggan").then((res) => {
      setPelangganList(res.data);
    });
  }, []);

  // Jika edit data, ambil data penjualan
  useEffect(() => {
    if (id) {
      api.get(`/penjualan/${id}`).then((res) => {
        setIdNota(res.data.id_nota);
        setTgl(res.data.tgl);
        setIdPelanggan(res.data.id_pelanggan);
        setSubtotal(res.data.subtotal);
      });
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      id_nota: idNota,
      tgl,
      id_pelanggan: idPelanggan,
      subtotal,
    };

    try {
      if (id) {
        await api.put(`/penjualan/${id}`, data);
      } else {
        await api.post("/penjualan", data);
      }
      navigate("/penjualan");
    } catch (error) {
      console.error("Gagal menyimpan data:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>{id ? "Edit Penjualan" : "Tambah Penjualan"}</h2>
      <form onSubmit={handleSubmit}>
        {/* ID Nota Manual */}
        <div className="mb-3">
          <label>ID Nota</label>
          <input
            type="text"
            className="form-control"
            value={idNota}
            onChange={(e) => setIdNota(e.target.value)}
            required
            disabled={!!id} // saat edit, ID tidak boleh diubah
          />
        </div>

        {/* Tanggal */}
        <div className="mb-3">
          <label>Tanggal Penjualan</label>
          <input
            type="date"
            className="form-control"
            value={tgl}
            onChange={(e) => setTgl(e.target.value)}
            required
          />
        </div>

        {/* Dropdown Pelanggan */}
        <div className="mb-3">
          <label>Pelanggan</label>
          <select
            className="form-select"
            value={idPelanggan}
            onChange={(e) => setIdPelanggan(e.target.value)}
            required
          >
            <option value="">-- Pilih Pelanggan --</option>
            {pelangganList.map((p) => (
              <option key={p.id_pelanggan} value={p.id_pelanggan}>
                {p.nama_pelanggan} (ID: {p.id_pelanggan})
              </option>
            ))}
          </select>
        </div>

        {/* Subtotal */}
        <div className="mb-3">
          <label>Subtotal</label>
          <input
            type="number"
            className="form-control"
            value={subtotal}
            onChange={(e) => setSubtotal(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-success">
          Simpan
        </button>
      </form>
    </div>
  );
}

export default PenjualanForm;
