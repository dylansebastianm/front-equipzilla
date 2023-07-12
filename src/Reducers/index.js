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
            
            return{
                ...state,
                allMovies: action.payload,              
            }
        case GET_MOVIES_TOP:
      
            return{
                ...state,
                allMoviesTop: action.payload,
               
            }
        case GET_GENRES:
           
            return{
                ...state,
                allGenres: action.payload,
                
            }

            default: return{...state} 
         
}}

export default rootReducer;