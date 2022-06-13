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
        //
        dispatch(addSongs(data.songs));
    }
}

export const addSong = song => async dispatch => {
    const {title,genre,songCover,audio,userId} = song;

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

        dispatch(addOneSong(data.song))

        return response;

}

export const editSong = song => async dispatch => {
    const response = await csrfFetch(`/api/songs/${song.id}`, {
        method: "PUT",
        body: JSON.stringify(song)
    });
    if (response.ok) {
        const data = await response.json();

        await dispatch(addOneSong(data));

    }else{
        const data = await response.json();

    }
    return response
}

export const playSong = songId => async dispatch => {

    const response = await fetch(`/api/songs/${songId}`);

    if (response.ok) {
        const song = await response.json();

        dispatch(currentSong(song))

        return song;
    }
    return response;
}
export const getSong = songId => async dispatch => {

    const response = await fetch(`/api/songs/${songId}`);

    if (response.ok) {
        const song = await response.json();

        dispatch(addOneSong(song))

        return song;
    }
    return response;
}
const songReducer = (state = [], action) => {
    let newState;
    switch (action.type) {
        case LOADSONGS: {
            newState = { ...state };

            const songs = {};
            action.songs.forEach(song => {
                songs[song.id] = song;
            })

            newState.songs = songs;

            return newState.songs;
        }
        case ADDONESONG:

            newState = {...state,[action.song.id]: action.song}
            return newState;
        case REMOVESONG:
            newState = { ...state };
            delete newState[action.song.id]
            return { ...newState }
        case PLAYINGSONG:
            newState = state;
            newState.playingSong = "";
            newState.playingSong = action.songPlay;
            return newState;
        default:
            return state;
    }

}

export default songReducer;
