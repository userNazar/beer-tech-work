import React, { useEffect } from 'react';

import { useMyStore } from './store';
import DeskOfBeers from './components/DeskOfBeers';

import { Routes, Route } from 'react-router-dom';
import CardPage from './components/CardPage';

function App() {

  const { beerList, fetchBeerList } = useMyStore();

  useEffect(() => {
      fetchBeerList()
    // eslint-disable-next-line
  }, [])

  console.log(beerList)

  return (
    <>
      <Routes>
        <Route path='/' element={<DeskOfBeers />} />
        <Route path='/:id' element={<CardPage />} />
      </Routes>

    </>
  );
}

export default App;
