import React, { useEffect, useState } from "react";
import api from "../../api";
import { Link } from "react-router-dom";

function PenjualanList() {
  const [penjualan, setPenjualan] = useState([]);

  const fetchPenjualan = async () => {
    try {
      const response = await api.get("/penjualan");
      setPenjualan(response.data);
    } catch (error) {
      console.error("Gagal mengambil data penjualan:", error);
    }
  };

  useEffect(() => {
    fetchPenjualan();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Yakin ingin menghapus data ini?")) {
      try {
        await api.delete(`/penjualan/${id}`);
        fetchPenjualan();
      } catch (error) {
        console.error("Gagal menghapus data:", error);
      }
    }
  };

  return (
    <div className="container mt-4">
      <h2>Daftar Penjualan</h2>
      <Link to="/penjualan/tambah" className="btn btn-primary mb-3">
        Tambah Penjualan
      </Link>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID_NOTA</th>
            <th>TGL</th>
            <th>ID_PELANGGAN</th>
            <th>SUBTOTAL</th>
            <th>AKSI</th>
          </tr>
        </thead>
        <tbody>
          {penjualan.map((item) => (
            <tr key={item.id_nota}>
              <td>{item.id_nota}</td>
              <td>{item.tgl}</td>
              <td>{item.pelanggan?.nama_pelanggan}</td>
              <td>{item.subtotal}</td>
              <td>
                <Link
                  to={`/penjualan/edit/${item.id}`}
                  className="btn btn-warning btn-sm me-2"
                >
                  Edit
                </Link>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(item.id)}
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

export default PenjualanList;
