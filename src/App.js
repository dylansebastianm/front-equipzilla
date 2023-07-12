import './App.css';
import Nav from "./Components/Nav/Nav"
import Footer from './Components/Footer/Footer';
import {useDispatch} from "react-redux";
import React, { useEffect } from 'react';
import CardsHome from './Containers/CardsHome/CardsHome';
import { getGenres, getMovies } from './Actions';
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Metrics from './Containers/Metrics/Metrics';






export default function App() {
  const dispatch = useDispatch();

  
  useEffect(() => {
    getMovies();
  }, [dispatch]);
 
    
  useEffect(() => {
    getGenres();
  }, [dispatch]);


  const CombinedComponents = () => (
    <React.Fragment>
      <iframe 

      src="https://www.youtube.com/embed/YoZfBmtArtE" 
      title="YouTube video player" 
      frameborder="0" 
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
      allowfullscreen
      className='video-nav'
      />

      <CardsHome />
  </React.Fragment>
  );

  return (
    <div className="App">
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<CombinedComponents/>} />
        <Route path="/metrics" element={<Metrics />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  </div>
  );
}

