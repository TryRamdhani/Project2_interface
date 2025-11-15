import React, { useEffect, useState } from "react";
import api from "../../api";
import { Link } from "react-router-dom";

export default function PenjualanList() {
  const [data, setData] = useState([]);

  const fetch = async () => {
    const res = await api.get("/penjualan");
    setData(res.data);
  };

  useEffect(() => {
    fetch();
  }, []);

  const del = async (id) => {
    if (!window.confirm("Hapus data?")) return;
    await api.delete(`/penjualan/${id}`);
    fetch();
  };

  return (
    <div className="container mt-4">
      <h2>Data Penjualan</h2>

      <Link to="/penjualan/tambah" className="btn btn-primary mb-3">
        Tambah Penjualan
      </Link>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID Nota</th>
            <th>Tanggal</th>
            <th>Pelanggan</th>
            <th>Subtotal</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data.map((p) => (
            <tr key={p.id_nota}>
              <td>{p.id_nota}</td>
              <td>{p.tgl}</td>
              <td>{p.pelanggan?.nama}</td>
              <td>{p.subtotal}</td>
              <td>
                <Link
                  to={`/penjualan/edit/${p.id_nota}`}
                  className="btn btn-warning btn-sm me-2"
                >
                  Edit
                </Link>
                <Link
                  to={`/item-penjualan/list/${p.id_nota}`}
                  className="btn btn-info btn-sm me-2"
                >
                  Items
                </Link>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => del(p.id_nota)}
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
