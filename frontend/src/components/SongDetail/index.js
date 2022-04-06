import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllSongs, getSong } from "../../store/song";
import ReactAudioPlayer from 'react-audio-player';
import './SongDetail.css';


function SongDetail() {
    const sessionUser = useSelector(state => state.session.user);
    const { songId } = useParams();
    // console.log(songId)
    const dispatch = useDispatch();
    const songs = useSelector((state) => Object.values(state.song));    console.log('songs',songs)
    useEffect(() => {
        dispatch(getAllSongs());
    }, [dispatch])
    if (!songs) {
        return null;
    }
    return(
        <div  className="songdetail">
            {songs.map(song =>{
                //console.log(song)
                if(parseInt(songId) === song.id){
                    //console.log(song.Comments)
                    //console.log("MATCH")
                    return(
                        <div>
                            <h1>{song.title}</h1>
                            <img src={song.songCover}/>
                            <p>{song.genre}</p>
                        </div>
                    )
                }
            })}
        </div>
    )
}

export default SongDetail;
