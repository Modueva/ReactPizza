import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import NorFound from './Pages/NorFound';
import Cart from './Pages/Cart';
import FullPizza from './Pages/FullPizza';

import './scss/app.scss';
import MainLayout from './layouts/MainLayout';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route path="cart" element={<Cart />} />
        <Route path="pizza/:id" element={<FullPizza />} />
        <Route path="*" element={<NorFound />} />
      </Route>
    </Routes>
  );
}

export default App;
