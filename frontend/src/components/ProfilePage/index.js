import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import './ProfilePage.css';
import { useEffect } from 'react';
import { getAllSongs } from '../../store/song';
import starter from '../../images/default.jpg';
function ProfilePage() {
    const dispatch = useDispatch();
    const songs = useSelector((state) => Object.values(state.song));
    const artist = useParams();
    console.log(artist)
    console.log(songs)
    useEffect(()=>{
        dispatch(getAllSongs())
    })
    return (
        <div className="profilepage">
            <div className='profilebanner'>
                <div className='artistide'>
                    <img src={starter}/>
                    <p>{artist.userName}</p>
                </div>
            </div>
            <div className='profilecontent'>
                <h3>Songs</h3>
                <p>Currently a work in progress</p>
            </div>
        </div>
    )
}
export default ProfilePage;
