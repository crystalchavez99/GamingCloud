//import useParams from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect,useRef } from 'react';
import { deleteSong, getAllSongs,playSong } from '../../store/song.js';
import './ListSongPage.css';
import { NavLink } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

function ListSongPage({ version }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);
    const songs = useSelector((state) => Object.values(state.song));
    const AudioPlayer = document.getElementsByTagName("audio");
    useEffect(() => {
        dispatch(getAllSongs());
    }, [dispatch]);


    async function change(src){
        let newSong = await dispatch(playSong(src.id))

        if(AudioPlayer[0].getAttribute("src") !== src){
            AudioPlayer[0].setAttribute("src",newSong.url)
        }
        if(AudioPlayer[0].currentSrc){
            AudioPlayer[0].pause();
            AudioPlayer[0].load();
            AudioPlayer[0].play()
        }
    }


    if (!songs) {
        return null;
    }
    if(songs.playingSong){
        return null;
    }
    // function playTheSong(){
    //     let audio = document.getElementsByTagName("audio")
    //     audio.src = document.getElementsByClassName("songCover").getAttribute("data-value")
    //     audio.play()
    // }

    return (
        <div className='trackList'>
            {/* <h1 className='yoursongs'>All Songs</h1> */}
            <div className='songList'>
                {!version && songs.map((song, index) => {
                    let sessionLinks;
                    if (sessionUser) {
                        if (sessionUser.id === song.userId) {
                            sessionLinks = (<div className='editdelete'><NavLink key={index} to={`/songs/${song.id}/edit`} className="edit">Edit</NavLink>
                                <button className='delete'
                                    onClick={async (e) => {
                                        await dispatch(deleteSong(song))
                                        // return history.push("/")
                                    }
                                    }
                                >Delete</button></div>)
                        }
                    }
                    return (
                        <div className='song'>
                            <img className="songCover" src={song.songCover} alt={song.title} data-value={song.url} onClick={() =>change(song)}/>
                            <div className='song-information'>
                            <NavLink to={`/songs/${song.id}`} key={index}>
                                <p>{`${song.title}`}</p>
                            </NavLink>
                            <p>{`${song.User.username}`}</p>
                            </div>

                            {/* <p>Artist:<NavLink to={`/profile/${user.username}`}>{`${user.username}`}</NavLink></p> */}
                            {/* <ReactAudioPlayer
                                src={song.url}
                                controls
                            /> */}

                            {sessionLinks}
                        </div>

                    )

                })}
                {version && (<>
                    {version.map((song, index) => {
                        if (!song) {
                            return null;
                        }

                        let sessionLinks;
                        if (sessionUser) {
                            if (sessionUser.id === song.userId) {
                                sessionLinks = (<div className='editdelete'><NavLink key={index} to={`/songs/${song.id}/edit`} className="edit">Edit</NavLink>
                                    <button className='delete'
                                        onClick={async (e) => {
                                            await dispatch(deleteSong(song))
                                            return history.push("/")
                                        }
                                        }
                                    >Delete</button></div>)
                            }
                        }
                        return (
                            <div className='song'>
                                <NavLink to={`/songs/${song.id}`} key={index}>
                                    <p>{`${song.title}`}</p>
                                </NavLink>
                                <div id="image-play">
                                    <img className="songCover" src={song.songCover} alt={song.title}/>
                                    <div>
                                    <i class="fa-solid fa-circle-play"></i>
                                    </div>
                                </div>
                                <p>Genre: {`${song.genre}`}</p>

                                {/* <p>Artist:<NavLink to={`/profile/${user.username}`}>{`${user.username}`}</NavLink></p> */}
                                {/* <ReactAudioPlayer
                                    src={song.url}
                                    controls
                                /> */}

                                {sessionLinks}
                            </div>
                        )
                    })}
                </>)}
            </div>

        </div>
    )
}

export default ListSongPage;
