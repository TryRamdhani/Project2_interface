import React, { useEffect, useState } from "react";
import api from "../../api";
import { useNavigate, useParams } from "react-router-dom";

export default function ItemPenjualanForm() {
  const { id, nota } = useParams(); // ← gunakan 'nota' sesuai route
  const navigate = useNavigate();

  const [notaState, setNotaState] = useState(nota || "");
  const [kodeBarang, setKodeBarang] = useState("");
  const [qty, setQty] = useState(1);
  const [barangList, setBarangList] = useState([]);

  useEffect(() => {
    api.get("/barang").then((r) => setBarangList(r.data));

    if (id) {
      api.get(`/item-penjualan/${id}`).then((r) => {
        setNotaState(r.data.nota);
        setKodeBarang(r.data.kode_barang);
        setQty(r.data.qty);
      });
    }
  }, [id]);

  const submit = async (e) => {
    e.preventDefault();

    try {
      if (id) {
        await api.put(`/item-penjualan/${id}`, {
          kode_barang: kodeBarang,
          qty,
        });
      } else {
        await api.post("/item-penjualan", {
          nota: notaState,
          kode_barang: kodeBarang,
          qty,
        });
      }

      navigate(`/item-penjualan/list/${notaState}`);
    } catch (e) {
      console.error(e);
      alert("Gagal");
    }
  };

  return (
    <div className="container mt-4">
      <h2>{id ? "Edit Item" : "Tambah Item"}</h2>

      <form onSubmit={submit}>
        <div className="mb-3">
          <label>Nota</label>
          <input
            className="form-control"
            value={notaState}
            onChange={(e) => setNotaState(e.target.value)}
            required
            disabled={!!id || !!nota} // sudah benar
          />
        </div>

        <div className="mb-3">
          <label>Barang</label>
          <select
            className="form-select"
            value={kodeBarang}
            onChange={(e) => setKodeBarang(e.target.value)}
            required
          >
            <option value="">--Pilih Barang--</option>
            {barangList.map((b) => (
              <option key={b.kode_barang} value={b.kode_barang}>
                {b.nama_barang} ({b.kode_barang}) - {b.harga}
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
            min="1"
            onChange={(e) => setQty(e.target.value)}
            required
          />
        </div>

        <button className="btn btn-success" type="submit">
          Simpan
        </button>
      </form>
    </div>
  );
}
