import React, { useEffect, useState } from "react";
import axios from "../../api";
import { useNavigate, useParams } from "react-router-dom";

export default function ItemPenjualanEdit() {
  const { id } = useParams();
  const [nota, setNota] = useState("");
  const [kodeBarang, setKodeBarang] = useState("");
  const [qty, setQty] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getItemById();
  }, []);

  const getItemById = async () => {
    try {
      const response = await axios.get(`/item_penjualan/${id}`);
      setNota(response.data.nota);
      setKodeBarang(response.data.kode_barang);
      setQty(response.data.qty);
    } catch (error) {
      console.error("Gagal memuat data:", error);
    }
  };

  const updateItem = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/item_penjualan/${id}`, {
        nota,
        kode_barang: kodeBarang,
        qty,
      });
      navigate("/item-penjualan");
    } catch (error) {
      console.error("Gagal mengupdate item:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Edit Item Penjualan</h2>
      <form onSubmit={updateItem}>
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
        <button type="submit" className="btn btn-success">
          Update
        </button>
      </form>
    </div>
  );
}
