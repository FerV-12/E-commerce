// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // ✅ import router components
import Landing from "./Landing"; 
import Product from "./Product";
import Cart from "./Cart"; // ✅ import Cart component
import About from "./About";
import Contact from "./Contact";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/product" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;
