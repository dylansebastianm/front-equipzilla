import { 
    GET_MOVIES,
    GET_MOVIES_TOP,
    GET_GENRES

} from "../Actions/types";

const initialState = {
    allMovies: [],
    allMoviesTop: [],
    allGenres: []


}

const rootReducer = (state = initialState , action) => {
    switch(action.type){
        case GET_MOVIES:
            console.log('GET_MOVIES action called with payload:', action.payload);
            return{
                ...state,
                allMovies: action.payload,              
            }
        case GET_MOVIES_TOP:
            console.log('GET_MOVIES_TOP action called with payload:', action.payload);
            return{
                ...state,
                allMoviesTop: action.payload,
               
            }
        case GET_GENRES:
            console.log('GET_GENRES action called with payload:', action.payload);
            return{
                ...state,
                allGenres: action.payload,
                
            }

            default: return{...state} 
         
}}

export default rootReducer;