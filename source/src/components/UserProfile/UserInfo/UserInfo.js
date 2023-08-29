import React, { useState } from "react";
import './UserInfo.css';
import Button from '../../Button/Button';

const UserInfo = ({user}) => {
    const [isFollowSelected, setFollow] = useState(false);

    const handleFollowClick = () => {
        setFollow(!isFollowSelected)
    }

    const hidden = {
        display: 'none',
    };
    
    let isAuthor = false
    let follow = false
    
    return (
        <div className="UserInfoContainer">
            <div className="UserInfoNameContainer">
                <img src={user.ava} alt='avatar'></img>
                <div className="UserInfoName">
                    <p className="FullName">{user.name}</p>
                    {/* <p className="UserName">user_name</p> */}
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