import React from 'react';
import Header from './components/header/Header';
import Home from './Pages/Home';
import NorFound from './Pages/NorFound';
import { Routes, Route } from 'react-router-dom';
import Cart from './Pages/Cart';

import './scss/app.scss';

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<NorFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
