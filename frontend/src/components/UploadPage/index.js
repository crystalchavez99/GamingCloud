import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import './UploadPage.css';
import { addSong } from '../../store/song';
// import {LoginFormModal} from "../LoginFormPage/newIndex";

function UploadPage({ user }) {
    const sessionUser = useSelector(state => state.session.user);
    //
    const [title, setTitle] = useState('');
    const [genre, setGenre] = useState('');
     const [url, setUrl] = useState('');
     const [songCover, setSongCover] = useState('');
    const [errors, setErrors] = useState([]);
    const history = useHistory();
    const dispatch = useDispatch();
    const [audio, setAudio] = useState("")

    // useEffect(()=>{
    //     if(audio){
    //         comp = new Audio(audio);
    //         setUrl(comp.src)
    //         //
    //         //
    //     }
    //     if(image){
    //         chomp = new Image(image);
    //         setSongCover(chomp.src)
    //         //
    //         //
    //     }
    // },[audio,image])
    if (!user) {
        return (
            // <div className="d-flex justify-content-center align-items-center border border-danger" style={{width: "auto", margin: "auto"}}>
            // <h1>MUST BE LOGGED IN TO UPLOAD</h1>
            // </div>
            <Redirect exact to={"/login"}/>
            //<LoginFormModal />
        );
    }
    //
    const handleSubmit = async e => {
        e.preventDefault();
        const payload = {
            title,
            genre,
            songCover,
            audio,
            userId: sessionUser.id
        }
        return dispatch(addSong(payload))
        .then(()=>{
            setErrors([]);
            history.push('/songs');
        })
        .catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) setErrors(data.errors);

          })



    }
    const updateFile = (e) => {
        const file = e.target.files[0];
        if (file) setAudio(file);
      };

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
                        <input type="url" onChange={e => setSongCover(e.target.value)} value={songCover} placeholder="Image URL" />
                    </label>
                    <label id="upload-song">
                        Audio
                        <input type="file" onChange={updateFile} required className='url-input' />
                    </label>
                    <button className='uploadbutton' type='submit'>Upload</button>
                </form>
            </div>
        </div>

    )
}
export default UploadPage;
