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
const removeComment = commentId =>{
    return {
        type: REMOVECOMMENT,
        commentId
    }
}

export const deleteComment = commentId => async dispatch =>{
    const response = await csrfFetch(`/api/comments/${commentId}`,{
        method: 'DELETE'
    });
    if(response.ok){
        const data = await response.json();
        await dispatch(removeComment(data.commentId));
    }
}

export const getAllComments = () =>async(dispatch) =>{
    const response = await fetch('/api/comments')

    if(response.ok){
        const data = await response.json();
        //console.log(data);
        dispatch(addComments(data.comments));
        return response
    }
}
export const addComment = comment => async dispatch =>{
    const response = await csrfFetch(`/api/comments`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(comment)
    });
    if(response.ok){
        const data = await response.json();
        //console.log('add',data);
        dispatch(addOneComment(data.comment))
    }
}
export const getComment = commentId => async dispatch =>{
    const response = await fetch(`/api/comments/${commentId}`);

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
            newState = {...state, [action.comment.id]: action.comment};
            return newState;
         case REMOVECOMMENT:
             newState = {...state};
             delete newState.comments[action.comment]
             return {...newState};
        default:
            return state;
    }

}

export default commentReducer;
