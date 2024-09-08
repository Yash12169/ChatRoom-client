import React, { useEffect, useState,useRef } from 'react';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';
import {io} from 'socket.io-client'
import Searchbar from "./Searchbar";
import Notifications from "./Notifications";
import ListFriends from "./ListFriends";
import MessageFriends from "./MessageFriends";
import {queries} from "@testing-library/react";
import {useDispatch} from "react-redux";
const socket = io.connect('http://localhost:3001')
function Home() {
    const [selectedFriend, setSelectedFriend] = useState(null);
    const access_token = localStorage.getItem('access_token');
    const refresh_token = localStorage.getItem('refresh_token');
    const [user, setUser] = useState({})
    const dispatch = useDispatch();
    const [view,setView] = useState('messager')

    useEffect(() => {
        if(user && user.id){
            socket.emit('user_connected',user.id.toString());
        }
        return () => {
            socket.disconnect();
        };
    }, [user]);

    useEffect(() => {
        const fetchFriends = async () => {
            try {
                const response = await axios.get('http://localhost:8000/messager/listfriends/', {
                    headers: {Authorization: `Bearer ${access_token}`},
                });
                dispatch({type:'SET_FRIENDS',payload:response.data})
                // setFriendsP(response.data);

            } catch (e) {
                console.log(e);
            }
        };
        fetchFriends();

    }, [access_token,dispatch]);

    useEffect(() => {
        const getCurrentUser = async () => {
            const response = await axios.get('http://localhost:8000/messager/currentuser/', {headers: {Authorization: `Bearer ${access_token}`}})
            setUser(response.data)
        }
        getCurrentUser()
    }, [access_token]);

const handleFriend  = (friend) => {
    setSelectedFriend(friend)
    setView('messager')
}
const handleBack  = () => {
    setSelectedFriend(null)

}

    return (
        <div className={'parent-home'}>

            <div className={'listfriends'}>
                <ListFriends access_token={access_token} refresh_token={refresh_token} user={user}
                             onFriendClick={handleFriend}/>
            </div>
            <div className={`listfriends-smaller  ${selectedFriend? `hidden`:``} `}>
                <ListFriends access_token={access_token} refresh_token={refresh_token} user={user}
                             onFriendClick={handleFriend}/>
            </div>
<div  className={'messagefriends-p'}>
    <MessageFriends access_token={access_token} user={user} onBackClick={handleBack}
                    refresh_token={refresh_token}
                    selectedFriend={selectedFriend}
                    view={view}
                    setView={setView}
    />

</div>



        </div>

    );
}

export default Home;
