const ADDSONGS = 'songs/ADDSONGS';
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
        default:
            return state;
    }

}

export default songReducer;
