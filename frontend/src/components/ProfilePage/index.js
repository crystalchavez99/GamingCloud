import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import './ProfilePage.css';
import { useEffect } from 'react';
import { getAllSongs } from '../../store/song';
import starter from '../../images/default.jpg';
import { getAllUsers } from '../../store/session';
function ProfilePage() {
    const dispatch = useDispatch();
    //const songs = useSelector((state) => Object.values(state.song));
    const users = useSelector((state) => Object.values(state.session));
    const artistName = useParams();
    //console.log(artistName)
    //console.log(users)
    // const artist = users.map(user => {
    //     if(user.username === artistName.userName){
    //         return user;
    //     }
    // })
    const artist = users.find(user => {
        if(user.username === artistName.userName){
            return user;
        }
    })
    const songs = artist.Songs;
    console.log(songs)
    //console.log('match artitst',artist)
    useEffect(()=>{
        dispatch(getAllUsers())
    })
    return (
        <div className="profilepage">
            <div className='profilebanner'>
                <div className='artistide'>
                    <img src={starter}/>
                    <p>{artistName.userName}</p>
                </div>
            </div>
            <div className='profilecontent'>
                <h3>Songs</h3>
                {songs.map(song=>{
                    return(
                        <>
                        <p>{song.title}</p>
                        </>
                    )
                })}
            </div>
        </div>
    )
}
export default ProfilePage;
