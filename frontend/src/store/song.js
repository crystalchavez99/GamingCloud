import { csrfFetch } from "./csrf";

const LOADSONGS = 'songs/LOADSONGS';
const ADDONESONG = 'songs/ADDONESONG';
const REMOVESONG = 'songs/REMOVESONG';
const PLAYINGSONG = 'songs/PLAYINGSONG'
const addOneSong = song => {
    return {
        type: ADDONESONG,
        song
    }
}
const addSongs = songs => {
    return {
        type: LOADSONGS,
        songs
    }
}
const removeSong = song => {
    return {
        type: REMOVESONG,
        song
    }
}
const currentSong = songPlay => {
    return {
        type: PLAYINGSONG,
        songPlay
    }
}
export const deleteSong = song => async dispatch => {
    const response = await csrfFetch(`/api/songs/${song.id}`, {
        method: 'DELETE'
    });
    if (response.ok) {
        const data = await response.json();
        await dispatch(removeSong(data.song))
    }
}
export const getAllSongs = () => async (dispatch) => {
    const response = await fetch('/api/songs/all')

    if (response.ok) {
        const data = await response.json();
        //console.log(data);
        dispatch(addSongs(data.songs));
    }
}

export const addSong = song => async dispatch => {
    const {title,genre,songCover,audio,userId} = song;
    console.log(song, 'song thunk')
    const formData = new FormData()
    formData.append("title",title)
    formData.append("genre",genre)
    formData.append("userId",userId)
    formData.append("songCover",songCover)
    if(audio) formData.append("audio",audio)
    const response = await csrfFetch(`/api/songs/`,{
        method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    body: formData,
    });
        const data = await response.json();
        console.log('add', data);
        dispatch(addOneSong(data.song))
        console.log('data', data)
        return response;

}

export const editSong = song => async dispatch => {
    const response = await csrfFetch(`/api/songs/${song.id}`, {
        method: "PUT",
        body: JSON.stringify(song)
    });
    console.log('res thun',response)
    if (response.ok) {
        const data = await response.json();
        console.log('data edit',data)
        await dispatch(addOneSong(data));
        console.log('data edit FOR SURE',data)
    }else{
        const data = await response.json();
        console.log('data edit',data)
    }
    return response
}

export const playSong = songId => async dispatch => {
    console.log('entered current song thunk')
    const response = await fetch(`/api/songs/${songId}`);

    if (response.ok) {
        const song = await response.json();
        console.log('get song data', song)
        dispatch(currentSong(song))
        console.log('after dispatch', song)
        return song;
    }
    return response;
}
const songReducer = (state = [], action) => {
    let newState;
    switch (action.type) {
        case LOADSONGS: {
            newState = { ...state };
            console.log('load', newState)
            const songs = {};
            action.songs.forEach(song => {
                songs[song.id] = song;
            })
            console.log('songs', songs)
            newState.songs = songs;
            console.log('newState song is', newState.songs)
            return newState.songs;
        }
        case ADDONESONG:
            console.log('action',action)
            newState = {...state,[action.song.id]: action.song}
            return newState;
        case REMOVESONG:
            newState = { ...state };
            delete newState[action.song.id]
            return { ...newState }
        case PLAYINGSONG:
            newState = state;
            console.log('play newState', newState)
            newState.playingSong = action.songPlay;
            return newState;
        default:
            return state;
    }

}

export default songReducer;
