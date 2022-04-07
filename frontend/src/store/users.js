const ADDUSERS = 'user/ADDUSERS';
const addUsers = users => {
    return {
        type: ADDUSERS,
        users
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
        default:
            return state;
    }
};

export default userReducer;
