import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './UploadPage.css';
import { addSong } from '../../store/song';

function UploadPage({ user }) {
    const sessionUser = useSelector(state => state.session.user);
    //console.log(sessionUser.id)
    const [title, setTitle] = useState('');
    const [genre, setGenre] = useState('');
    const [url, setUrl] = useState('');
    const history = useHistory();
    const dispatch = useDispatch();

    if(!sessionUser){
        return null;
    }

    const handleSubmit = e => {
        e.preventDefault();
        const payload = {
            title,
            genre,
            url,
            userId: sessionUser.id
        }
        dispatch(addSong(payload));
        history.push("/songs");
    }
    return (
        <div>
            <h1>Upload Page</h1>
            <div className='upload'>
                <form onSubmit={handleSubmit} className='add-song'>
                    <label>
                        Title
                    </label>
                    <input
                        onChange={e => setTitle(e.target.value)}
                        value={title}
                        placeholder="Title">
                    </input>
                    <label>
                        Genre
                    </label>
                    <input
                        onChange={e => setGenre(e.target.value)}
                        value={genre}
                        placeholder="Title">
                    </input>
                    <label>
                        Url
                    </label>
                    <input
                        onChange={e => setUrl(e.target.value)}
                        value={url}
                        placeholder="Title">
                    </input>
                    <button className='uploadbutton' type='submit'>Upload</button>
                </form>
            </div>
        </div>

    )
}
export default UploadPage;
