import React from "react";
import './UserInfo.css';
import Button from '../../Button/Button';
import avatar from '../../NovelViewCard/avatar.jpg'

// if logged-in user, hide flag button and follow button

const UserInfo = () => {
    const hidden = {
        display: 'none',
    };
    
    let isAuthor = false
    let follow = false
    
    return (
        <div className="UserInfoContainer">
            <div className="UserInfoNameContainer">
                <img src={avatar} alt='avatar'></img>
                <div className="UserInfoName">
                    <p className="FullName">
                        Author name
                        <i class="fa-regular fa-flag" style={isAuthor ? hidden : {}}></i>
                        </p>
                    <p className="UserName">user_name</p>
                    <div className="FollowButton" style={isAuthor ? hidden : {}}>
                        <Button><i class={follow ? `fa-solid fa-check` : `fa-regular fa-square-plus`}></i>{follow ? `Followed` : `Follow`}</Button>
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