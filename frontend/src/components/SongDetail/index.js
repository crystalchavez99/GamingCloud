import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllSongs, getSong } from "../../store/song";
import ReactAudioPlayer from 'react-audio-player';
import './SongDetail.css';
import { getAllComments, getComment } from "../../store/comments";


function SongDetail() {
    const sessionUser = useSelector(state => state.session.user);
    const { songId } = useParams();
    // console.log(songId)
    const dispatch = useDispatch();
    const songs = useSelector((state) => Object.values(state.song));
    console.log('songs',songs)
    const comments = useSelector((state) => Object.values(state.comment));
    console.log('comments',comments)
    const songComments = comments.map(comment=>{
        //console.log(comment)
        if(comment.songId === parseInt(songId)){
            return comment;
        }
    })
    console.log(`songComments`,songComments)
    useEffect(() => {
        dispatch(getAllSongs());
        dispatch(getAllComments())
        dispatch(getComment(songId))
    }, [dispatch,songId])
    if (!songs) {
        return null;
    }
    if (!comments) {
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
                            <div>
                                <h2>COMMENTS</h2>
                                {comments.map(comment=>{
                                    if(comment.songId === parseInt(songId)){
                                        return(
                                            <p>{comment.body}</p>
                                        )
                                    }
                                })}
                            </div>
                        </div>
                    )
                }
            })}
        </div>
    )
}

export default SongDetail;
