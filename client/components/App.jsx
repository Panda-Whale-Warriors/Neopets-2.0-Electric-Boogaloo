import React from 'react';
import { useEffect, useState } from 'react';
import CreatePage from './CreatePage.jsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PetPage from './PetPage.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route
          exact
          path='/'
          Component={CreatePage}
        />
        <Route
          exact
          path='/petpage'
          Component={PetPage}
        />
        <Route
          exact
          path='/petpage/:id'
          Component={PetPage}
        />
        {/* <Route exact path='/login' Component={LoginPage} */}
      </Routes>
    </Router>
  );
}

export default App;
