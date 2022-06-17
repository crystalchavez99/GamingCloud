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
        //
        dispatch(addUsers(data.users));
        return data
    }
    return response;
}

export const getUser = user => async dispatch =>{
    const response = await fetch(`/api/users/${user}`);
    if(response.ok){
        const user = await response.json();
        dispatch(loadUser(user.user))
        return user
    }
    return response
}
const initialState = {};

const userReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GETALLUSERS: {
            newState = {...state};
            action.payload.forEach(user => {
                newState[user.id] = user;
            });
            return { ...newState,...state};
        }
        case LOADUSER: {
            newState = {...state};
            newState[action.payload.id] = action.payload;
            return newState;
        }
        default:
            return state;
    }
};

export default userReducer;
