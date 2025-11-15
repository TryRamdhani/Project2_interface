import React, { useEffect, useState } from "react";
import api from "../../api";
import { Link } from "react-router-dom";

function BarangList() {
  const [barang, setBarang] = useState([]);

  const fetchBarang = async () => {
    try {
      const response = await api.get("/barang");
      setBarang(response.data);
    } catch (error) {
      console.error("Gagal mengambil data barang:", error);
    }
  };

  useEffect(() => {
    fetchBarang();
  }, []);

  const handleDelete = async (kode_barang) => {
    if (window.confirm("Yakin ingin menghapus data ini?")) {
      try {
        await api.delete(`/barang/${kode_barang}`);
        fetchBarang();
      } catch (error) {
        console.error("Gagal menghapus data:", error);
      }
    }
  };

  return (
    <div className="container mt-4">
      <h2>Daftar Barang</h2>
      <Link to="/barang/tambah" className="btn btn-primary mb-3">
        Tambah Barang
      </Link>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Kode Barang</th>
            <th>Nama Barang</th>
            <th>Kategori</th>
            <th>Harga</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {barang.map((item) => (
            <tr key={item.kode_barang}>
              <td>{item.kode_barang}</td>
              <td>{item.nama}</td>
              <td>{item.kategori}</td>
              <td>{item.harga}</td>
              <td>
                <Link
                  to={`/barang/edit/${item.kode_barang}`}
                  className="btn btn-warning btn-sm me-2"
                >
                  Edit
                </Link>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(item.kode_barang)}
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

export default BarangList;
