const ADDSONGS = 'songs/ADDSONGS';
const ADDONESONG = 'songs/ADDONESONG';

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
export const getAllSongs = () =>async(dispatch) =>{
    const response = await fetch('/api/songs')

    if(response.ok){
        const data = await response.json();
        console.log(data);
        dispatch(addSongs(data.songs));
    }
}

export const addSong = song => async dispatch =>{
    const response = await(`/api/songs`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(song)
    });
    if(response.ok){
        const data = await response.json();
        console.log('add',data);
        dispatch(addOneSong(data.song))
    }
}
const initialState = {songs: []}
const songReducer = (state =initialState, action)=>{
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
        default:
            return state;
    }

}

export default songReducer;
