import React, { useEffect } from 'react';
import './App.css';
import Navbar from './components/navbar';
import ListComponent from './components/list';
import { getMoviesData } from './services/apiService';

function App() {
  useEffect(() => {
    const getData = async () => {
      await getMoviesData()
    }
    getData()
  }, [])
  return (
    <>
      <Navbar />
      <section className='main-section'>
        <ListComponent />
      </section>
    </>
  );
}

export default App;
