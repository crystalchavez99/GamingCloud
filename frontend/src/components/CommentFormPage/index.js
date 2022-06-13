import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { addComment } from '../../store/comments';

function CommentForm({ song }) {
    const sessionUser = useSelector(state => state.session.user);
    const [body, setBody] = useState('');
    const [errors, setErrors] = useState([]);

    const history = useHistory();
    const dispatch = useDispatch();

    const handleSubmit = async e => {
        e.preventDefault();
        const payload = {
            body,
            songId: song.id,
            userId: sessionUser.id
        }
        return dispatch(addComment(payload))
            .then(() => {
                setErrors([]);
                setBody('');
                history.push(`/songs/${song.id}`);
            })
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);

            })



    }


    return (
        <div>
            <form onSubmit={handleSubmit}>
                {errors.length > 0 && (
                    <div className='errors'>
                        The following errors were found:
                        <ul className='errorList'>
                            {errors.map(error => (
                                <li key={error}>{error}</li>
                            ))}
                        </ul>
                    </div>
                )}
                <input
                    onChange={e => setBody(e.target.value)}
                    value={body}
                    placeholder="Write Comment"
                />
                <button className='uploadbutton' type='submit'>Upload</button>

            </form>
        </div>
    )
}
export default CommentForm;
