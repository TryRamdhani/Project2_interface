import React, { useState } from "react";
import axios from "../../api";
import { useNavigate } from "react-router-dom";

export default function ItemPenjualanAdd() {
  const [nota, setNota] = useState("");
  const [kodeBarang, setKodeBarang] = useState("");
  const [qty, setQty] = useState("");
  const navigate = useNavigate();

  const saveItem = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/item_penjualan", {
        nota,
        kode_barang: kodeBarang,
        qty,
      });
      navigate("/item-penjualan");
    } catch (error) {
      console.error("Gagal menambah item:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Tambah Item Penjualan</h2>
      <form onSubmit={saveItem}>
        <div className="mb-3">
          <label>Nota</label>
          <input
            type="text"
            className="form-control"
            value={nota}
            onChange={(e) => setNota(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label>Kode Barang</label>
          <input
            type="text"
            className="form-control"
            value={kodeBarang}
            onChange={(e) => setKodeBarang(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label>Qty</label>
          <input
            type="number"
            className="form-control"
            value={qty}
            onChange={(e) => setQty(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Simpan
        </button>
      </form>
    </div>
  );
}

