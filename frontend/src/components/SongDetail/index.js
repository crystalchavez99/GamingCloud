import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllSongs } from "../../store/song";
import { NavLink } from "react-router-dom";
import './SongDetail.css';
import { deleteComment, getAllComments } from "../../store/comments";
import CommentForm from "../CommentFormPage";
import { restoreUser } from "../../store/session";
import React from 'react';



function SongDetail() {
    const sessionUser = useSelector(state => state.session.user);
    const { songId } = useParams();
    const dispatch = useDispatch();
    const songs = useSelector((state) => Object.values(state.song));
    const comments = useSelector((state) => Object.values(state.comment));



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


                if (parseInt(songId) === song.id) {

                    return (
                        <div className="single-song">
                            <div className="songINFO">
                                <div className="songtext">
                                    <h1>{song.title}</h1>
                                    <p>Genre: {song.genre}</p>
                                    <p id="user-navlink">Artist: <NavLink to={`/profile/${song.User.username}`}>{`${song.User.username}`}</NavLink></p>
                                </div>
                                <img src={song.songCover} />
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
                                        return (
                                            <div className="comment">
                                                <div className="commenttext">
                                                <div id="row-comment">
                                                    <div>
                                                    <p>{comment.body}</p>
                                                    <p id="user-comment">{comment.User.username}</p>
                                                    </div>
                                                    <div>
                                                    <p>{new Date(comment.createdAt).toDateString()}</p>
                                                    {sessionLinks}
                                                    </div>
                                                </div>


                                                {/* <p className="author">{comment.User.username}</p> */}
                                                </div>

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
