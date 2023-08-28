import React from 'react';
import Header from '../components/Header/Header.js';
import UserInfo from "../components/UserProfile/UserInfo/UserInfo";
import NovelTab from "../components/UserProfile/NovelTab/NovelTab";

function UserProfilePage() {
    const container = {
        padding: '32px 0',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    };

    return (
        <div>
            <Header/>
            <div style={container}>
                <UserInfo/>
                <NovelTab/>
            </div>
        </div>
    );
};

export default UserProfilePage