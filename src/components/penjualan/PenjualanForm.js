import React, { useEffect, useState } from "react";
import api from "../../api";
import { useNavigate, useParams } from "react-router-dom";

export default function PenjualanForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [idNota, setIdNota] = useState("");
  const [tgl, setTgl] = useState("");
  const [kodePelanggan, setKodePelanggan] = useState("");
  const [pelangganList, setPelangganList] = useState([]);

  useEffect(() => {
    api.get("/pelanggan").then((r) => setPelangganList(r.data));

    if (id) {
      api.get(`/penjualan/${id}`).then((r) => {
        setIdNota(r.data.id_nota);
        setTgl(r.data.tgl);
        setKodePelanggan(r.data.kode_pelanggan);
      });
    }
  }, [id]);

  const submit = async (e) => {
    e.preventDefault();

    if (id) {
      await api.put(`/penjualan/${id}`, {
        tgl,
        kode_pelanggan: kodePelanggan,
      });
    } else {
      await api.post("/penjualan", {
        id_nota: idNota,
        tgl,
        kode_pelanggan: kodePelanggan,
      });
    }

    navigate("/penjualan");
  };

  return (
    <div className="container mt-4">
      <h2>{id ? "Edit Penjualan" : "Tambah Penjualan"}</h2>

      <form onSubmit={submit}>
        {!id && (
          <div className="mb-3">
            <label>ID Nota</label>
            <input
              className="form-control"
              value={idNota}
              onChange={(e) => setIdNota(e.target.value)}
              required
            />
          </div>
        )}

        <div className="mb-3">
          <label>Tanggal</label>
          <input
            type="date"
            className="form-control"
            value={tgl}
            onChange={(e) => setTgl(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label>Pelanggan</label>
          <select
            className="form-select"
            value={kodePelanggan}
            onChange={(e) => setKodePelanggan(e.target.value)}
            required
          >
            <option value="">--Pilih Pelanggan--</option>
            {pelangganList.map((p) => (
              <option key={p.id_pelanggan} value={p.id_pelanggan}>
                {p.nama}
              </option>
            ))}
          </select>
        </div>

        <button className="btn btn-success" type="submit">
          Simpan
        </button>
      </form>
    </div>
  );
}
