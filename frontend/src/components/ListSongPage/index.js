//import useParams from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { deleteSong, getAllSongs } from '../../store/song.js';
import './ListSongPage.css';
import { NavLink } from 'react-router-dom';
import ReactAudioPlayer from 'react-audio-player';
import { useHistory } from 'react-router-dom';

function ListSongPage({version}) {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);
    const songs = useSelector((state) => Object.values(state.song));
    //console.log(songs)

    useEffect(() => {
        dispatch(getAllSongs());
    }, [dispatch]);

    if (!songs) {
        return null;
    }

    return (
        <div className='trackList'>
            <h1 className='yoursongs'>All Songs</h1>
            <div className='songList'>
            {!version && songs.map((song, index) => {
                    const user = song.User;
                    //console.log(user.username)
                    let sessionLinks;
                    if(sessionUser){
                        if(sessionUser.id === song.userId){
                            sessionLinks = (<div className='editdelete'><NavLink key={index} to={`/songs/${song.id}/edit`} className="edit">Edit</NavLink>
                            <button className='delete'
                            onClick={async (e)=>{
                                await dispatch(deleteSong(song))
                                // return history.push("/")
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
                                <img className="songCover"src={song.songCover}/>
                                <p>Genre: {`${song.genre}`}</p>

                                {/* <p>Artist:<NavLink to={`/profile/${user.username}`}>{`${user.username}`}</NavLink></p> */}
                                <ReactAudioPlayer
                                    src={song.url}
                                    controls
                                />

                            {sessionLinks}
                        </div>
                    )
                })}
                {version && (<>
                {/* //{console.log(version)} */}
                    {version.map((song, index) => {
                        if(!song){
                            return null;
                        }
                        //console.log(song)
                    //console.log(user.username)
                    let sessionLinks;
                    if(sessionUser){
                        if(sessionUser.id === song.userId){
                            sessionLinks = (<div className='editdelete'><NavLink key={index} to={`/songs/${song.id}/edit`} className="edit">Edit</NavLink>
                            <button className='delete'
                            onClick={async (e)=>{
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
                                <img className="songCover"src={song.songCover}/>
                                <p>Genre: {`${song.genre}`}</p>

                                {/* <p>Artist:<NavLink to={`/profile/${user.username}`}>{`${user.username}`}</NavLink></p> */}
                                <ReactAudioPlayer
                                    src={song.url}
                                    controls
                                />

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
