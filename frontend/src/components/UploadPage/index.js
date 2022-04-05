import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import './UploadPage.css';
import { addSong } from '../../store/song';

function UploadPage({ user }) {
    const [title, setTitle] = useState('');
    const [genre, setGenre] = useState('');
    const [url, setUrl] = useState('');
    const history = useHistory();
    const dispatch = useDispatch();

    const handleSubmit = e => {
        e.preventDefault();
        const payload = {
            title,
            genre,
            url
        }
        dispatch(addSong(payload));
        history.push("/");
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
