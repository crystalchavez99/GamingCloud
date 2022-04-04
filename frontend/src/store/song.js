const ADDSONGS = 'songs/ADDSONGS';
const addSongs = songs =>{
    return {
    type: ADDSONGS,
    songs
    }
}
export const getAllSongs = () =>async(dispatch) =>{
    const response = await fetch('/api/songs')
    const data = await response.json();
    if(response.ok){
        dispatch(addSongs(data.songs))
    }
}

const songReducer = (state ={}, action)=>{
    let newState;
    switch(action.type){
        case ADDSONGS: {
            const songs = {...state.songs};
            action.songs.forEach(song=>{
                songs[song.id] = song;
            })
            return {...state,songs};
        }
        default:
            return state;
    }

}

export default songReducer;
