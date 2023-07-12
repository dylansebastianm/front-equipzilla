import { Button, Card } from 'antd';
import { Image } from 'antd';
import React, { useEffect } from 'react';
import { StarOutlined, InfoCircleOutlined  } from '@ant-design/icons';
import Carousel from 'better-react-carousel';
import { useSelector, useDispatch } from 'react-redux';
import { getMovies } from '../../Actions';
import './CardsMovies.css';

const { Meta } = Card;

export default function CardsMovies({ onClick }) {
  const allMovies = useSelector((store) => store.allMovies);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMovies());
  }, [dispatch]);

  if (allMovies.length === 0) {
    return <div>Cargando...</div>;
  }

  const baseURL = 'https://image.tmdb.org/t/p/';
  const posterSize = 'w500';

  const handleClick = (movie) => {
    onClick(movie);
  };

  return (
    <div className="title-CardsMovies-container">
      
      <div className="cards-component-container-primario">
      <p className="title-genres">Most popular</p>
        {allMovies && allMovies.length > 0 ? (
          <Carousel cols={5} rows={1} gap={10} loop>
            {allMovies.map((movie) => {
              const imageURL = baseURL + posterSize + movie.img;

              return (
                <Carousel.Item key={movie.id}>
                  <Card
                    hoverable
                    style={{
                      width: 270,
                      height: 540,
                      backgroundColor: "#15171e"
                      
                    }}
                    className='allCards'
                    cover={
                      <Image
                        alt="example"
                        src={imageURL}
                        style={{ width: 260, height: 320 }}
                      />
                    }
                  >
                    <Meta
                      title={<div className="card-title">{movie.title}</div>}
                      description={
                        <div className="description-card-primario">
                          <div className="item-description-container-primario">
                            <div className="container-aux-primario">
                              <div className="pastilla">RATE:</div>
                              {movie.rate}{' '}
                              <StarOutlined className="starIcon" />
                            </div>

                            <div className="container-aux">
                              <div className="pastilla">DATE:</div>
                              {movie.date ? movie.date.split('-')[0] : ''}
                            </div>

                            <div className="genres-container-primario">
                              {movie.Genres.map((genre) => (
                                <div className="genres-pastilla-primario" key={genre.id}>
                                  {genre.name}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      }
                    />
                    <Button
                      onClick={() => handleClick(movie)}
                      className='button-see-more'>
                        See more details 
                        <InfoCircleOutlined 
                      className='icon-see-more'/>
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
