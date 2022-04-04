import useParams from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { loadASong } from '../../store/song';
import './ListSongPage.css';
function ListSongPage(){
    // const {songId} = useParams();
    // const dispatch = useDispatch();
    // const song = useSelector(state => state.songs[songId]);

    // useEffect(()=>{
    //     dispatch(loadASong(songId))
    // },[dispatch,songId])
    // return(
    //     <div>
    //         <h2>{song.title}</h2>
    //     </div>
    // )
    return(
        <div>
            <h1>SONG LIST</h1>
        </div>
    )
}

export default ListSongPage;
