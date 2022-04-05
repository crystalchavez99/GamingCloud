import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { addSong, editSong } from '../../store/song';
import { useParams } from 'react-router-dom';

function EditPage({song, user }) {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const { songId } = useParams();
    const songs = useSelector((state) => state.song);
    song = songs[songId];
    //console.log(sessionUser.id)
    const [title, setTitle] = useState(song.title);
    const [genre, setGenre] = useState(song.genre);
    const [url, setUrl] = useState(song.url);
    const [songCover, setSongCover] = useState(song.songCover);
    const history = useHistory();


    if(!sessionUser){
        return null;
    }

    const handleSubmit = e => {
        e.preventDefault();
        const payload = {
            ...song,
            title,
            genre,
            url,
            songCover,
            userId: sessionUser.id
        }
        dispatch(editSong(payload));
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
                        Song Cover
                        <input
                            onChange={e => setSongCover(e.target.value)}
                            value={songCover}
                            placeholder="Song Cover" />
                    </label>
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
export default EditPage;
