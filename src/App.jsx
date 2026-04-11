// src/App.js
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css'
// SVG Icons Component
export default function App() {
  const handleClick = () => {
    const el = document.getElementById("text");
    el.style.transform = "scale(1.2)";
    el.style.transition = "0.3s";
    setTimeout(() => {
      el.style.transform = "scale(1)";
    }, 300);
  };

  return (
    <div className="container">
      <h1 id="text">"SANIA IS RUDE"</h1>
      <button onClick={handleClick}>Click Me</button>
    </div>
  );
}
