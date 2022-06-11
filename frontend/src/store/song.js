import { csrfFetch } from "./csrf";

const ADDSONGS = 'songs/ADDSONGS';
const ADDONESONG = 'songs/ADDONESONG';
const REMOVESONG = 'songs/REMOVESONG';
const PLAYINGSONG = 'songs/PLAYINGSONG'
const addOneSong = song =>{
    return{
        type: ADDONESONG,
        song
    }
}
const addSongs = songs =>{
    return {
    type: ADDSONGS,
    songs
    }
}
const removeSong = song =>{
    return {
        type: REMOVESONG,
        song
    }
}
const currentSong = song =>{
    return {
        type: PLAYINGSONG,
        song
    }
}
export const deleteSong = song => async dispatch =>{
    const response = await csrfFetch(`/api/songs/${song.id}`,{
        method: 'DELETE'
    });
    if(response.ok){
        const data = await response.json();
        await dispatch(removeSong(data.song))
    }
}
export const getAllSongs = () =>async(dispatch) =>{
    const response = await fetch('/api/songs')

    if(response.ok){
        const data = await response.json();
        //console.log(data);
        dispatch(addSongs(data.songs));
        return response
    }
}

export const addSong = song => async dispatch =>{
    const response = await csrfFetch(`/api/songs`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(song)
    });
    if(response.ok){
        const data = await response.json();
        //console.log('add',data);
        dispatch(addOneSong(data.song))
    }
}

export const editSong = song => async dispatch =>{
    const response = await csrfFetch(`/api/songs/${song.id}`,{
        method: "PUT",
        body: JSON.stringify(song)
    });
    if(response.ok){
        const data = await response.json();
        dispatch(addOneSong(data.song));
    }
}

export const getSong = songId => async dispatch =>{
    console.log('entered current song thunk')
    const response = await fetch(`/api/songs/${songId}`);

    if(response.ok){
        const data = await response.json();
        dispatch(currentSong(data.song))
        return data.song;
    }
}
const songReducer = (state =[], action)=>{
    let newState;
    switch(action.type){
        case ADDSONGS: {
            const listSongs = {};
            action.songs.forEach(song=>{
                listSongs[song.id] = song;
            })
            return {...listSongs,...state.songs};
        }
        case ADDONESONG:
            newState = {...state, [action.song.id]: action.song};
            return newState;
         case REMOVESONG:
             newState = {...state};
             delete newState[action.song.id]
             return {...newState}
        default:
            return state;
    }

}

export default songReducer;
