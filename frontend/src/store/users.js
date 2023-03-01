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
        console.log(`get user thunk before dispatch`, user)
        dispatch(loadUser(user))
        console.log(`get user thunk`, user)
        //return user
    }
    return response
}
const initialState = {allUsers : [], profileUser : {}};

const userReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GETALLUSERS: {
            console.log(`get all state`, state)
            newState = {...state};
            console.log(`get all newState`, newState, newState.allUsers)
            action.payload.forEach(user => {
                newState.allUsers[user.id] = user;
            });
            return newState;
        }
        case LOADUSER: {
            newState = {...state};
            newState.profileUser = action.payload;
            console.log("LOAD USER AFTER", newState)
            return newState;
        }
        default:
            return state;
    }
};

export default userReducer;
