const GETALLUSERS = 'user/GETALLUSERS';
const LOADUSER = 'user/LOADUSER';
const addUsers = users => {
    return {
        type: GETALLUSERS,
        payload:users
    }
}
const loadUser = user => {
    return {
        type: LOADUSER,
        payload:user
    }
}
export const getAllUsers = () => async (dispatch) => {
    const response = await fetch('/api/users')

    if (response.ok) {
        const data = await response.json();
        dispatch(addUsers(data.users));
    }
    return response;
}

export const getUser = (userName) => async dispatch =>{
    const response = await fetch(`/api/users/${userName}`);
    if(response.ok){
        const user = await response.json();
        dispatch(loadUser(user.user))
        //return user
    }
    return response
}
const initialState = {allUsers : [], profileUser : {}};

const userReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GETALLUSERS: {
            newState = {...state};
            action.payload.forEach(user => {
                newState.allUsers[user.id] = user;
            });
            return newState;
        }
        case LOADUSER: {
            newState = {...state}
            newState.profileUser = action.payload;
            return newState;
        }
        default:
            return state;
    }
};

export default userReducer;
