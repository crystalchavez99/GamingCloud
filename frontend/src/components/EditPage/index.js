import React, { useState,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { editSong, getSong } from '../../store/song';
import { useParams } from 'react-router-dom';
import '../UploadPage/UploadPage.css';
function EditPage({song, user }) {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const { songId } = useParams();
    const songs = useSelector((state) => state.song);
    song = songs[songId];
    const [title, setTitle] = useState(song.title);
    const [genre, setGenre] = useState(song.genre);
    const [url, setUrl] = useState(song.url);
    const [songCover, setSongCover] = useState(song.songCover);
    const [errors, setErrors] = useState([]);
    const [audio, setAudio] = useState(song.audio)

    // const [audio, setAudio] = useState();
    // const [image, setImage] = useState();
    const history = useHistory();

    // useEffect(()=>{
    //     dispatch(getSong(song?.id))
    // },[dispatch,song])

    if(!sessionUser){
        return null;
    }

    const handleSubmit = async e => {
        e.preventDefault();
        const payload = {
            ...song,
            title,
            genre,
            songCover,
            audio,
            userId: sessionUser.id
        }
        dispatch(editSong(payload))
        .then(()=>{
            setErrors([]);
            history.push('/songs');
        })
        .catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) setErrors(data.errors);

          })
    }
    // const addSongFile = (e) => {
    //     if (e.target.files[0]) {
    //       setAudio(URL.createObjectURL(e.target.files[0]));
    //     }

    //   };
    // const addImageFile = (e) => {
    //     if (e.target.files[0]) {
    //         setSongCover(URL.createObjectURL(e.target.files[0]));
    //     }

    //   };
    const updateFile = (e) => {
        const file = e.target.files[0];
        if (file) setAudio(file);
    };
    return (
        <div className='uploadPage'>
            <h1>Upload Page</h1>
            <div className='upload'>
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
                    <label>
                        Title
                        <input
                        onChange={e => setTitle(e.target.value)}
                        value={title}
                        placeholder="Title"
                        />
                    </label>

                    <label>
                        Genre
                        <input
                        onChange={e => setGenre(e.target.value)}
                        value={genre}
                        placeholder="Genre"
                        />
                    </label>

                    <label>
                        Song Cover
                        <input
                        type="url"
                        onChange={e => setSongCover(e.target.value)}
                        value={songCover}
                            placeholder="Song Cover"

                             />
                    </label>
                    <label id="upload-song">
                        Audio
                        <input type="file" onChange={updateFile} className='url-input'/>
                    </label>
                    <button className='uploadbutton' type='submit'>Upload</button>
                </form>
            </div>
        </div>

    )
}
export default EditPage;
