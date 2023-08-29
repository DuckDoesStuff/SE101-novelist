import React, { useState, useEffect } from 'react';
import Header from '../components/Header/Header.js';
import Footer from '../components/Footer/Footer.js'
import UserInfo from "../components/UserProfile/UserInfo/UserInfo";
import NovelTab from "../components/UserProfile/NovelTab/NovelTab";
import { useParams } from 'react-router-dom';
import { getUser } from '../backend-api/API.js';

function UserProfilePage() {
    const { id } = useParams();
    const container = {
        padding: '32px 0',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        color: 'var(--text-name)',
    };
    const [isFetched, setIsFetched] = useState(false);
    const [user, setUser] = useState(null);
    
    useEffect(() => {
        const fetchUser = async () => {
            try {
                await getUser(id)
                .then((userData) => {
                    setUser(userData);
                });
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };

        fetchUser()
        .then(() => {
            setIsFetched(true);
        });
    }, []);

    if(!isFetched) {
        return (
            <div className="loading">
                <img src="/loading.svg"/>
            </div>
        );
    }

    return (
        <div>
            <Header/>
            <div style={container}>
                <UserInfo user={user}/>
                <NovelTab user={user}/>
            </div>
            <Footer/>
        </div>
    );
};

export default UserProfilePage