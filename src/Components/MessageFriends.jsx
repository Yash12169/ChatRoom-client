import React, { useEffect, useState, useRef } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import io from 'socket.io-client';
import DotsVertical from '../assets/DotsVertical.png';
import emoji from '../assets/emoji.png';
import PaperClipOutline from '../assets/PaperClipOutline.png';
import DownloadOutline from '../assets/DownloadOutline.png';
import '../App.css';
import XOutline from "../assets/XOutline.png";
import Trash from '../assets/Trash.png'
import BanOutline from '../assets/BanOutline.png'
import messager_background_blur from '../assets/messager_background_blur.png'

import back_btn from '../assets/back-btn.png'
const socket = io.connect('http://localhost:3001');

function MessageFriends({ access_token, refresh_token, selectedFriend, user,onBackClick,view,setView}) {
    const navigate = useNavigate();
    const [message, setMessage] = useState('');
    const [allMessage, setAllMessage] = useState([]);
    const [openProfile, setOpenProfile] = useState(false);


    function MessageFriends({ access_token, refresh_token, selectedFriend, user,onBackClick}) {
        const navigate = useNavigate();
        const [message, setMessage] = useState('');
        const [allMessage, setAllMessage] = useState([]);
        const [openProfile, setOpenProfile] = useState(false);


        useEffect(() => {
            if (selectedFriend) {
                socket.current = io('http://localhost:3001');

                socket.current.on('connect', () => {
                    console.log('Socket.IO connected');
                });

                socket.current.on('received_message', (data) => {
                    setAllMessage((prevMessages) => [...prevMessages, data]);
                });

                socket.current.on('disconnect', () => {
                    console.log('Socket.IO disconnected');
                });

                socket.current.on('error', (error) => {
                    console.error('Socket.IO error:', error);
                });

                return () => {
                    if (socket.current) {
                        socket.current.disconnect();
                    }
                };
            }
        }, [selectedFriend]);

        useEffect(() => {
            if (selectedFriend) {
                const room = user.id > selectedFriend.friend_id ? `${user.id}-${selectedFriend.friend_id}` : `${selectedFriend.friend_id}-${user.id}`;
                socket.emit('join_room', room);

                const handleMessage = (data) => {
                    setAllMessage(prevMessages => [...prevMessages, data]);
                };

                socket.on('received_message', handleMessage);

                return () => {
                    socket.off('received_message', handleMessage);
                };
            }
        }, [selectedFriend]);

        const handleSend = async () => {
            try{
                if (message.trim() !== '' && selectedFriend) {
                    const messageData = {
                        sender: user.id,
                        receiver: selectedFriend.friend_id,
                        content: message,
                        room: user.id > selectedFriend.friend_id ? `${user.id}-${selectedFriend.friend_id}` : `${selectedFriend.friend_id}-${user.id}`,
                    };
                    socket.emit('send_message', messageData);
                    setAllMessage(prevMessages => [...prevMessages, messageData]);
                    const response = await axios.post('http://localhost:8000/messager/send-message/',{sender:user.id,content:message,receiver:selectedFriend.id})

                    setMessage('');



                }
            }
            catch (e) {
                console.log(e)
            }
        };

        const handleUnfriend = async (friend_id) => {
            try {
                await axios.post(`http://localhost:8000/messager/remove-friend/`, { user1: user.id, user2: friend_id }, {
                    headers: { Authorization: `Bearer ${access_token}` }
                });
                console.log("User unfriended");
            } catch (e) {
                console.log(e);
            }
        };

        useEffect(() => {
            const fetchMessages = async () => {
                if (selectedFriend && selectedFriend.friend_id) {
                    try {
                        const response = await axios.post('http://localhost:8000/messager/listmessage/', { receiver: selectedFriend.friend_id }, { headers: { Authorization: `Bearer ${access_token}` } });
                        setAllMessage(response.data);
                    } catch (e) {
                        console.log(e);
                    }
                }
            };

            fetchMessages();
        }, [selectedFriend, access_token]);

        const handleOpenProfile = () => {
            setOpenProfile(true);
        };

        const handleBlacklist = async () => {
            try {
                const response = await axios.post('http://localhost:8000/messager/blacklist/', { user: user.id, blocked_user: selectedFriend.friend_id }, { headers: { Authorization: `Bearer ${access_token}` } });
                console.log(response.data);
            } catch (e) {
                console.log(e);
            }
        };

        return (
            <>
                {selectedFriend && (
                    <div className={openProfile ? 'openMessagerSmall' : 'openMessager'}  key={selectedFriend.friend_id}>
                        <div className={openProfile ? 'friend-nav-s' : 'friend-nav'}>
                            <div className={'pic-name'} onClick={() => setOpenProfile(!openProfile)}>
                                <img src={`http://localhost:8000${selectedFriend.friend_profile.profile_picture}`}
                                     alt="Profile"/>
                                <p>{selectedFriend.username}</p>
                            </div>
                            <img src={DotsVertical} alt="Options"/>
                        </div>

                        <div className={openProfile ? 'message-body-s' : 'message-body'}>
                            {allMessage.map((msg, index) => (
                                <div key={index} className={msg.sender === selectedFriend.friend_id ? 'upcoming messages' : 'receiver messages'}>
                                    <p id={'sin-message'}>{msg.content}</p>
                                </div>
                            ))}
                        </div>

                        <div className={openProfile ? 'messagebar-s' : 'messagebar'}>
                            <div className={'emoji'}>
                                <img src={emoji} alt="Emoji"/>
                            </div>
                            <input type={'text'} id={'message'} value={message} onChange={(e) => setMessage(e.target.value)}
                                   placeholder={'Message'}/>
                            <div className={'attach'}>
                                <div>
                                    <img id={'attach'} src={PaperClipOutline} alt="Attach"/>
                                </div>
                            </div>
                            <div className={'send'} onClick={handleSend}>
                                <div>
                                    <img src={DownloadOutline} id={'send'} alt="Send"/>
                                </div>
                            </div>
                        </div>
                    </div>
                )
                }
                {view === 'messager' && selectedFriend && (
                    <div className={`${view === 'messager'}?'':'hidden'`}>
                        {console.log('first')}

                        <div className={'openMessager-mob'} key={selectedFriend.friend_id}>
                            <div className={'friend-nav'}>
                                <div className={'pic-name'} onClick={() => {
                                    setOpenProfile(true)
                                    setView('profile')
                                }}>

                                    <img id={'back-btn'} src={back_btn} onClick={()=>{
                                        onBackClick();
                                        setOpenProfile(false);
                                    }}/>
                                    <img src={`http://localhost:8000${selectedFriend.friend_profile.profile_picture}`}
                                         alt="Profile"/>

                                    <p>{selectedFriend.username}</p>
                                </div>
                                <img src={DotsVertical} alt="Options"/>
                            </div>
                            <div className={'message-body'}>
                                {allMessage.map((msg, index) => (
                                    <div key={index}
                                         className={msg.sender === selectedFriend.friend_id ? 'upcoming messages' : 'receiver messages'}>
                                        <p id={'sin-message'}>{msg.content}</p>
                                    </div>
                                ))}
                            </div>
                            <div className={'messagebar'}>
                                <div className={'emoji'}>
                                    <img src={emoji} alt="Emoji"/>
                                </div>
                                <input type={'text'} id={'message'} value={message} onChange={(e) => setMessage(e.target.value)}
                                       placeholder={'Message'}/>
                                <div className={'attach'}>
                                    <div>
                                        <img id={'attach'} src={PaperClipOutline} alt="Attach"/>
                                    </div>
                                </div>
                                <div className={'send'} onClick={handleSend}>
                                    <div>
                                        <img src={DownloadOutline} id={'send'} alt="Send"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                )
                }
                {
                    openProfile === true  && selectedFriend && (
                        <div className={'open_prof'}>
                            {console.log('second')}

                            <div className={'openProf-nav'}>
                                <img src={XOutline} alt="Close" onClick={() => setOpenProfile(false)}/>
                                <p>Profile</p>
                            </div>
                            <div className={'profilepic-o'}>
                                <img src={`http://localhost:8000${selectedFriend.friend_profile.profile_picture}`}
                                     alt="Profile"/>
                            </div>
                            <div className={'fr-username'}>
                                <p>{selectedFriend.username}</p>
                            </div>
                            <div className={'partion'}></div>
                            <div className={'select-about-f'}>
                                <p id={'abou'}>About</p>
                                <p id={'ab'}>{selectedFriend.friend_profile.about}</p>
                            </div>
                            <div className={'partion'}></div>
                            <div className={'danger-but'}>
                                <div className={'ban'} onClick={handleBlacklist}>
                                    <img src={BanOutline} alt="Blacklist"/>
                                    <p>Blacklist {selectedFriend.username}</p>
                                </div>
                                <div className={'del'}>
                                    <img src={Trash} alt="Delete Chat"/>
                                    <p>Delete Chat</p>
                                </div>
                                <div className={'del'} onClick={() => handleUnfriend(selectedFriend.friend_id)}>
                                    <img src={Trash} alt="Remove Friend"/>
                                    <p>Remove Friend</p>
                                </div>
                            </div>
                        </div>
                    )
                }



                {
                    view === 'profile' && selectedFriend && (
                        <div className={`open_prof-small ${view === 'profile'}?'':'hidden'`}>
                            {console.log('second')}

                            <div className={'openProf-nav'}>
                                <img src={XOutline} alt="Close" onClick={() => setView('messager')}/>
                                <p>Profile</p>
                            </div>
                            <div className={'profilepic-o'}>
                                <img src={`http://localhost:8000${selectedFriend.friend_profile.profile_picture}`}
                                     alt="Profile"/>
                            </div>
                            <div className={'fr-username'}>
                                <p>{selectedFriend.username}</p>
                            </div>
                            <div className={'partion'}></div>
                            <div className={'select-about-f'}>
                                <p id={'abou'}>About</p>
                                <p id={'ab'}>{selectedFriend.friend_profile.about}</p>
                            </div>
                            <div className={'partion'}></div>
                            <div className={'danger-but'}>
                                <div className={'ban'} onClick={handleBlacklist}>
                                    <img src={BanOutline} alt="Blacklist"/>
                                    <p>Blacklist {selectedFriend.username}</p>
                                </div>
                                <div className={'del'}>
                                    <img src={Trash} alt="Delete Chat"/>
                                    <p>Delete Chat</p>
                                </div>
                                <div className={'del'} onClick={() => handleUnfriend(selectedFriend.friend_id)}>
                                    <img src={Trash} alt="Remove Friend"/>
                                    <p>Remove Friend</p>
                                </div>
                            </div>
                        </div>
                    )
                }



                {
                    !selectedFriend && (
                        <div className={'messagefriends'}>
                            {/* No friend selected */}
                        </div>
                    )
                }
            </>
        );
    }



    useEffect(() => {
        if (selectedFriend) {
            socket.current = io('http://localhost:3001');

            socket.current.on('connect', () => {
                console.log('Socket.IO connected');
            });

            socket.current.on('received_message', (data) => {
                setAllMessage((prevMessages) => [...prevMessages, data]);
            });

            socket.current.on('disconnect', () => {
                console.log('Socket.IO disconnected');
            });

            socket.current.on('error', (error) => {
                console.error('Socket.IO error:', error);
            });

            return () => {
                if (socket.current) {
                    socket.current.disconnect();
                }
            };
        }
    }, [selectedFriend]);

    useEffect(() => {
        if (selectedFriend) {
            const room = user.id > selectedFriend.friend_id ? `${user.id}-${selectedFriend.friend_id}` : `${selectedFriend.friend_id}-${user.id}`;
            socket.emit('join_room', room);

            const handleMessage = (data) => {
                setAllMessage(prevMessages => [...prevMessages, data]);
            };

            socket.on('received_message', handleMessage);

            return () => {
                socket.off('received_message', handleMessage);
            };
        }
    }, [selectedFriend]);

    const handleSend = async () => {
        try{
            if (message.trim() !== '' && selectedFriend) {
                const messageData = {
                    sender: user.id,
                    receiver: selectedFriend.friend_id,
                    content: message,
                    room: user.id > selectedFriend.friend_id ? `${user.id}-${selectedFriend.friend_id}` : `${selectedFriend.friend_id}-${user.id}`,
                };
                socket.emit('send_message', messageData);
                setAllMessage(prevMessages => [...prevMessages, messageData]);
                const response = await axios.post('http://localhost:8000/messager/send-message/',{sender:user.id,content:message,receiver:selectedFriend.id})

                setMessage('');



            }
        }
        catch (e) {
            console.log(e)
        }
    };

    const handleUnfriend = async (friend_id) => {
        try {
            await axios.post(`http://localhost:8000/messager/remove-friend/`, { user1: user.id, user2: friend_id }, {
                headers: { Authorization: `Bearer ${access_token}` }
            });
            console.log("User unfriended");
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        const fetchMessages = async () => {
            if (selectedFriend && selectedFriend.friend_id) {
                try {
                    const response = await axios.post('http://localhost:8000/messager/listmessage/', { receiver: selectedFriend.friend_id }, { headers: { Authorization: `Bearer ${access_token}` } });
                    setAllMessage(response.data);
                } catch (e) {
                    console.log(e);
                }
            }
        };

        fetchMessages();
    }, [selectedFriend, access_token]);

    const handleOpenProfile = () => {
        setOpenProfile(true);
        setView('profile')
    };

    const handleBlacklist = async () => {
        try {
            const response = await axios.post('http://localhost:8000/messager/blacklist/', { user: user.id, blocked_user: selectedFriend.friend_id }, { headers: { Authorization: `Bearer ${access_token}` } });
            console.log(response.data);
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <>

            {/*desktop view*/}
            {selectedFriend && (<div className={openProfile ? 'openMessagerSmall' : 'openMessager'} key={selectedFriend.friend_id}>
                    <div className={openProfile ? 'friend-nav-s' : 'friend-nav'}>
                        <div className={'pic-name'} onClick={() => setOpenProfile(!openProfile)}>
                            <img src={`http://localhost:8000${selectedFriend.friend_profile.profile_picture}`}
                                 alt="Profile"/>
                            <p>{selectedFriend.username}</p>
                        </div>
                        <img src={DotsVertical} alt="Options"/>
                    </div>

                    <div className={openProfile ? 'message-body-s' : 'message-body'}>
                        {allMessage.map((msg, index) => (
                            <div key={index}
                                 className={msg.sender === selectedFriend.friend_id ? 'upcoming messages' : 'receiver messages'}>
                                <p id={'sin-message'}>{msg.content}</p>
                            </div>
                        ))}
                    </div>

                    <div className={openProfile ? 'messagebar-s' : 'messagebar'}>
                        <div className={'emoji'}>
                            <img src={emoji} alt="Emoji"/>
                        </div>
                        <input type={'text'} id={'message'} value={message} onChange={(e) => setMessage(e.target.value)}
                               placeholder={'Message'}/>
                        <div className={'attach'}>
                            <div>
                                <img id={'attach'} src={PaperClipOutline} alt="Attach"/>
                            </div>
                        </div>
                        <div className={'send'} onClick={handleSend}>
                            <div>
                                <img src={DownloadOutline} id={'send'} alt="Send"/>
                            </div>
                        </div>
                    </div>
                </div>)}
            {openProfile === true  && selectedFriend && (<div className={'open_prof'}>
                        {console.log('second')}

                        <div className={'openProf-nav'}>
                            <img src={XOutline} alt="Close" onClick={() => setOpenProfile(false)}/>
                            <p>Profile</p>
                        </div>
                        <div className={'profilepic-o'}>
                            <img src={`http://localhost:8000${selectedFriend.friend_profile.profile_picture}`}
                                 alt="Profile"/>
                        </div>
                        <div className={'fr-username'}>
                            <p>{selectedFriend.username}</p>
                        </div>
                        <div className={'partion'}></div>
                        <div className={'select-about-f'}>
                            <p id={'abou'}>About</p>
                            <p id={'ab'}>{selectedFriend.friend_profile.about}</p>
                        </div>
                        <div className={'partion'}></div>
                        <div className={'danger-but'}>
                            <div className={'ban'} onClick={handleBlacklist}>
                                <img src={BanOutline} alt="Blacklist"/>
                                <p>Blacklist {selectedFriend.username}</p>
                            </div>
                            <div className={'del'}>
                                <img src={Trash} alt="Delete Chat"/>
                                <p>Delete Chat</p>
                            </div>
                            <div className={'del'} onClick={() => handleUnfriend(selectedFriend.friend_id)}>
                                <img src={Trash} alt="Remove Friend"/>
                                <p>Remove Friend</p>
                            </div>
                        </div>
                    </div>)}



            {/*mobile view*/}
            {selectedFriend && view === 'messager'&& (<div>

                    <div className={'openMessager-mob'} key={selectedFriend.friend_id}>
                        <div className={'friend-nav'}>
                            <div className={'pic-name'}>

                                <img id={'back-btn'} src={back_btn} onClick={()=>{

                                    setOpenProfile(false);
                                    setView('messager')
                                    onBackClick();
                                }}/>
                                <div className={'img-in'} onClick={handleOpenProfile}>
                                    <img src={`http://localhost:8000${selectedFriend.friend_profile.profile_picture}`}
                                         alt="Profile"/>

                                    <p>{selectedFriend.username}</p>
                                </div>
                            </div>
                            <img src={DotsVertical} alt="Options"/>
                        </div>
                        <div className={'message-body'}>
                            {allMessage.map((msg, index) => (
                                <div key={index}
                                     className={msg.sender === selectedFriend.friend_id ? 'upcoming messages' : 'receiver messages'}>
                                    <p id={'sin-message'}>{msg.content}</p>
                                </div>
                            ))}
                        </div>
                        <div className={'messagebar'}>
                            <div className={'emoji'}>
                                <img src={emoji} alt="Emoji"/>
                            </div>
                            <input type={'text'} id={'message'} value={message} onChange={(e) => setMessage(e.target.value)}
                                   placeholder={'Message'}/>
                            <div className={'attach'}>
                                <div>
                                    <img id={'attach'} src={PaperClipOutline} alt="Attach"/>
                                </div>
                            </div>
                            <div className={'send'} onClick={handleSend}>
                                <div>
                                    <img src={DownloadOutline} id={'send'} alt="Send"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>)}
            {view === 'profile' && selectedFriend && (<div className={`open_prof-small ${view === 'profile'}?'':'hidden'`}>
                        {console.log('second')}

                        <div className={'openProf-nav'}>
                            <img src={XOutline} alt="Close" onClick={() => setView('messager')}/>
                            <p>Profile</p>
                        </div>
                        <div className={'profilepic-o'}>
                            <img src={`http://localhost:8000${selectedFriend.friend_profile.profile_picture}`}
                                 alt="Profile"/>
                        </div>
                        <div className={'fr-username'}>
                            <p>{selectedFriend.username}</p>
                        </div>
                        <div className={'partion'}></div>
                        <div className={'select-about-f'}>
                            <p id={'abou'}>About</p>
                            <p id={'ab'}>{selectedFriend.friend_profile.about}</p>
                        </div>
                        <div className={'partion'}></div>
                        <div className={'danger-but'}>
                            <div className={'ban'} onClick={handleBlacklist}>
                                <img src={BanOutline} alt="Blacklist"/>
                                <p>Blacklist {selectedFriend.username}</p>
                            </div>
                            <div className={'del'}>
                                <img src={Trash} alt="Delete Chat"/>
                                <p>Delete Chat</p>
                            </div>
                            <div className={'del'} onClick={() => handleUnfriend(selectedFriend.friend_id)}>
                                <img src={Trash} alt="Remove Friend"/>
                                <p>Remove Friend</p>
                            </div>
                        </div>
                    </div>)}



            {!selectedFriend && (<div className={'messagefriends'}>{/* No friend selected */}</div>)}
        </>
    );
}

export default MessageFriends
