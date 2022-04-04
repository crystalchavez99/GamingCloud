import useParams from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import {getAllSongs} from '../../store/song';
import './ListSongPage.css';
function ListSongPage(){
    const dispatch = useDispatch();
    const songs = useSelector((state)=> Object.values(state.song));
    useEffect(()=>{
        dispatch(getAllSongs());
    },[dispatch])
    return(
        <div>
            <h1>SONG LIST</h1>
        </div>
    )
}

export default ListSongPage;
