import { Button, Card } from 'antd';
import { Image } from 'antd';
import React, { useEffect } from 'react';
import { StarOutlined, InfoCircleOutlined} from '@ant-design/icons';
import Carousel from 'better-react-carousel'
import { useSelector, useDispatch } from "react-redux";
import "./CardsMovies.css"
import { getMoviesTop } from '../../Actions';
const { Meta } = Card;

export default function CardsMoviesTop({ onClick }) {

 

  const allMoviesTop = useSelector((store) => store.allMoviesTop);


  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMoviesTop()); // Llamar a la acción que carga los datos de la API
  }, []);

  if (allMoviesTop.length === 0) {
    return <div>Cargando...</div>; // Mostrar mensaje de carga mientras el estado se llena
  }
  console.log("CONSOLE LOG CARDLIST", allMoviesTop);
  
  const baseURL = 'https://image.tmdb.org/t/p/';
  const posterSize = 'w500'; // Elige el tamaño deseado para la imagen del póster (puedes cambiarlo según tus necesidades)
  
  
  const handleClick = (movie) => {
    onClick(movie);
  };
  

  return (
    <div className='title-CardsMovies-container'>
   
    <div className='cards-component-container'>
    <p className='title-genres'>Top rated</p>
      {allMoviesTop && allMoviesTop.length > 0 ? (
      <Carousel cols={5} rows={1} gap={10} loop> 
 
      {allMoviesTop.map(e => {
      const imageURL = baseURL + posterSize + e.img;
     

      
      return (
        <Carousel.Item key={e.id}>
        <Card
        
              hoverable
              style={{
                width: 270,
                height: 540
              }}
              
              className='allCards'
              cover={<Image alt="example" src={imageURL} style={{ width: 260, height: 320 }} />}
              
            >
              <Meta
              
              title={<div className='card-title'>{e.title}</div>}
              description={
                <div className='description-card-primario'>
                  <div className='item-description-container-primario'>
                    <div className='container-aux-primario'>
                      <div className='pastilla'>RATE:</div>
                      {e.rate} <StarOutlined className='starIcon' />
                    </div>

                    <div className='container-aux'>
                      <div className='pastilla'>DATE:</div>
                      {e.date ? e.date.split('-')[0] : ''}
                    </div>

                    <div className='genres-container-primario'>
                      {e.Genres.map(e => {
                        return(
                          <div className='genres-pastilla-primario'>
                            {e.name}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              }
              />
               <Button
                onClick={() => handleClick(e)}
                className='button-see-more'
              >
                See more details 
                <InfoCircleOutlined className='icon-see-more' />
              </Button>
        </Card>
        </Carousel.Item>
  
      );
    })}
    </Carousel>
  ) : (
    <div>No hay películas disponibles.</div>
  )} 
  
    </div>
    </div>
    
  );
}


