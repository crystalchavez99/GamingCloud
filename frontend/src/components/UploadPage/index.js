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
    const [songCover, setSongCover] = useState('');
    const history = useHistory();
    const dispatch = useDispatch();

    if (!sessionUser) {
        return null;
    }

    const handleSubmit = e => {
        e.preventDefault();
        const payload = {
            title,
            genre,
            url,
            songCover,
            userId: sessionUser.id
        }
        dispatch(addSong(payload));
        history.push("/songs");
    }
    return (
        <div>
            <h1>Upload</h1>
            <p>Take your gaming music to the next level.</p>
            <div className='upload'>
                <form onSubmit={handleSubmit}>
                    <label>
                        Title
                        <input
                            onChange={e => setTitle(e.target.value)}
                            value={title}
                            placeholder="Title" />
                    </label>
                    <label>
                        Genre
                        <input
                            onChange={e => setGenre(e.target.value)}
                            value={genre}
                            placeholder="Genre" />
                    </label>
                    <label>
                        Song Cover
                        <input
                            onChange={e => setSongCover(e.target.value)}
                            value={songCover}
                            placeholder="Song Cover" />
                    </label>
                    <label>
                        Url
                        <input
                            onChange={e => setUrl(e.target.value)}
                            value={url}
                            placeholder="Url" />
                    </label>
                    <button className='uploadbutton' type='submit'>Upload</button>
                </form>
            </div>
        </div>

    )
}
export default UploadPage;
