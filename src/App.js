import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import PelangganList from "./components/pelanggan/PelangganList";
import PelangganForm from "./components/pelanggan/PelangganForm";
import BarangList from "./components/barang/BarangList";
import BarangForm from "./components/barang/BarangForm";
import PenjualanList from "./components/penjualan/PenjualanList";
import PenjualanForm from "./components/penjualan/PenjualanForm";
import ItemPenjualanList from "./components/itemPenjualan/ItemPenjualanList";
import ItemPenjualanAdd from "./components/itemPenjualan/ItemPenjualanAdd";
import ItemPenjualanEdit from "./components/itemPenjualan/ItemPenjualanEdit";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Pelanggan */}
        <Route path="/pelanggan" element={<PelangganList />} />
        <Route path="/pelanggan/tambah" element={<PelangganForm />} />
        <Route path="/pelanggan/edit/:id" element={<PelangganForm />} />

        {/* Barang */}
        <Route path="/barang" element={<BarangList />} />
        <Route path="/barang/tambah" element={<BarangForm />} />
        <Route path="/barang/edit/:id" element={<BarangForm />} />

        {/* Penjualan */}
        <Route path="/penjualan" element={<PenjualanList />} />
        <Route path="/penjualan/tambah" element={<PenjualanForm />} />
        <Route path="/penjualan/edit/:id" element={<PenjualanForm />} />

        {/*Item Penjualan */}
        <Route path="/itemPenjualan" element={<ItemPenjualanList />} />
        <Route path="/itemPenjualan/tambah" element={<ItemPenjualanAdd />} />
        <Route
          path="/item-penjualan/edit/:id"
          element={<ItemPenjualanEdit />}
        />
      </Routes>
    </Router>
  );
}

export default App;
