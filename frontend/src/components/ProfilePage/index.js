import './ProfilePage.css';
function ProfilePage({ user }) {
    console.log(user)
    return (
        <div className="profilepage">
            <div className='profilebanner'>
                <img alt='PROFILE PICTURE' />
                <p>{user.username}</p>
            </div>
            <div className='profilecontent'>
                <h3>Songs</h3>
            </div>
        </div>
    )
}
export default ProfilePage;
