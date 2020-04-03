import { GET_VIDEOS, ADD_VIDEO, DELETE_VIDEO, VIDEOS_LOADING } from '../actions/types';


const initialState = {
    videos: [],
    loading: false 
}

export default function (state = initialState, action) {
    switch(action.type) {
        case GET_VIDEOS:
            return {
                ...state,
                videos: action.payload,
                loading: false
            };
    
        case DELETE_VIDEO:
            return {
                ...state,
                videos: state.videos.filter(video => video._id !== action.payload)
            };

        case ADD_VIDEO:
            return {
                ...state,
                videos: [action.payload, ...state.videos]
            };
        
        case VIDEOS_LOADING:
            return {
                ...state,
                loading: true
            };

        default:
            return state;
    }
}