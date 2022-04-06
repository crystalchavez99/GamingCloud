import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { addComment } from '../../store/comments';

function CommentForm({ song }) {
    //console.log('comment song',song)
    const sessionUser = useSelector(state => state.session.user);
    const [body, setBody] = useState('');
    const history = useHistory();
    const dispatch = useDispatch();

    const handleSubmit = async e => {
        e.preventDefault();
        const payload = {
            body,
            songId: song.id,
            userId: sessionUser.id
        }
        await dispatch(addComment(payload));
        history.push(`/songs/${song.id}`);
        setBody('');
    }

    
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    onChange={e => setBody(e.target.value)}
                    value={body}
                    placeholder="Write Comment" />
                <button className='uploadbutton' type='submit'>Upload</button>

            </form>
        </div>
    )
}
export default CommentForm;
