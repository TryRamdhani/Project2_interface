import React, { useEffect, useState } from "react";
import axios from "../../api";
import { useNavigate } from "react-router-dom";

export default function ItemPenjualanList() {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  const getItems = async () => {
    try {
      const response = await axios.get("/item_penjualan");
      setItems(response.data);
    } catch (error) {
      console.error("Gagal memuat data:", error);
    }
  };

  const deleteItem = async (id) => {
    if (window.confirm("Yakin ingin menghapus item ini?")) {
      try {
        await axios.delete(`/item_penjualan/${id}`);
        getItems();
      } catch (error) {
        console.error("Gagal menghapus item:", error);
      }
    }
  };

  useEffect(() => {
    getItems();
  }, []);

  return (
    <div className="container mt-4">
      <h2>Daftar Item Penjualan</h2>
      <button
        onClick={() => navigate("/item-penjualan/tambah")}
        className="btn btn-primary mb-3"
      >
        Tambah Item
      </button>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nota</th>
            <th>Kode Barang</th>
            <th>Qty</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {items.length > 0 ? (
            items.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.nota}</td>
                <td>{item.kode_barang}</td>
                <td>{item.qty}</td>
                <td>
                  <button
                    onClick={() => navigate(`/item-penjualan/edit/${item.id}`)}
                    className="btn btn-warning btn-sm me-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteItem(item.id)}
                    className="btn btn-danger btn-sm"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                Tidak ada data.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
