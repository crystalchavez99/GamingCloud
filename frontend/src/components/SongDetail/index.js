import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function SongDetail(){
    const sessionUser = useSelector(state => state.session.user);
    const {songId} = useParams();
    const dispatch = useDispatch();
    const song = useSelector(state =>state.song);
    console.log(sessionUser);
    console.log(song)
}

export default SongDetail;
