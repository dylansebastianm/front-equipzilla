import CardsMovies from "../../Components/CardsMovies/CardsMovies";
import CardsMoviesTop from "../../Components/CardsMovies/CardsMoviesTop";
import CardsMoviesGenre from "../../Components/CardsMovies/CardsMoviesGenre";
import CardDetail from "../../Components/CardDetail/CardDetail";
import Metrics from "../Metrics/Metrics"
import React, { useState } from 'react';
import "./CardsHome.css"

export default function CardsHome (){
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState(null);
  
    const handleClick = (movie) => {
      setSelectedMovie(movie)
      setModalOpen(true);
    };
  
    const handleModalClose = () => {
      setModalOpen(false);
    };
 

    
    return(
        <div className="CardsHome-container">
         
        
            <Metrics/>
               {isModalOpen && (
                <CardDetail movie={selectedMovie} handleModalClose={handleModalClose} handleModalOpen={handleClick}/>
            )}
      
            <CardsMovies onClick={handleClick}/>
            <CardsMoviesTop onClick={handleClick}/>
            <CardsMoviesGenre onClick={handleClick}/>

       
       
         </div>
    )
}
