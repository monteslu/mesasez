import _ from 'lodash';
import { makeActionCreator, promiseHandler } from 'cooldux';
import config from '../config';

const { infoStart, infoEnd, infoError, infoHandler } = promiseHandler('info');
const { updateInfoStart, updateInfoEnd, updateInfoError, updateInfoHandler } = promiseHandler('updateInfo');

export const updateLocal = makeActionCreator('smile-UPDATE_LOCAL');


export function updateInfo() {
  return function dispatcher(dispatch, getState) {
    const { smile } = getState();

    const picBytes = smile.info.map(function(line){
      return parseInt(line.join(''), 2);
    });

    const requestOptions = {
      body: JSON.stringify(picBytes),
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
    };

    const fetchPromise = window.fetch(`${config.API_URL}/smile`, requestOptions);
    return updateInfoHandler(fetchPromise, dispatch);
  };
}

export function fetchInfo() {
  return function dispatcher(dispatch) {
      const fetchPromise = window.fetch(`${config.API_URL}/smile`);
      return infoHandler(fetchPromise.then(res => res.json()), dispatch);
  };
}

const initialState = {
  isFetchingInfo: false,
  isUpdatingInfo: false,
  info: null,
};

export default function reducer(state = initialState, { payload, type }) {
  switch (type) {
    case infoStart.type:
      return { ...state, isFetchingInfo: true };
    case infoEnd.type:
      var newInfo = payload.map(function(line){
        return _.padStart(Number(line).toString(2),8, '0').split('').map(function(a){
           return parseInt(a,10);
         });
      });
      return { ...state, isFetchingInfo: false, info: newInfo };
    case infoError.type:
      return { ...state, isFetchingInfo: false };
    case updateLocal.type:
      state.info[payload.x][payload.y] = state.info[payload.x][payload.y] ? 0 : 1;
      return { ...state };
    case updateInfoStart.type:
      return { ...state, isUpdatingInfo: true };
    case updateInfoEnd.type:
      return { ...state, isUpdatingInfo: false };
    case updateInfoError.type:
      return { ...state, isUpdatingInfo: false };
    default:
      return state;
  }
}
