import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api";

function BarangForm() {
  const [kodeBarang, setKodeBarang] = useState("");
  const [nama, setNama] = useState("");
  const [kategori, setKategori] = useState("");
  const [harga, setHarga] = useState("");
  const navigate = useNavigate();
  const { id } = useParams(); // id = kode_barang

  useEffect(() => {
    if (id) {
      api.get(`/barang/${id}`).then((res) => {
        setKodeBarang(res.data.kode_barang);
        setNama(res.data.nama);
        setKategori(res.data.kategori);
        setHarga(res.data.harga);
      });
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      kode_barang: kodeBarang,
      nama,
      kategori,
      harga,
    };

    try {
      if (id) {
        await api.put(`/barang/${id}`, data);
      } else {
        await api.post("/barang", data);
      }

      navigate("/barang");
    } catch (error) {
      console.error("Gagal menyimpan data:", error);
      alert("Terjadi kesalahan saat menyimpan data.");
    }
  };

  return (
    <div className="container mt-4">
      <h2>{id ? "Edit Barang" : "Tambah Barang"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Kode Barang</label>
          <input
            type="text"
            className="form-control"
            value={kodeBarang}
            onChange={(e) => setKodeBarang(e.target.value)}
            required
            disabled={!!id} // disable jika edit
          />
        </div>

        <div className="mb-3">
          <label>Nama Barang</label>
          <input
            type="text"
            className="form-control"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label>Kategori</label>
          <input
            type="text"
            className="form-control"
            value={kategori}
            onChange={(e) => setKategori(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label>Harga</label>
          <input
            type="number"
            className="form-control"
            value={harga}
            onChange={(e) => setHarga(e.target.value)}
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

export default BarangForm;
