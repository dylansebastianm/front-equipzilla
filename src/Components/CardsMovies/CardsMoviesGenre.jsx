import { Card, Image, Button } from 'antd';
import { StarOutlined, InfoCircleOutlined  } from '@ant-design/icons';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import "./CardsMovies.css";
import { getGenres } from '../../Actions';
import Carousel from 'better-react-carousel'

const { Meta } = Card;

export default function CardsMovies({onClick}) {
  const allGenres = useSelector((store) => store.allGenres);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGenres());
  }, []);

  const moviesByGenre = {};

  allGenres.forEach(genre => {
    const genreName = genre.name;
    const movies = genre.Movies;
    moviesByGenre[genreName] = movies;
  });

  if (!allGenres) {
    return null;
  }

  const baseURL = 'https://image.tmdb.org/t/p/';
  const posterSize = 'w500';

  const handleClick = (movie) => {
    onClick(movie);
  };

  const genresMovies = Object.keys(moviesByGenre)

  return (
    <div className='cards-component-container'>
     

        {genresMovies.filter(genreName => moviesByGenre[genreName].length > 0).map(genreName => (
          <div key={genreName}>
            {moviesByGenre[genreName].length > 0 ? <p className='title-genres'>{`-${genreName}`.slice(1)}</p> : null}
            <div className={moviesByGenre[genreName].length <= 4 ? 'genres-container' : 'genres-container-aux'}>              
            {moviesByGenre[genreName].length <= 4 ? (
                moviesByGenre[genreName].map(movie => (
                  <div key={movie.id} >
                    <Card
                      hoverable
                      style={{
                        width: 270,
                        height: 470
                      }}
                      className='allCards'

                      cover={<Image alt="example" src={`${baseURL}${posterSize}${movie.img}`} style={{ width: 260, height: 320 }} />}
                    >
                      
                      <Meta
                        title={<div className='card-title'>{movie.title}</div>}
                        description={
                          <div className='description-card'>
                            <div className='item-description-container'>
                              <div className='container-aux'>
                                <div className='pastilla'>RATE:</div>
                                {movie.rate} <StarOutlined className='starIcon' />
                              </div>
                              <div className='container-aux'>
                                <div className='pastilla'>DATE:</div>
                                {movie.date ? movie.date.split('-')[0] : ''}
                              </div>
                            </div>
                          </div>
                        }
                      />
                       <Button
                        onClick={() => handleClick(movie)}
                        className='button-see-more2'>
                          See more details 
                          <InfoCircleOutlined 
                        className='icon-see-more'/>
                      </Button>
                    </Card>
                  </div>
                ))
              ) : (
                <Carousel cols={5} rows={1} gap={10} loop>
                  {moviesByGenre[genreName].map(movie => (
                    <Carousel.Item key={movie.id}>
                      <Card
                        hoverable
                        style={{
                          width: 270,
                          height: 470
                        }}
                        className='allCards'

                        cover={<Image alt="example" src={`${baseURL}${posterSize}${movie.img}`} style={{ width: 260, height: 320 }} />}
                      >
                        <Meta
                          title={<div className='card-title'>{movie.title}</div>}
                          description={
                            <div className='description-card'>
                              <div className='item-description-container'>
                                <div className='container-aux'>
                                  <div className='pastilla'>RATE:</div>
                                  {movie.rate} <StarOutlined className='starIcon' />
                                </div>
                                <div className='container-aux'>
                                  <div className='pastilla'>DATE:</div>
                                  {movie.date ? movie.date.split('-')[0] : ''}
                                </div>
                              </div>
                            </div>
                          }
                        />
                        <Button
                        onClick={() => handleClick(movie)}
                        className='button-see-more2'>
                          See more details 
                          <InfoCircleOutlined 
                        className='icon-see-more'/>
                      </Button>
                      </Card>
                    </Carousel.Item>
                  ))}
                </Carousel>
              )}
            </div>
          </div>
        ))}
   
    </div>
  );
}
