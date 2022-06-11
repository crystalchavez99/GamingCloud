const ADDUSERS = 'user/ADDUSERS';
const LOADUSER = 'user/LOADUSER';
const addUsers = users => {
    return {
        type: ADDUSERS,
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
        //console.log('data usre',data);
        dispatch(addUsers(data.users));
        return data
    }
}

export const getUser = user => async dispatch =>{
    const response = await fetch(`/api/users/${user}`);
    if(response.ok){
        const user = await response.json();
        dispatch(loadUser(user.user))
    }
    return response
}
const initialState = {};

const userReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case ADDUSERS: {
            newState = {...state};
            action.payload.forEach(user => {
                newState[user.id] = user;
            });
            return { ...newState, ...state };
        }
        case LOADUSER: {
            newState = {state};
            newState[action.payload.id] = action.payload;
            return newState;
        }
        default:
            return state;
    }
};

export default userReducer;
