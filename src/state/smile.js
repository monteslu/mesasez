import makeActionCreator from '../lib/make-action-creator';

import config from '../config';
import _ from 'lodash';

const infoStart = makeActionCreator('smile-INFO_START');
const infoEnd = makeActionCreator('smile-INFO_END');
const infoError = makeActionCreator('smile-INFO_ERROR');

const updateInfoStart = makeActionCreator('smile-UPDATE_INFO_START');
const updateInfoEnd = makeActionCreator('smile-UPDATE_INFO_END');
const updateInfoError = makeActionCreator('smile-UPDATE_INFO_ERROR');

const updateLocalEnd = makeActionCreator('smile-UPDATE_LOCAL_END');


export function updateInfo() {
  return function dispatcher(dispatch, getState) {
    dispatch(updateInfoStart());

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

    return window.fetch(`${config.API_URL}/smile`, requestOptions)
      .then((res) => {
        if (res.status === 200) {
          return 'ok';
        }
        throw new Error(`Update info Failed status ${res.status}`);
      })
      .then((resp) => {
        dispatch(updateInfoEnd(resp));
        return resp;
      })
      .catch((err) => {
        dispatch(updateInfoError());
        throw err;
      });
  };
}

export function localUpdate(x, y) {
  return function dispatcher(dispatch, getState) {
    const { smile } = getState();

    console.log('local update', smile, x, y);

    smile.info[x][y] = smile.info[x][y] ? 0 : 1;
    dispatch(updateLocalEnd(smile.info));

  };
}

export function fetchInfo() {
  return function dispatcher(dispatch) {
    dispatch(infoStart());

    const requestOptions = {
      method: 'GET',
    };

    return window.fetch(`${config.API_URL}/smile`, requestOptions)
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
        throw new Error(`Failed fetch ${res.status}`);
      })
      .then((json) => {
        dispatch(infoEnd(json));
        return json;
      })
      .catch((err) => {
        dispatch(infoError());
        throw err;
      });
  };
}

const initialState = {
  isFetchingInfo: false,
  isUpdatingInfo: false,
  info: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case infoStart.type:
      return { ...state, isFetchingInfo: true };
    case infoEnd.type:
      var newInfo = action.payload.map(function(line){
        return _.padStart(Number(line).toString(2),8, '0').split('').map(function(a){
           return parseInt(a,10);
         });
      });
      return { ...state, isFetchingInfo: false, info: newInfo };
    case infoError.type:
      return { ...state, isFetchingInfo: false };
    case updateLocalEnd.type:
      return { ...state, isUpdatingInfo: false, info: action.payload };
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
