//import useParams from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { getAllSongs } from '../../store/song.js';
import './ListSongPage.css';
import SongDetail from '../SongDetail';
function ListSongPage() {
    const dispatch = useDispatch();
    const songs = useSelector((state) => Object.values(state.song));
    useEffect(() => {
        dispatch(getAllSongs());
    }, [dispatch])
    if (!songs) {
        return null;
    }
    console.log(songs)

    return (
        <div>
            <h1>SONG LIST</h1>
            <div className='songList'>
                {songs.map((song, index) => {
                    console.log(song)
                    return (
                        <div className='song'>
                            <a href={`/songs/${song.id}`} key={index}>
                                <p>{`${song.title}`}</p>
                                <p>{`${song.genre}`}</p>
                                { <p>{`${song.User.username}`}</p>}
                            </a>
                        </div>
                    )
                })}
            </div>

        </div>
    )
}

export default ListSongPage;
