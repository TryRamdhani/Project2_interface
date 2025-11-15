import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <Link className="navbar-brand" to="/">
        Interface API
      </Link>
      <div className="navbar-nav">
        <Link className="nav-item nav-link" to="/pelanggan">
          Pelanggan
        </Link>
        <Link className="nav-item nav-link" to="/barang">
          Barang
        </Link>
        <Link className="nav-item nav-link" to="/itemPenjualan">
          Item Penjualan
        </Link>
        <Link className="nav-item nav-link" to="/penjualan">
          Penjualan
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
