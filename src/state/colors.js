import makeActionCreator from '../lib/make-action-creator';

import config from '../config';
import _ from 'lodash';

const colorStart = makeActionCreator('colors-COLOR_START');
const colorEnd = makeActionCreator('colors-COLOR_END');
const colorError = makeActionCreator('colors-COLOR_ERROR');

const updateColorStart = makeActionCreator('colors-UPDATE_COLOR_START');
const updateColorEnd = makeActionCreator('colors-UPDATE_COLOR_END');
const updateColorError = makeActionCreator('colors-UPDATE_COLOR_ERROR');


export function updateColor(index, color) {
  return function dispatcher(dispatch, getState) {
    dispatch(updateColorStart());

    const newColor = {
      id: index,
      color: color
    };

    const requestOptions = {
      body: JSON.stringify(newColor),
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
    };

    return window.fetch(`${config.API_URL}/colors`, requestOptions)
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
        throw new Error(`Update color Failed status ${res.status}`);
      })
      .then((resp) => {
        console.log('colors post resp', resp);
        dispatch(updateColorEnd(resp));
        return resp;
      })
      .catch((err) => {
        dispatch(updateColorError());
        throw err;
      });
  };
}


export function fetchColors() {
  return function dispatcher(dispatch) {
    dispatch(colorStart());

    const requestOptions = {
      method: 'GET',
    };

    return window.fetch(`${config.API_URL}/colors`, requestOptions)
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
        throw new Error(`Failed fetch ${res.status}`);
      })
      .then((json) => {
        console.log('colors get resp', json);
        dispatch(colorEnd(json));
        return json;
      })
      .catch((err) => {
        dispatch(colorError());
        throw err;
      });
  };
}


const initialState = {
  isFetchingColor: false,
  isUpdatingColor: false,
  colors: null,
};

export default function reducer(state = initialState, action) {
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
}
