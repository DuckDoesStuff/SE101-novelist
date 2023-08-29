import React, { useEffect, useState } from "react";
import './UserInfo.css';
import Button from '../../Button/Button';
import { auth, fstore } from "../../../backend-api/FirebaseConfig";
import { useNavigate } from "react-router-dom";
import { doc, updateDoc } from "firebase/firestore";
import { getUser } from "../../../backend-api/API";

const UserInfo = ({user}) => {
    const [isFollowSelected, setFollow] = useState(true);
    const [hideFollow, setHideFollow] = useState(false);
    const navigate = useNavigate();

    const handleFollowClick = () => {
        if(auth.currentUser) {
            if(auth.currentUser.uid !== user.id) {
                // Update the author
                updateDoc(doc(fstore, "userinfos", user.id), 
                    { follower: isFollowSelected ? user.follower.filter((id) => id !== auth.currentUser.uid) : 
                        [...user.follower, auth.currentUser.uid] })
                // Update the current user
                getUser(auth.currentUser.uid)
                .then((userData) => {
                    updateDoc(doc(fstore, "userinfos", userData.id), 
                        { following: isFollowSelected ? userData.following.filter((id) => id !== user.id) : 
                            [...userData.following, user.id] })

                    
                    setFollow(!isFollowSelected)
                })
            }
        } else {
            navigate("/signin")
        }
    }

    useEffect(() => {
        if((auth.currentUser && 
            auth.currentUser.uid !== user.id && 
            !user.follower.includes(auth.currentUser.uid))) {
            setFollow(false)
            }
        if(!auth.currentUser)
            setFollow(false)
    }, [])

    const hidden = {
        display: 'none',
    };
    
    let isAuthor = (auth.currentUser && auth.currentUser.uid === user.id)
    // setFollow(follow)
    
    return (
        <div className="UserInfoContainer">
            <div className="UserInfoNameContainer">
                <img src={user.ava} alt='avatar'></img>
                <div className="UserInfoName">
                    <p className="FullName">{user.name}</p>
                    <div className="FollowButton" style={isAuthor ? hidden : {}} onClick={handleFollowClick}>
                        {isFollowSelected ? (                    
                            <Button><i class="fa-solid fa-check"></i>Following</Button>
			            ) : (
                            <Button><i class="fa-regular fa-square-plus"></i>Follow</Button>
                        )}
                    </div>
                </div>
            </div>
            <div className="UserInfoStatics">
                <p className='statics'>{user.published.length} Published</p>
                <p className='statics'>{user.following.length} Following</p>
                <p className='statics'>{user.follower.length} Followers</p>
            </div>
            <p className="UserInfoBio">{user.bio}</p>
        </div>
    );
};

export default UserInfo