import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api";

function PelangganForm() {
  const [idPelanggan, setIdPelanggan] = useState("");
  const [nama, setNama] = useState("");
  const [domisili, setDomisili] = useState("");
  const [jenisKelamin, setJenisKelamin] = useState("PRIA");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      api.get(`/pelanggan/${id}`).then((res) => {
        setIdPelanggan(res.data.id_pelanggan);
        setNama(res.data.nama);
        setDomisili(res.data.domisili);
        setJenisKelamin(res.data.jenis_kelamin);
      });
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      id_pelanggan: idPelanggan,
      nama,
      domisili,
      jenis_kelamin: jenisKelamin,
    };

    if (id) {
      await api.put(`/pelanggan/${id}`, data);
    } else {
      await api.post("/pelanggan", data);
    }

    navigate("/pelanggan");
  };

  return (
    <div className="container mt-4">
      <h2>{id ? "Edit Pelanggan" : "Tambah Pelanggan"}</h2>

      <form onSubmit={handleSubmit}>
        {/* INPUT ID PELANGGAN */}
        <div className="mb-3">
          <label>ID Pelanggan</label>
          <input
            className="form-control"
            value={idPelanggan}
            onChange={(e) => setIdPelanggan(e.target.value)}
            required
            disabled={!!id} // ketika edit, tidak bisa diubah
          />
        </div>

        <div className="mb-3">
          <label>Nama</label>
          <input
            className="form-control"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label>Domisili</label>
          <input
            className="form-control"
            value={domisili}
            onChange={(e) => setDomisili(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label>Jenis Kelamin</label>
          <select
            className="form-select"
            value={jenisKelamin}
            onChange={(e) => setJenisKelamin(e.target.value)}
          >
            <option value="PRIA">PRIA</option>
            <option value="WANITA">WANITA</option>
          </select>
        </div>

        <button className="btn btn-success" type="submit">
          Simpan
        </button>
      </form>
    </div>
  );
}

export default PelangganForm;
