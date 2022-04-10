import React, { useState,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { addSong, editSong } from '../../store/song';
import { useParams } from 'react-router-dom';
let comp;
let chomp;
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
    const [errors, setErrors] = useState([]);
    // const [audio, setAudio] = useState();
    // const [image, setImage] = useState();
    const history = useHistory();
    useEffect(() => {
        const errors = [];
        if (!title) {
            errors.push('Please provide a title!')
        }
        if (!genre) {
            errors.push('Please provide a genre!')
        }
        if (!url) {
            errors.push('Please provide a url!')
        }
        if(songCover.length > 255){
            errors.push('Too long of a song cover url!!')
        }
        if (!songCover) {
            errors.push('Please provide a songCover!')
        }
        setErrors(errors)
        //console.log(errors)
    }, [title, genre, url, songCover]);

    // useEffect(()=>{
    //     if(audio){
    //         comp = new Audio(audio);
    //         setUrl(comp.src)
    //         //console.log('url',url)
    //         //console.log('audio',comp.src)
    //     }
    //     if(image){
    //         chomp = new Image(image);
    //         setSongCover(chomp.src)
    //         //console.log('url',url)
    //         //console.log('image',chomp.src)
    //     }
    // },[audio,image])
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
        setErrors([]);
        history.push("/songs");
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
    return (
        <div>
            <h1>Upload Page</h1>
            <div className='upload'>
                <form onSubmit={handleSubmit} className='add-song'>
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
                    </label>
                    <input
                        onChange={e => setTitle(e.target.value)}
                        value={title}
                        placeholder="Title"
                        required>
                    </input>
                    <label>
                        Genre
                    </label>
                    <input
                        onChange={e => setGenre(e.target.value)}
                        value={genre}
                        placeholder="Genre"
                        required>
                    </input>
                    <label>
                        Song Cover
                        <input
                        type="url"
                        onChange={e => setSongCover(e.target.value)}
                        value={songCover}
                            placeholder="Song Cover"
                            required
                             />
                    </label>
                    <label>
                        Url
                        <input
                        type="url"
                         onChange={e => setUrl(e.target.value)}
                            value={url}
                        placeholder="Url"
                        required
                         />
                         {/* {console.log(url)} */}
                    </label>
                    <button className='uploadbutton' type='submit'>Upload</button>
                </form>
            </div>
        </div>

    )
}
export default EditPage;
