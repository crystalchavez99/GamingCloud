const ADDUSERS = 'user/ADDUSERS';
const LOADUSER = 'user/LOADUSER';
const addUsers = users => {
    return {
        type: ADDUSERS,
        users
    }
}
const loadUser = user => {
    return {
        type: LOADUSER,
        user
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
    console.log('get user',user)
    const response = await fetch(`/api/users/${user}`);
    console.log('response usre',response)
    if(response.ok){
        const data = await response.json();
        console.log('data user', data)
        dispatch(loadUser(data.user))
        return data.user;
    }
}
const initialState = { user: null };

const userReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case ADDUSERS: {
            const listUsers = {};
            action.users.forEach(user => {
                listUsers[user.id] = user;
            });
            return { ...listUsers, ...state.users };
        }
        case LOADUSER: {
            return {
                ...state,
                [action.user.id]: {
                  ...state[action.user.id],
                  ...action.user
                }
              };
        }
        default:
            return state;
    }
};

export default userReducer;
