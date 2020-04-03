import { GET_VIDEOS, ADD_VIDEO, DELETE_VIDEO, VIDEOS_LOADING } from './types';
import axios from 'axios';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';

export const getVideos = () => dispatch => {
    // dispatch our loading type,
    dispatch(setVideosLoading());
    axios
        .get('/api/videos')
        .then(res => dispatch({
            type: GET_VIDEOS,
            payload: res.data
        }))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

export const deleteVideo = (id) => (dispatch, getState) => {
    axios
        .delete(`/api/videos/${id}`, tokenConfig(getState))
        .then(res => dispatch({
            type: DELETE_VIDEO,
            payload: id
        }))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

export const addVideo = (video) => (dispatch, getState) => {
    axios
        .post('/api/videos', video, tokenConfig(getState))
        .then(res => dispatch({
            type: ADD_VIDEO,
            payload: res.data
        }))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

export const setVideosLoading = () => {
    return {
        type: VIDEOS_LOADING
    }
}