import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getAllSongs, getSong } from "../../store/song";
import ReactAudioPlayer from 'react-audio-player';
import './SongDetail.css';
import { deleteComment, getAllComments, getComment } from "../../store/comments";
import CommentForm from "../CommentFormPage";


function SongDetail() {
    const sessionUser = useSelector(state => state.session.user);
    const { songId } = useParams();
    // console.log(songId)
    const dispatch = useDispatch();
    const history = useHistory();
    const songs = useSelector((state) => Object.values(state.song));
    console.log('songs', songs)
    const comments = useSelector((state) => Object.values(state.comment));
    console.log('comments', comments)


    // const songComments = comments.find(comment=>{
    //     //console.log(comment)
    //     if(comment.songId === parseInt(songId)){
    //         return {comment};
    //     }
    // })
    // console.log(songComments)
    // console.log(`songComments`,songComments)
    useEffect(() => {
        dispatch(getAllSongs());
        dispatch(getAllComments())
    }, [dispatch, songId])
    if (!songs) {
        return null;
    }
    if (!comments) {
        return null;
    }
    return (
        <div className="songdetail">
            {songs.map(song => {

                //console.log(song)
                if (parseInt(songId) === song.id) {
                    //console.log(song.Comments)
                    //console.log("MATCH")
                    return (
                        <div className="song-detail">
                            <h1>{song.title}</h1>
                            <img src={song.songCover} />
                            <p>{song.genre}</p>
                            <div>
                                <h2>COMMENTS</h2>
                                {sessionUser && (<CommentForm song={song} />)}
                                {!sessionUser && (<h2>Need to be logged in to comment.</h2>)}
                                {comments.map((comment) => {
                                    let sessionLinks;
                                    if (sessionUser) {
                                        if (sessionUser.id === comment.userId) {
                                            sessionLinks = (
                                                <button className='delete'
                                                    onClick={ () => {
                                                         dispatch(deleteComment(comment))
                                                        //history.push(`/songs/${song.id}`)
                                                    }
                                                    }
                                                >Delete</button>)
                                        }
                                    }
                                    if (comment.songId === parseInt(songId)) {
                                        return (
                                            <div className="comment">
                                                <p>{comment.body}</p>
                                                {sessionLinks}
                                            </div>

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
