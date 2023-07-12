import { GET_MOVIES, GET_MOVIES_TOP, GET_GENRES} from './types';
import axios from "axios";

export const getMoviesTop = () => {
  return async function (dispatch) {
    try {
      const response = await axios.get('https://servidor-s.up.railway.app/top');
      const movies = response.data;
      
      dispatch({
        type: GET_MOVIES_TOP,
        payload: movies
      });
    } catch (error) {
      console.log('Error download top moviesTop:', error);
    }
  };
};

export const getMovies = () => {
  return async function (dispatch) {
    try {
      const response = await axios.get('https://servidor-s.up.railway.app');
      const movies = response.data;
      
      dispatch({
        type: GET_MOVIES,
        payload: movies
      });
    } catch (error) {
      console.log('Error download movies:', error);
    }
  };
};

export const getGenres = () => {
  return async function (dispatch) {
    try {
      const response = await axios.get('https://servidor-s.up.railway.app/genres');
      const genres = response.data;
      
      dispatch({
        type: GET_GENRES,
        payload: genres
      });
    } catch (error) {
      console.log('Error download genres:', error);
    }
  };
};

