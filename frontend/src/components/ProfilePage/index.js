import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import './ProfilePage.css';
import { useEffect } from 'react';
import { getAllSongs } from '../../store/song';
import starter from '../../images/default.jpg';
import { getAllUsers } from '../../store/users';
function ProfilePage() {
    const dispatch = useDispatch();
    useEffect(()=>{
        //dispatch(getAllSongs())
        dispatch(getAllUsers())
    })
    //const songs = useSelector((state) => Object.values(state.song));
    // const users = useSelector((state) => Object.values(state.user));
    // console.log(users)
    const artistName = useParams();
    //  if(users.length < 1){
    //      return null;
    //  }
    //  const artist = users.map(user => {
    //     if(user.username === artistName.userName){
    //         return user;
    //     }
    // })
    // console.log('artist',artist)


    //console.log(artistName)
    //console.log(users)
    //  const artist = user.map(user => {
    //      if(getUsers.username === artistName.userName){
    //          return user;
    //      }
    //  })

    //  const songs = artist.Songs;
    //  console.log(songs)
    // console.log('match artitst',artist)
    //  if(!artist){
    //      return null;
    //  }


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
                <p>WORK IN PROGRESS</p>
                {/* {songs.map(song=>{
                    return(
                        <div className='artistsong'>
                        <p>{song.title}</p>
                        <img  src={song.songCover}/>
                        </div>
                    )
                })} */}
            </div>
        </div>
    )
}
export default ProfilePage;
