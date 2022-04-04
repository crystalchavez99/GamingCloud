const SongDetail = ({id,userId,title,url,genre})=>{
    return(
        <div className="song-detail">
            <h1>{title}</h1>
            <h3>{genre}</h3>
        </div>
    )
}
export default SongDetail;
