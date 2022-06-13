import { csrfFetch } from "./csrf";

const ADDCOMMENTS = 'comments/ADDCOMMENTS';
const ADDONECOMMENT= 'comments/ADDONECOMMENT';
const REMOVECOMMENT= 'comments/REMOVECOMMENT';


const addOneComment = comment =>{
    return{
        type: ADDONECOMMENT,
        comment
    }
}
const addComments = comments =>{
    return {
    type: ADDCOMMENTS,
    comments
    }
}
const removeComment = comment =>{
    return {
        type: REMOVECOMMENT,
        comment
    }
}

export const deleteComment = comment => async dispatch =>{
    //
    const response = await csrfFetch(`/api/comments/${comment.id}`,{
        method: 'DELETE'
    });
    if(response.ok){
        const data = await response.json();
        await dispatch(removeComment(data.comment));
    }
}

export const getAllComments = () =>async(dispatch) =>{
    const response = await fetch('/api/comments')

    if(response.ok){
        const data = await response.json();
        //
        dispatch(addComments(data.comments));
        return response
    }
}
export const addComment = comment => async dispatch =>{
    const response = await csrfFetch(`/api/comments/`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(comment)
    });
        const data = await response.json();
        dispatch(addOneComment(data))
        return response;

}
export const getComment = comment => async dispatch =>{
    const response = await fetch(`/api/comments/${comment.id}`);

    if(response.ok){
        const data = await response.json();
        dispatch(addOneComment(data.comment))
        return data.comment;
    }
}

const commentReducer = (state =[], action)=>{
    let newState;
    switch(action.type){
        case ADDCOMMENTS: {
            const listComments = {};
            action.comments.forEach(comment=>{
                listComments[comment.id] = comment;
            })
            return {...listComments,...state.comments};
        }
        case ADDONECOMMENT:
            console.log('action',action)
            newState = {...state, [action.comment.id]: action.comment};
            return newState;
         case REMOVECOMMENT:
             newState = {...state};
             delete newState[action.comment.id]
             return {...newState};
        default:
            return state;
    }

}

export default commentReducer;
