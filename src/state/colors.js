import { resetReducer, promiseHandler } from 'cooldux';
import config from '../config';

const { colorStart, colorEnd, colorError, colorHandler } = promiseHandler('color');
const { updateColorStart, updateColorEnd, updateColorError, updateColorHandler } = promiseHandler('updateColor');

export function updateColor(id, color) {
  return function dispatcher(dispatch, getState) {
    const requestOptions = {
      body: JSON.stringify({id, color}),
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
    };
    const fetchPromise = window.fetch(`${config.API_URL}/colors`, requestOptions);
    return updateColorHandler(fetchPromise.then(res => res.json()), dispatch);
  };
}

export function fetchColors() {
  return function dispatcher(dispatch) {
    const fetchPromise = window.fetch(`${config.API_URL}/colors`);
    return colorHandler(fetchPromise.then(res => res.json()), dispatch);
  };
}

const initialState = {
  isFetchingColor: false,
  isUpdatingColor: false,
  colors: null,
};

export default resetReducer(initialState, function(state = initialState, action) {
  switch (action.type) {
    case colorStart.type:
      return { ...state, isFetchingColor: true };
    case colorEnd.type:
      return { ...state, isFetchingColor: false, colors: action.payload};
    case colorError.type:
      return { ...state, isFetchingColor: false };
    case updateColorStart.type:
      return { ...state, isUpdatingColor: true };
    case updateColorEnd.type:
      return { ...state, isUpdatingColor: false, colors: action.payload };
    case updateColorError.type:
      return { ...state, isUpdatingColor: false };
    default:
      return state;
  }
});
