import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import ReactAudioPlayer from 'react-audio-player';

import './ProfilePage.css';
import { useEffect } from 'react';
import { getAllSongs } from '../../store/song';
import starter from '../../images/default.jpg';
import { getUser } from '../../store/users';
function ProfilePage() {
    const dispatch = useDispatch();
    const artist = useParams();
    const artistInfo = useSelector(state => Object.values(state.user))
    //console.log(artist)
    console.log(artistInfo)
    useEffect(() => {
        //dispatch(getAllSongs())
        dispatch(getUser(artist.userName))
    }, [dispatch])
    //const songs = useSelector((state) => Object.values(state.song));
    // const users = useSelector((state) => Object.values(state.user));
    // console.log(users)
    //  if(users.length < 1){
    //      return null;
    //  }
    if (!artistInfo) {
        return null;
    }
    if (!artist) {
        return null;
    }
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
                    <img src={starter} />
                    <p>{artist.userName}</p>
                </div>
            </div>
            <div className='profilecontent'>
                <h3>Your Songs</h3>
                {artistInfo.map(artist => {
                    if (!artist) {
                        return null;
                    }
                    return (
                        <div className='artistsong'>
                            {console.log(artist)}
                            {artist.Songs.map(song => {
                                console.log(song, `artist song`)
                                return (
                                    <div className='singsongInfo'>
                                        <div className='songImg'>
                                            <img src={song.songCover} />
                                        </div>
                                        <div className='songCatch'>
                                        <p>{song.title}</p>
                                        <p>{song.genre}</p>
                                        <ReactAudioPlayer controls src={song.url} />
                                        </div>
                                    </div>

                                )

                            })}
                            {/* <p>{song.title}</p>
                            <img src={song.songCover}/> */}
                        </div>

                    )
                }
                )}
            </div>
        </div>
    )
}
export default ProfilePage;
