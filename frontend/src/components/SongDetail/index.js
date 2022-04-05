import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllSongs, getSong } from "../../store/song";

function SongDetail() {
    const sessionUser = useSelector(state => state.session.user);
    const { songId } = useParams();
    // console.log(songId)
    const dispatch = useDispatch();
    const songs = useSelector((state) => state.song);
    //console.log(songs[songId])
    const song = songs[songId];
    //console.log(song)
    useEffect(() => {
        dispatch(getAllSongs());
    }, [dispatch])
    if (!songs) {
        return null;
    }
    //const soloSong = songs.find((song,index)=> song.id === songId)
    //console.log(soloSong)
    return (
        <div className={`songdetail ${song.id}`}>
            <h1>{song.title}</h1>

        </div>
    )
}

export default SongDetail;
