// frontend/src/store/session.js
import { csrfFetch } from './csrf';
// const ADDUSERS = 'user/ADDUSERS';
const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';

const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user,
  };
};

const removeUser = () => {
  return {
    type: REMOVE_USER,
  };
};

// const addUsers = users =>{
//   return {
//   type: ADDUSERS,
//   users
//   }
// }

export const signup = (user) => async (dispatch) => {
  console.log('thunk action')
  const { username, email, password, image } = user;
  const formData = new FormData()
  formData.append("username",username)
  formData.append("email",email)
  formData.append("password",password)
  if(image) formData.append("image",image)
  const response = await csrfFetch("/api/users/", {
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    body: formData,
  });
  console.log('response thunk',response)
  const data = await response.json();
  dispatch(setUser(data.user));
  console.log('thunk data',data)
  return response;
};

export const login = (user) => async (dispatch) => {
  const { credential, password } = user;
  const response = await csrfFetch('/api/session', {
    method: 'POST',
    body: JSON.stringify({
      credential,
      password,
    }),
  });
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};

export const restoreUser = () => async dispatch => {
  const response = await csrfFetch('/api/session');
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};

export const logout = () => async (dispatch) => {
  const response = await csrfFetch('/api/session', {
    method: 'DELETE',
  });
  dispatch(removeUser());
  return response;
};

// export const getAllUsers =() =>async(dispatch) =>{
//   const response = await fetch('/api/users')

//   if(response.ok){
//       const data = await response.json();
//       //console.log('data usre',data);
//       dispatch(addUsers(data.users));
//       return data
//   }
// }

const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    case REMOVE_USER:
      newState = Object.assign({}, state);
      newState.user = null;
      return newState;
    // case ADDUSERS: {
    //   const listUsers = {};
    //   action.users.forEach(user=>{
    //       listUsers[user.id] = user;
    //   })
    //   return {...listUsers,...state.users};
    // }
    default:
      return state;
  }
};

export default sessionReducer;
