import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import ItemsList from "./show-all-items";
import ProductsList from "./show-all-products";
import SalesList from "./show-all-sales";

const Navbar = () => {

  return (
    <Router>
    <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
      <Link to="/" className="navbar-brand">FamHub</Link>
      <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
            <Link to="/items" className="nav-link">Inventory</Link>
          </li>
          <li className="navbar-item">
            <Link to="/products" className="nav-link">Products</Link>
          </li>
          <li className="navbar-item">
            <Link to="/sales" className="nav-link">Sales</Link>
          </li>
        </ul>
      </div>
      </nav>
      <Routes>
        <Route path="/items" exact element={<ItemsList />} />
        <Route path="/products" element={<ProductsList />} />
        <Route path="/sales" element={<SalesList />} />
      </Routes>
    </Router>
  );
}

export default Navbar;