import React, { useEffect, useState } from "react";
import api from "../../api";
import { Link } from "react-router-dom";

function PelangganList() {
  const [pelanggan, setPelanggan] = useState([]);

  const fetchPelanggan = async () => {
    try {
      const response = await api.get("/pelanggan");
      setPelanggan(response.data);
    } catch (error) {
      console.error("Gagal mengambil data pelanggan:", error);
    }
  };

  useEffect(() => {
    fetchPelanggan();
  }, []);

  const handleDelete = async (id_pelanggan) => {
    if (window.confirm("Yakin ingin menghapus data ini?")) {
      try {
        await api.delete(`/pelanggan/${id_pelanggan}`);
        fetchPelanggan();
      } catch (error) {
        console.error("Gagal menghapus data:", error);
      }
    }
  };

  return (
    <div className="container mt-4">
      <h2>Daftar Pelanggan</h2>
      <Link to="/pelanggan/tambah" className="btn btn-primary mb-3">
        Tambah Pelanggan
      </Link>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nama</th>
            <th>Domisili</th>
            <th>Jenis Kelamin</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {pelanggan.map((item) => (
            <tr key={item.id_pelanggan}>
              <td>{item.id_pelanggan}</td>
              <td>{item.nama}</td>
              <td>{item.domisili}</td>
              <td>{item.jenis_kelamin}</td>
              <td>
                <Link
                  to={`/pelanggan/edit/${item.id_pelanggan}`}
                  className="btn btn-warning btn-sm me-2"
                >
                  Edit
                </Link>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(item.id_pelanggan)}
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

export default PelangganList;
