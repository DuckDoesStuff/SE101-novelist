import React, { useState } from "react";
import './UserInfo.css';
import Button from '../../Button/Button';

const UserInfo = () => {
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
                <img src="ava.jpg" alt='avatar'></img>
                <div className="UserInfoName">
                    <p className="FullName">Author name</p>
                    <p className="UserName">user_name</p>
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
                <p className='statics'>1000 Published</p>
                <p className='statics'>1000 Following</p>
                <p className='statics'>1000 Followers</p>
            </div>
            <p className="UserInfoBio">Lorem ipsum dolor sit amet consectetur. Quis eu tincidunt commodo a congue facilisis risus odio. Ut sagittis egestas et pellentesque mi quam lectus vel. Nibh vulputate eros pretium tincidunt nulla non ultrices euismod. Leo gravida suspendisse egestas bibendum. Euismod lacus dignissim viverra arcu magnis tortor eget porttitor. Iaculis nullam ut commodo egestas pellentesque. Facilisi pellentesque eu libero non eu lacus scelerisque diam. Cursus blandit mauris morbi vitae auctor. Porttitor natoque vitae at fames. Turpis feugiat diam auctor nec. Dui sit orci tincidunt elit id aenean.</p>
        </div>
    );
};

export default UserInfo