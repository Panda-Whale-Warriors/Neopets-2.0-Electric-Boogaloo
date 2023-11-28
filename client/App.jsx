import React from 'react';
import { useEffect, useState } from 'react';
import CreatePage from './components/CreatePage.jsx';
import { Route, Routes } from 'react-router-dom';
import PetPage from './components/PetPage.jsx';
import Login from './components/LoginPage.jsx';

const App = () => {
  return (
    <Routes>
      <Route
        exact
        path='/'
        element={<Login />}
      />

      <Route
        exact
        path='/petpage/:id'
        element={<PetPage />}
      />
      {/* <Route exact path='/login' Component={LoginPage} */}
    </Routes>
  );
};

export default App;
