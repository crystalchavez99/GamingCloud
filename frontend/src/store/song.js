
const LOAD_SONGS = 'songs/LOAD_SONGS';

export const loadSong = (song) =>{
    return {
        type: LOAD_SONGS,
        song
    }
}

export const getSong = () => async dispatch =>{
    const response = await fetch(`/api/songs`);
    const data = await response.json();
    dispatch(loadSong(data.song));
    return response;
}

const initialSate = {
    song:[]
}
export const songReducer = (state = initialSate,action) =>{
    switch(action.type){
        case LOAD_SONGS:
            const allSongs = {}
            action.list.forEach(song =>{
                allSongs[song.id] = song;
            });
            return {
                ...allSongs,
                ...state,
            }
        default:
            return state;
    }

}
