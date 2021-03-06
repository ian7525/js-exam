import { authLogin } from 'utils/authLogin';
import { LOGIN, SET_USERNAME, SET_HOSTINGS, DEL_HOSTINGS, LOGOUT } from './constants';

const initialState = {
  isLogin: false,
  username: localStorage.getItem('username'),
  hostings: JSON.parse(localStorage.getItem('hostings')) || [],
};

const login = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN: {
      return {
        ...state,
        isLogin: authLogin(action.password),
      };
    }
    case SET_USERNAME: {
      return {
        ...state,
        username: action.data,
      };
    }
    case SET_HOSTINGS: {
      return {
        ...state,
        hostings: action.data,
      };
    }
    case DEL_HOSTINGS: {
      return {
        ...state,
        hostings: action.data,
      };
    }
    case LOGOUT: {
      return {
        ...state,
        username: null,
        hostings: null,
      };
    }
    default:
      return state;
  }
};

export default login;
