import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api";

function ItemPenjualanForm() {
  const [nota, setNota] = useState("");
  const [kodeBarang, setKodeBarang] = useState("");
  const [qty, setQty] = useState("");
  const [notaList, setNotaList] = useState([]);
  const [barangList, setBarangList] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    // Ambil daftar nota dari tabel penjualan
    api.get("/penjualan").then((res) => setNotaList(res.data));

    // Ambil daftar barang
    api.get("/barang").then((res) => setBarangList(res.data));
  }, []);

  useEffect(() => {
    if (id) {
      api.get(`/item-penjualan/${id}`).then((res) => {
        setNota(res.data.nota);
        setKodeBarang(res.data.kode_barang);
        setQty(res.data.qty);
      });
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = { nota, kode_barang: kodeBarang, qty };

    try {
      if (id) {
        await api.put(`/item-penjualan/${id}`, data);
      } else {
        await api.post("/item-penjualan", data);
      }
      navigate("/item-penjualan");
    } catch (error) {
      console.error("Gagal menyimpan data:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>{id ? "Edit Item Penjualan" : "Tambah Item Penjualan"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Nota</label>
          <select
            className="form-select"
            value={nota}
            onChange={(e) => setNota(e.target.value)}
            required
          >
            <option value="">-- Pilih Nota --</option>
            {notaList.map((n) => (
              <option key={n.id_nota} value={n.id_nota}>
                {n.id_nota}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label>Kode Barang</label>
          <select
            className="form-select"
            value={kodeBarang}
            onChange={(e) => setKodeBarang(e.target.value)}
            required
          >
            <option value="">-- Pilih Barang --</option>
            {barangList.map((b) => (
              <option key={b.kode_barang} value={b.kode_barang}>
                {b.nama_barang} ({b.kode_barang})
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label>Qty</label>
          <input
            type="number"
            className="form-control"
            value={qty}
            onChange={(e) => setQty(e.target.value)}
            min="1"
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

export default ItemPenjualanForm;
