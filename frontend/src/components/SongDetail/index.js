import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getAllSongs, getSong } from "../../store/song";
import ReactAudioPlayer from 'react-audio-player';
import { NavLink } from "react-router-dom";
import './SongDetail.css';
import { deleteComment, getAllComments, getComment } from "../../store/comments";
import CommentForm from "../CommentFormPage";
import { restoreUser } from "../../store/session";


function SongDetail() {
    const sessionUser = useSelector(state => state.session.user);
    console.log(sessionUser)
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
        dispatch(restoreUser())
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
                        <div className="single-song">
                            <div className="songINFO">
                                <div className="songtext">
                                    <h1>{song.title}</h1>
                                    <p>{song.genre}</p>
                                    <p>Artist:<NavLink to={`/profile/${song.User.username}`}>{`${song.User.username}`}</NavLink></p>
                                </div>
                                <img src={song.songCover} />
                            </div>
                            <div className="musicplayer">
                            <ReactAudioPlayer src={song.url} controls />
                            </div>
                            <div className="commentINFO">
                                <h2>COMMENTS</h2>
                                {sessionUser && (<CommentForm song={song} />)}
                                {!sessionUser && (<h2>Need to be logged in to comment.</h2>)}
                                {comments.map((comment) => {
                                    let sessionLinks;
                                    if (sessionUser) {
                                        if (sessionUser.id === comment.userId) {
                                            sessionLinks = (
                                                <button className='delete'
                                                    onClick={() => {
                                                        dispatch(deleteComment(comment))
                                                        //history.push(`/songs/${song.id}`)
                                                    }
                                                    }
                                                >Delete</button>)
                                        }
                                    }
                                    if (comment.songId === parseInt(songId)) {
                                        console.log(comment.User)
                                        return (
                                            <div className="comment">
                                                <div className="commenttext">
                                                <p>{comment.body}</p>
                                                <p>{comment.createdAt}</p>
                                                {/* <p className="author">{comment.User.username}</p> */}
                                                </div>
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
