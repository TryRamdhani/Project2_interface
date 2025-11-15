import React, { useEffect, useState } from "react";
import api from "../../api";
import { Link, useParams } from "react-router-dom";

export default function ItemPenjualanList() {
  const { nota } = useParams();
  const [items, setItems] = useState([]);
  const [penjualan, setPenjualan] = useState(null);

  const fetch = async () => {
    if (!nota) return;
    const res = await api.get(`/penjualan/${nota}`);
    setPenjualan(res.data);
    const it = await api.get("/item-penjualan");
    setItems(it.data.filter((i) => i.nota === nota));
  };

  useEffect(() => {
    fetch();
  }, [nota]);

  const del = async (id) => {
    if (!window.confirm("Hapus item?")) return;
    await api.delete(`/item-penjualan/${id}`);
    fetch();
  };

  return (
    <div className="container mt-4">
      <h2>Item Nota {nota}</h2>
      <div>Subtotal: {penjualan?.subtotal ?? 0}</div>
      <Link
        to={`/item-penjualan/tambah/${nota}`}
        className="btn btn-primary mb-3"
      >
        Tambah Item
      </Link>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Kode Barang</th>
            <th>Qty</th>
            <th>Harga</th>
            <th>Jumlah</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {items.map((it) => (
            <tr key={it.id}>
              <td>{it.id}</td>
              <td>{it.kode_barang}</td>
              <td>{it.qty}</td>
              <td>{it.barang?.harga ?? "-"}</td>
              <td>{(it.barang?.harga ?? 0) * it.qty}</td>
              <td>
                <Link
                  to={`/item-penjualan/edit/${it.id}`}
                  className="btn btn-warning btn-sm me-2"
                >
                  Edit
                </Link>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => del(it.id)}
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/penjualan" className="btn btn-secondary">
        Kembali
      </Link>
    </div>
  );
}
