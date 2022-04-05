//import useParams from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { deleteSong, getAllSongs } from '../../store/song.js';
import './ListSongPage.css';
import { NavLink } from 'react-router-dom';
import ReactAudioPlayer from 'react-audio-player';
import { useHistory } from 'react-router-dom';

function ListSongPage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);
    const songs = useSelector((state) => Object.values(state.song));
    useEffect(() => {
        dispatch(getAllSongs());
    }, [dispatch])
    if (!songs) {
        return null;
    }

    return (
        <div className='trackList'>
            <div className='songList'>
                {songs.map((song, index) => {
                    const user = song.User;
                    console.log(user.username)
                    let sessionLinks;
                    if(sessionUser){
                        if(sessionUser.id === song.userId){
                            sessionLinks = (<div className='editdelete'><NavLink to={`/songs/${song.id}/edit`}>Edit</NavLink>
                            <button
                            onClick={(e)=>{
                                dispatch(deleteSong(song.id))
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
                                <img className="songCover"src={song.songCover}/>
                                <p>Genre: {`${song.genre}`}</p>
                                <p>Artist: {`${user.username}`}</p>
                                <ReactAudioPlayer
                                    src={song.url}
                                    controls
                                />
                            </NavLink>
                            {sessionLinks}
                        </div>
                    )
                })}
            </div>

        </div>
    )
}

export default ListSongPage;
