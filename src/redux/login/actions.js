import filter from 'lodash/filter';
import {
  LOGIN,
  SET_USERNAME,
  SET_HOSTINGS,
  DEL_HOSTINGS,
  LOGOUT,
} from './constants';

export function submitPassword(password) {
  return {
    type: LOGIN,
    password,
  };
}

export function setUsername(data) {
  localStorage.setItem('username', data);
  return {
    type: SET_USERNAME,
    data,
  };
}

export function setHostings(roomId) {
  let hostings = JSON.parse(localStorage.getItem('hostings'));
  if (!hostings) hostings = [];
  hostings.push(roomId);
  localStorage.setItem('hostings', JSON.stringify(hostings));
  return {
    type: SET_HOSTINGS,
    data: hostings,
  };
}

export function deleteHostings(roomId) {
  let hostings = JSON.parse(localStorage.getItem('hostings'));
  hostings = filter(hostings, id => id !== roomId);
  localStorage.setItem('hostings', JSON.stringify(hostings));
  return {
    type: DEL_HOSTINGS,
    data: hostings,
  };
}

export function clearUser() {
  localStorage.removeItem('username');
  localStorage.removeItem('hostings');
  return {
    type: LOGOUT,
  };
}
