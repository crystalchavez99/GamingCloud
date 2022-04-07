import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './UploadPage.css';
import { addSong } from '../../store/song';
let comp;
let chomp;
function UploadPage({ user }) {
    const sessionUser = useSelector(state => state.session.user);
    //console.log(sessionUser.id)
    const [title, setTitle] = useState('');
    const [genre, setGenre] = useState('');
    // const [audio, setAudio] = useState();
    // const [image, setImage] = useState();
    const [url, setUrl] = useState('');
    const [songCover, setSongCover] = useState('');
    const [errors, setErrors] = useState([]);
    const history = useHistory();
    const dispatch = useDispatch();
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
    if (!sessionUser) {
        return (
            <>
            <h1>MUST BE LOGGED IN TO UPLOAD</h1>

            </>
        );
    }
    // console.log(audio)
    const handleSubmit = async e => {
        e.preventDefault();
        const payload = {
            title,
            genre,
            url,//: comp.src,
            songCover,
            userId: sessionUser.id
        }
        await dispatch(addSong(payload));
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
        <div className='uploadPage'>
            <h1>Upload</h1>
            <p>Take your gaming music to the next level.</p>
            <p>To upload music and a song cover they must be in url based format with source attached.</p>
            <p>Would recommend converting that audio and image on https://cloudinary.com</p>
            <div className='upload'>

                <form onSubmit={handleSubmit}>
                    {errors.length > 0 && (
                        <div className='errors'>
                            The following errors were found:
                            <ul>
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
                        onChange={e => setSongCover(e.target.value)}
                        value={songCover}
                            placeholder="Song Cover"
                             />
                    </label>
                    <label>
                        Url
                        <input
                         onChange={e => setUrl(e.target.value)}
                            value={url}
                        placeholder="Url"
                         />
                         {/* {console.log(url)} */}
                    </label>
                    <button className='uploadbutton' type='submit'>Upload</button>
                </form>
            </div>
        </div>

    )
}
export default UploadPage;
