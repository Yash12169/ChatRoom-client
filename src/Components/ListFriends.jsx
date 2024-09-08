import React, {useEffect, useState} from 'react';
import {NavLink, useNavigate} from "react-router-dom";
import axios from "axios";
import Appname from '../assets/Appname.png';
import DotsVertical from '../assets/DotsVertical.png';
import BellOutline from '../assets/BellOutline.png';
import Searchbar from "./Searchbar";
import '../App.css'
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import Search from '../assets/Search.png'
import Adjustments from '../assets/Adjustments.png'
import XOutline from "../assets/XOutline.png";
import BanOutline from "../assets/BanOutline.png";
import Trash from "../assets/Trash.png";
import ArrowLeftOutline from "../assets/ArrowLeftOutline.png";
import default_profile from "../assets/default_profile.png";
import PencilAlt from "../assets/PencilAlt.png";
import CheckOutline from "../assets/CheckOutline.png";
import zero from "../assets/zero-fr.jpeg";
import searchx from "../assets/searchx.png";
import zeroNoti from "../assets/zeroNoti.jpeg";
import friendRequestNew from "../assets/friendRequestNew.jpeg";
import friendRequest from "../assets/friendRequest.jpeg";
import bell from "../assets/bell.jpeg";
import bell2 from "../assets/bell2.jpeg";
import friends_icon_hovered from "../assets/friends_icon_hovered.png";
import addFriend2 from "../assets/addFriend.jpeg";
import blacklist from "../assets/blacklist.jpeg";
import {useDispatch} from "react-redux";
import {useSelector} from "react-redux";
import io from "socket.io-client";
const socket = io.connect('http://localhost:3001');

// import {isVisible} from "@testing-library/user-event/dist/utils";
function ListFriends({access_token,refresh_token,onFriendClick,user}) {
    const [friends, setFriends] = useState([]);
    const [results, setResult] = useState([]);
    const [searchResults,setSearchResults]= useState([])
    const [searchQuery,setSearchQuery] = useState('')
    const [openOptions,setOpenOptions] = useState(false)
    const [openOptionsUser,setOpenOptionsUser] = useState(null)
    const [friendRequestStatus,setFriendRequestStatus] = useState('')
    const [containerClicked, setContainerClicked] = useState(false);
    const [openSelfProfile,setOpenSelfProfile] = useState(false)
    const [profilePicture,setProfilePicture] = useState(default_profile)
    const navigate= useNavigate()
    const [isHovered,setIsHovered] = useState(false)
    const [isUpdloadModalOpen,setIsUpdloadModalOpen] = useState(false)
    const [isVisible,setIsVisible] = useState(false)
    // const [about,setAbout] = useState(user.profile.about)
    const [about, setAbout] = useState(user.profile ? user.profile.about : '');
    const [openUserProfile,setOpenUserProfile] = useState(false)
    const [isEditable,setIsEditable] = useState(false)
    const [openUser,setOpenUser] = useState(null)
    const [openUserProfilePic,setOpenUserProfilePic] = useState(default_profile)
    const [openNotifications,setOpenNotifications] = useState(false)
    const [notifications,setNotifications] = useState([])
    const [openMenu,setOpenMenu] = useState(false)
    const dispatch = useDispatch()
    const [openBlackList,setOpenBlackList] = useState(false)
    const [blackListedUsers,setBlackListedUsers] = useState([])
    const [friendReq,setFriendReq] = useState(null)
    const [visiblity,setVisiblity] = useState(true)
    const [selectedFriend,setSelectedFriend] = useState(null)
    // const client = new W3CWebSocket(`ws://localhost:8000/messager/ws/notifications/`);

    // const friends = useSelector((state)=>state.friends)
    // useEffect(() => {
    //     socket.emit('user_connected',user.id)
    //
    //     socket.on('friend_request_received',(data)=>{
    //         console.log(data)
    //         setNotifications(prev=>[...prev,data])
    //     })
    //     return()=>{
    //         socket.off('friend_request_received')
    //     }
    // }, [user.id]);
    // const sendFriendRequest  = () => {
    //     console.log(user.username)
    //     console.log(user.id)
    //     socket.emit('send_friend_request',{
    //         id:socket.id,
    //         senderId :user.id.toString(),
    //         susername:user.username,
    //         profile_picture:profilePicture,
    //         receiverId:openUser.id.toString(),
    //     })
    //
    //     const response = axios.post('http://localhost:8000/messager/send-request/',{user:user.id ,token:socket.id, sender:openUser.id},{headers: {Authorization: `Bearer ${access_token}`}})
    //     console.log(response.data)
    //
    //     setFriendRequestStatus('request sent')
    //     // console.log('Sent friend request')
    // }
    useEffect(() => {
        socket.emit('user_connected', user.id);

        socket.on('friend_request_received', (data) => {
            setFriendReq(data.id)
            setNotifications((prev) => [...prev, data]);
        });

        return () => {
            socket.off('friend_request_received');
        };
    }, [user.id]);

    const handleAcceptFriend = async (id, token, username, profile_picture) => {
        try {
            // console.log(id);
            // console.log(token);
            //
            // if (!id) {
            //     id = token;
            // }
            //
            // if (!token) {
            //     token = id;
            // }

            const response = await axios.post(
                `http://localhost:8000/messager/requests/accept/${friendReq}/`,
                null,
                { headers: { Authorization: `Bearer ${access_token}` } }
            );

            const newFriend = { friend_id: id, username: username, friend_profile: { profile_picture: profile_picture } };
            window.location.reload();
            setFriends(prevFriend=>[...prevFriend,newFriend]);
            dispatch({ type: 'SET_FRIENDS', payload: newFriend });
            setNotifications(notifications.filter((notification) => notification.id !== id));
        } catch (error) {
            console.log(error);
        }

    };

    const sendFriendRequest = async () => {
        console.log(user.username);
        console.log(user.id);

        try {
            const response = await axios.post(
                'http://localhost:8000/messager/send-request/',
                { user: user.id, token: socket.id, sender: openUser.id },
                { headers: { Authorization: `Bearer ${access_token}` } }
            );
            console.log("this is the shit",response.data.request_id)
            if (response.data.request_id) {
                socket.emit('send_friend_request', {
                    id: response.data.request_id,
                    senderId: user.id.toString(),
                    susername: user.username,
                    profile_picture: profilePicture,
                    receiverId: openUser.id.toString(),
                });

                setFriendRequestStatus('request sent');
            } else {
                console.log('Failed to send friend request');
            }
        } catch (error) {
            console.log(error);
        }
    };






    useEffect(() => {
        const fetchProfilePicture =  async () => {
            try{
                const response = await axios.get(`http://localhost:8000/messager/fetch-profile/${user.id}/`)
                setProfilePicture(response.data.profile_picture)
                console.log(profilePicture,"this shit")
            }
            catch(e){
                console.log(e)
            }
        };
        fetchProfilePicture()
    }, [user.id,profilePicture]);

    const handleHover  = () => {
        setIsHovered(true)
    }
    const handleLeave  = () => {
        setIsHovered(false)
    }
    const handleUploadClick  = () => {
        setIsUpdloadModalOpen(true)
    }

    useEffect(() => {
        const fetchBlackListedUsers  = async () => {
            try{
                const  response = await axios.get(`http://localhost:8000/messager/listblacklist/${user.id}/` ,{headers:{Authorization:`Bearer ${access_token}`}})
                console.log(response.data)
                setBlackListedUsers(response.data)
            }
            catch (e) {
                console.log(e)
            }


        };

        fetchBlackListedUsers()
    }, [user,access_token]);

    useEffect(() => {
        const fetchFriends = async () => {
            try {
                const response = await axios.get('http://localhost:8000/messager/listfriends/', {
                    headers: {Authorization: `Bearer ${access_token}`},
                });

                setFriends(response.data);

            } catch (e) {
                console.log(e);
            }
        };
        fetchFriends();

    }, [access_token]);

        // useEffect(() => {
        //     client.onopen = () => {
        //         console.log('WebSocket Client Connected');
        //     };
        //
        //     client.onmessage = (message) => {
        //         const data = JSON.parse(message.data);
        //         setNotifications((prevNotifications) => [...prevNotifications, data.message]);
        //     };
        //
        //     return () => {
        //         client.close();
        //     };
        // }, []);

        useEffect(() => {
            const fetchNotifications = async () => {
                try {
                    const response = await axios.get('http://localhost:8000/messager/requests/', {
                        headers: { Authorization: `Bearer ${access_token}` },
                    });

                    setNotifications(response.data);
                } catch (e) {
                    console.log(e);
                }
            };

            fetchNotifications();
        }, [access_token]);



    // const handleUnfriend  = async (friend_id) => {
    //     try {
    //         await axios.post(`http://localhost:8000/messager/remove-friend/${friend_id}/`, null, {headers: {Authorization: `Bearer ${access_token}`}})
    //         console.log("user unfriended")
    //         setFriends((prevFriend) => prevFriend.filter((friend) => friend.id !== friend_id))
    //     }
    //     catch (e) {
    //         console.log(e)
    //     }
    // }
    // const handleUnfriend = async (friend_id) => {
    //     try {
    //         await axios.post(`http://localhost:8000/messager/remove-friend/${friend_id}/`, null, {
    //             headers: {Authorization: `Bearer ${access_token}`}
    //         });
    //         console.log("user unfriended");
    //
    //         // Fetch the updated friends list
    //         const response = await axios.get('http://localhost:8000/messager/listfriends/', {
    //             headers: {Authorization: `Bearer ${access_token}`}
    //         });
    //         setFriends(response.data);
    //     } catch (e) {
    //         console.log(e);
    //     }
    // };
    const handleContainerClick = () => {
        // Update state to indicate that the container is clicked
        setContainerClicked(true);
    };

    useEffect(() => {
        document.addEventListener('click', handleDocumentClick);

        // Cleanup the event listener when the component unmounts
        return () => {
            document.removeEventListener('click', handleDocumentClick);
        };
    }, []);

    useEffect(() => {
        if(searchQuery === '')
        {
            setSearchResults([])
        }
        const delayBounceFn= setTimeout(() => {
            handleSearch();
        },300)
        return ()=> clearTimeout(delayBounceFn)
    }, [searchQuery]);
    const handleDocumentClick = () => {
        // Revert the color if the container is not clicked
        if (!containerClicked) {
            // Your logic to revert the color goes here
            // For example, you can set a state to control the color in your component
            // and revert it to the initial color.
        }
        setContainerClicked(false);
    };

    const handleSearch  = async () => {
        try{
            if(searchQuery === '')
            {
                setSearchResults([])
                return;
            }

            const response = await axios.get(
                'http://localhost:8000/messager/search/',
                { headers: { Authorization: `Bearer ${access_token}` }, params: {query: searchQuery}}
            );

            setSearchResults(response.data)
            setResult(response.data)
        }
        catch (e) {
            console.log(e)
        }

    }
    const handleLogout = async () => {
        try {
            await axios.post(
                'http://localhost:8000/authentication/logout/',
                {refresh_token: refresh_token},
                {
                    headers: {Authorization: `Bearer ${access_token}`},
                }
            );
            localStorage.removeItem('access_token');
            navigate('/');
        } catch (e) {
            console.log('Error logging out', e);
        }
    };


    const handleSelfProfile  = () => {
        // console.log(user)

        setOpenSelfProfile(true)
    }

    const handleSavePicture = async (e) => {
        const selectedFile = e.target.files[0];
        setProfilePicture(selectedFile);

        // Create FormData object
        const formData = new FormData();
        formData.append('profile_picture', selectedFile);

        try {
            // Assuming you have a user ID available in your React component
            const userId = user.id;  // Replace with the actual function to get user ID

            // Include 'user' field in the FormData
            formData.append('user', userId);

            const response = await axios.post(
                'http://localhost:8000/messager/save-profile/',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${access_token}`,
                    },
                }
            );
            // console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        // Check if user and user.profile are defined before setting about
        if (user && user.profile) {
            setAbout(user.profile.about);
        }
    }, [user]);


    const handleAbout = async () => {
        setIsEditable(false);

        try {
            // Check if user and user.id are defined before making the API call
            if (user && user.id) {
               const response = await axios.post(
                    'http://localhost:8000/messager/edit-about/',
                    { user_id: user.id, about: about },
                    { headers: { Authorization: `Bearer ${access_token}` } }
                );
                setAbout(response.data.about);
                console.log(response.data.about);
            }
        } catch (e) {
            console.log(e);
        }
    };

    const handleEdit  = () => {
        // setAbout(ab);
        setIsEditable(true);
    }


    const handleNonFriends  = async (user) => {
        // console.log(user)
        const response = await axios.post('http://localhost:8000/messager/send-user/',{user_id:user})

        setOpenUserProfilePic(response.data.profile_picture)
        setOpenUser(response.data)



        // setOpenOptionsUser(response.data)
        // console.log(openUser.profile_picture)
        setOpenUserProfile(true)
        // setOpenOptions(!openOptions)
    }

    const handleRejectFriend  = (id) => {
        try{
            axios.post(`http://localhost:8000/messager/requests/reject/${id}/`,null,{headers:{Authorization: `Bearer ${access_token}`}})
            setNotifications(notifications.filter(notification => notification.id!==id));
        }
        catch (e) {
            console.log(e)
        }
    }
    // const handleAcceptFriend  = (id,token,username,profile_picture) => {
    //     try{
    //         console.log(id)
    //         console.log(token)

    //         if(id === null){
    //             id  = token
    //         }
    //         if(token === null){
    //             token = id;
    //         }
    //         axios.post(`http://localhost:8000/messager/requests/accept/`, {id:id,token:token},{headers:{Authorization: `Bearer ${access_token}`}})
    //         const newFriend = {friend_id:id,username:username,friend_profile:{profile_picture:profile_picture}}
    //
    //         dispatch({type:'SET_FRIENDS',payload:newFriend})
    //
    //         // setFriends([...friends,newFriend])
    //         // console.log("newFriend",newFriend)
    //         // console.log("friend",friends)
    //         setNotifications(notifications.filter(notification => notification.id!==id));
    //     }
    //     catch (e) {
    //         console.log(e)
    //     }
    // }

    const handleBlacklist  = () => {
        setOpenMenu(false)
        setOpenBlackList(true)

    }
    const blackListUser  = async (openUser) => {
        const response = await axios.post('http://localhost:8000/messager/blacklist/',{user:user.id,blocked_user:openUser.id},{headers:{Authorization: `Bearer ${access_token}`}})

        const username = openUser.username
        const profile_picture = openUser.profile_picture
        const about  = openUser.about
        const blocked_user = openUser.id
        const user_id = user.id
        const obj = {
            blocked_user: blocked_user,
            blocked_user_profile:{
                username:username,
                profile_picture:profile_picture,
                about:about
            },
            user:user_id
        }

        setBlackListedUsers([...blackListedUsers,obj])
    }
    const handleWhitelist  = async (blocked_user_id) => {
        const response = await axios.post('http://localhost:8000/messager/whitelist/' ,{user:user.id,blocked_user:blocked_user_id},{headers:{Authorization:`Bearer ${access_token}`}})
        console.log(response.data)
        setBlackListedUsers(blackListedUsers.filter(user=>user.blocked_user !== blocked_user_id))
    }

    return (
        <>
        {openSelfProfile && (
            <div className={`transition ${isVisible ? 'visible' : ''}`}>
                <div className={'open_prof_s'}>
                    <div className={'openProf-nav'}>
                        {/*cross laga dena img me*/}
                        <img src={XOutline} onClick={() => setOpenSelfProfile(false)}/>
                        <p>Profile</p>
                    </div>


                    <div className={'profilepic-o'} onMouseEnter={handleHover} onMouseLeave={handleLeave}
                         onClick={handleUploadClick}>
                        {/*profilepic*/}

                        {profilePicture === null && (<img id={'user-prof-pic'} src={default_profile}/>)}
                        {profilePicture !== null && (
                            <img id={'user-prof-pic'} src={`http://localhost:8000${profilePicture}`}/>)}
                        {/*{user.profile_picture === null &&(<img src={default_profile}/>)}*/}
                        {/*{user.profile_picture !== null &&(<img src={user.profile_picture}/>)}*/}
                        {isHovered && (
                            <div className="overlay" onClick={handleUploadClick}>
                                <input className={'hidden'} type={"file"} onChange={handleSavePicture}/>
                                <p id={'description-upload'}>Change your profile picture</p>
                            </div>
                        )}
                    </div>
                    <img/>
                    <p id={'usr-name'}>{user.username}</p>
                    <div className={'partion'}></div>
                    <div className={'select-about'} onMouseEnter={() => setIsVisible(true)}
                         onMouseLeave={() => setIsVisible(false)}>
                        <div className={'self-about'}>
                            <p id={'abou'}>About</p>
                            {isEditable && (
                                <div className={'edit-about'}>
                                    <input id={'ab-in'} value={about} type={"text"}
                                           onChange={(e) => setAbout(e.target.value)}/>
                                    <div className={'checkimg'}>
                                        <img onClick={handleAbout} src={CheckOutline}/>
                                    </div>
                                    {/*<button id={'save'}  onClick={handleAbout}>Save</button>*/}
                                </div>
                            )}
                            {!isEditable && (<p id={'ab'}>{about}</p>)}
                            {/*{!isEditable && (<p id={'ab'}>{user.profile.about}</p>)}*/}
                        </div>
                        <img id={isVisible ? 'edit-about' : 'notVis'} src={PencilAlt} onClick={handleEdit}/>
                    </div>
                    <div className={'partion'}></div>
                    <div className={'danger-but'}>
                        <div className={'lg-out'} onClick={handleLogout}>
                            <img src={ArrowLeftOutline}/>
                            <p>Log-out</p>
                        </div>
                    </div>
                </div>
            </div>
        )}

        {openUserProfile && (
            <div className={`transition ${isVisible ? 'visible' : ''}`}>
                <div className={'open_prof_s'}>
                    <div className={'openProf-nav'}>

                        <img src={XOutline} onClick={() => setOpenUserProfile(false)}/>
                        <p>Profile</p>
                    </div>
                    <div className={'profilepic-o'} onMouseEnter={handleHover} onMouseLeave={handleLeave}
                         onClick={handleUploadClick}>


                        {openUserProfilePic === null && (
                            <img id={'open-prof-pic'}
                                 src={default_profile}/>
                        )}

                        {openUserProfilePic !== null && (
                            <img
                                src={`data:image/jpeg;base64,${openUserProfilePic}`}
                                alt="Profile Picture"
                            />
                        )}

                    </div>
                    <p id={'usr-name'}>{openUser.username}</p>
                    <div className={'partion'}></div>
                    <div className={'select-about'}>
                        <div className={'self-about'}>
                            <p id={'abou'}>About</p>
                            <p id={'ab'}>{openUser.about}</p>
                        </div>

                    </div>
                    <div className={'partion'}></div>
                    {openUser.id !== user.id && (
                        <div className={'danger-but'}>
                            <div className={'lg-out'}>
                                <img className={'icons2'} src={addFriend2}/>
                                <p onClick={sendFriendRequest}>Send friend request</p>
                            </div>
                            <div className={'lg-out'}>
                                <img className={'icons2'} src={blacklist}/>
                                <p onClick={() => blackListUser(openUser)}>Blacklist {openUser.username}</p>

                            </div>
                        </div>
                    )}
                </div>
            </div>
        )}


        {openNotifications && (
            <div className={`transition ${isVisible ? 'visible' : ''}`}>
                <div className={'open_prof_s'}>
                    <div className={'openProf-nav'}>
                        <img src={XOutline} onClick={() => setOpenNotifications(false)}/>
                        <p>Friend Requests</p>
                    </div>
                    {notifications.length !== 0 && (
                        <div>

                            {notifications.map((notification) => (
                                    <div className={'notification'} key={notification.id}>
                                        <div className={'noti-details'}>
                                            {notification.profile_picture && (<img className={'noti-pict'}
                                                                                   src={`http://localhost:8000${notification.profile_picture}`}/>)}
                                            {!notification.profile_picture && (
                                                <img className={'noti-pict'} src={default_profile}/>)}
                                            <p>{notification.susername} sent you a friend request</p>
                                        </div>

                                        <div className={'noti-bt'}>
                                            <button className={'but1 small'}
                                                    onClick={() => handleAcceptFriend(notification.id, notification.token, notification.susername, notification.profile_picture)}>Accept
                                            </button>
                                            <button className={'but1 small red'}
                                                    onClick={() => handleRejectFriend(notification.id)}>Reject
                                            </button>
                                        </div>

                                    </div>
                                )
                            )}
                        </div>
                    )}
                    {notifications.length === 0 && (
                        <div className={'zero-noti'}>
                            <img src={zeroNoti}/>
                            <p>You have no recent friend requests</p>
                        </div>
                    )}
                </div>
            </div>
        )}


        {openBlackList && (
            <div className={`transition ${isVisible ? 'visible' : ''}`}>
                <div className={'open_prof_s'}>
                    <div className={'openProf-nav'}>
                        {/*cross laga dena img me*/}
                        <img src={XOutline} onClick={() => setOpenBlackList(false)}/>
                        <p>Blacklisted Users</p>
                    </div>

                    {blackListedUsers.length !== 0 && blackListedUsers.map((blacklistUser) => (
                        <div key={blacklistUser.blocked_user} className={'bl-container'}>

                            <div className={'bl-user-details'}>
                                {!blacklistUser.blocked_user_profile.profile_picture && (
                                    <img id={'bl-user-pic'} src={default_profile}/>)}


                                {/*{blacklistUser.blocked_user_profile.profile_picture && (*/}
                                {/*    <img id={'bl-user-pic'}*/}
                                {/*         src={`http://localhost:8000/${blacklistUser.blocked_user_profile.profile_picture}`}/>)}*/}

                                {blacklistUser.blocked_user_profile.profile_picture && (
                                    <>
                                        {blacklistUser.blocked_user_profile.profile_picture.startsWith('data:image') ? (
                                            <img
                                                id={'bl-user-pic'}
                                                src={blacklistUser.blocked_user_profile.profile_picture}
                                                alt="Profile Picture"
                                            />
                                        ) : (
                                            <img
                                                id={'bl-user-pic'}
                                                src={`http://localhost:8000/${blacklistUser.blocked_user_profile.profile_picture}`}
                                                alt="Profile Picture"
                                            />
                                        )}
                                    </>
                                )}


                                <p>{blacklistUser.blocked_user_profile.username}</p>

                            </div>
                            <button className={'but1 whitelist'}
                                    onClick={() => handleWhitelist(blacklistUser.blocked_user)}>Whitelist
                            </button>
                        </div>
                    ))}
                    {blackListedUsers.length === 0 && (
                        <div className={'zero-noti'}>
                            <img src={zeroNoti}/>
                            <p>Empty</p>
                        </div>
                    )}
                </div>
            </div>
        )}


        {!openSelfProfile && !openBlackList && !openUserProfile && !openNotifications && (
            <div>
                <div className={'listfriends-big'}>
                    <div className={'home-utils'}>
                        <div className={'appname-home'}>
                            <img id={'appname-home'} src={Appname}/>
                            <div className={'images'}>
                                <div className={'lguser-prof'} onClick={handleSelfProfile}>
                                    <div className={'friend-prof-pic'}>
                                        {user.profile_picture === null && (<img src={default_profile}/>)}
                                        {user.profile_picture !== null && (
                                            <img src={`http://localhost:8000${profilePicture}/`}/>)}
                                    </div>
                                </div>
                                {/*{console.log(`http://localhost:8000${profilePicture}/`)}*/}

                                {notifications.length === 0 && (
                                    <img id={'bell'} src={bell} onClick={() => setOpenNotifications(true)}/>)}
                                {notifications.length !== 0 && (
                                    <img id={'bell'} src={bell2} onClick={() => setOpenNotifications(true)}/>)}

                                {/*<img id={'dots'} src={DotsVertical} onClick={() => setOpenMenu(!openMenu)}/>*/}
                                {/*{openMenu && (*/}
                                {/*    <div>*/}
                                {/*        <div className="menu">*/}
                                {/*            /!* Menu items *!/*/}
                                {/*            <div className="menu-item">Item 1</div>*/}
                                {/*            <div className="menu-item">Item 2</div>*/}
                                {/*            <div className="menu-item">Item 3</div>*/}
                                {/*        </div>*/}
                                {/*    </div>*/}
                                {/*)}*/}

                                <div className={openMenu ? "dropdown block" : "dropdown"}>
                                    <button className={"dropbtn"}>
                                        <img id={'dots'} src={DotsVertical} onClick={() => setOpenMenu(!openMenu)}/>
                                    </button>
                                    <div className="dropdown-content">
                                        <div className="menu-item bl-list" onClick={handleBlacklist}>Blacklisted Users
                                        </div>
                                        <div className="menu-item settings">Settings</div>
                                        {/*<div className="menu-item">Item 3</div>*/}
                                    </div>
                                </div>


                            </div>

                        </div>
                        <div className={`searchbar`}>
                            <div className={'box'}>
                                <img src={Search}/>
                            </div>
                            <input type={"text"} placeholder={'Search'} value={searchQuery}
                                   onChange={e => setSearchQuery(e.target.value)}/>
                            {/*<button onClick={handleSearch}>Search</button>*/}

                            {/*{openOptions && (*/}
                            {/*    <div>*/}
                            {/*        <button >send friend request</button>*/}
                            {/*        <button>Blacklist</button>*/}
                            {/*    </div>*/}
                            {/*)}*/}
                            <div className={'box5'}>
                                {searchQuery.length !== 0 && (<img onClick={() => setSearchQuery('')} src={searchx}/>)}

                            </div>
                            <img id={'filter'} src={Adjustments}/>
                        </div>
                    </div>
                    {searchResults.map((user) => {
                        return (
                            <div key={user.user} className={'searched-user'}
                                 onClick={() => handleNonFriends(user.user)}>

                                <div className={'friend-prof-pic'}>
                                    {user.profile_picture === null && (<img src={default_profile}/>)}
                                    {user.profile_picture !== null && (<img src={user.profile_picture}/>)}
                                </div>
                                <div className={'searched-user-about'}>
                                    <div className={'friends_searched_image'}>
                                        <p className={'usr'}>{user.username}</p>
                                        <img id={'friends_icon_hovered'} src={friends_icon_hovered}/>
                                    </div>

                                    <p className={'latest-msg'}>{user.about}</p>
                                </div>

                            </div>)
                    })}
                    {searchQuery.length === 0 && (
                        <div>
                            {friends.length === 0 && (
                                <div className={'zero-friends'}>
                                    <img src={zero}/>
                                    <div className={'zero-friends-p'}>
                                        <p>No friends yet? No big deal. Connect with people who share your interests and
                                            start building your network</p>
                                    </div>

                                </div>
                            )}
                            {friends.map((friend) => (
                                    <div className={'friend'} key={friend.friend_id} onClick={() => {
                                        onFriendClick(friend)
                                        setSelectedFriend(friend)
                                    }}>


                                        <div className={'friend-prof-pic'}>
                                            <img
                                                src={`http://localhost:8000${friend.friend_profile.profile_picture}`}/>
                                        </div>
                                        <div className={'friend-username'}>
                                            <NavLink to={'#'} className={'usr'}>
                                                {friend.username}
                                            </NavLink>
                                            <p className={'latest-msg'}>hey there how are you?</p>
                                        </div>
                                        <div className={'timi'}>
                                            <p className={'time'}>10:41 PM</p>
                                        </div>
                                    </div>
                                )
                            )}
                            {friends.map((friend) => (
                                    <div className={'friend'} key={friend.friend_id} onClick={() => {
                                        onFriendClick(friend)
                                        setSelectedFriend(friend)
                                    }}>


                                        <div className={'friend-prof-pic'}>
                                            <img
                                                src={`http://localhost:8000${friend.friend_profile.profile_picture}`}/>
                                        </div>
                                        <div className={'friend-username'}>
                                            <NavLink to={'#'} className={'usr'}>
                                                {friend.username}
                                            </NavLink>
                                            <p className={'latest-msg'}>hey there how are you?</p>
                                        </div>
                                        <div className={'timi'}>
                                            <p className={'time'}>10:41 PM</p>
                                        </div>
                                    </div>
                                )
                            )}
                            {friends.map((friend) => (
                                    <div className={'friend'} key={friend.friend_id} onClick={() => {
                                        onFriendClick(friend)
                                        setSelectedFriend(friend)
                                    }}>


                                        <div className={'friend-prof-pic'}>
                                            <img
                                                src={`http://localhost:8000${friend.friend_profile.profile_picture}`}/>
                                        </div>
                                        <div className={'friend-username'}>
                                            <NavLink to={'#'} className={'usr'}>
                                                {friend.username}
                                            </NavLink>
                                            <p className={'latest-msg'}>hey there how are you?</p>
                                        </div>
                                        <div className={'timi'}>
                                            <p className={'time'}>10:41 PM</p>
                                        </div>
                                    </div>
                                )
                            )}
                            {friends.map((friend) => (
                                    <div className={'friend'} key={friend.friend_id} onClick={() => {
                                        onFriendClick(friend)
                                        setSelectedFriend(friend)
                                    }}>


                                        <div className={'friend-prof-pic'}>
                                            <img
                                                src={`http://localhost:8000${friend.friend_profile.profile_picture}`}/>
                                        </div>
                                        <div className={'friend-username'}>
                                            <NavLink to={'#'} className={'usr'}>
                                                {friend.username}
                                            </NavLink>
                                            <p className={'latest-msg'}>hey there how are you?</p>
                                        </div>
                                        <div className={'timi'}>
                                            <p className={'time'}>10:41 PM</p>
                                        </div>
                                    </div>
                                )
                            )}
                            {friends.map((friend) => (
                                    <div className={'friend'} key={friend.friend_id} onClick={() => {
                                        onFriendClick(friend)
                                        setSelectedFriend(friend)
                                    }}>


                                        <div className={'friend-prof-pic'}>
                                            <img
                                                src={`http://localhost:8000${friend.friend_profile.profile_picture}`}/>
                                        </div>
                                        <div className={'friend-username'}>
                                            <NavLink to={'#'} className={'usr'}>
                                                {friend.username}
                                            </NavLink>
                                            <p className={'latest-msg'}>hey there how are you?</p>
                                        </div>
                                        <div className={'timi'}>
                                            <p className={'time'}>10:41 PM</p>
                                        </div>
                                    </div>
                                )
                            )}
                            {friends.map((friend) => (
                                    <div className={'friend'} key={friend.friend_id} onClick={() => {
                                        onFriendClick(friend)
                                        setSelectedFriend(friend)
                                    }}>


                                        <div className={'friend-prof-pic'}>
                                            <img
                                                src={`http://localhost:8000${friend.friend_profile.profile_picture}`}/>
                                        </div>
                                        <div className={'friend-username'}>
                                            <NavLink to={'#'} className={'usr'}>
                                                {friend.username}
                                            </NavLink>
                                            <p className={'latest-msg'}>hey there how are you?</p>
                                        </div>
                                        <div className={'timi'}>
                                            <p className={'time'}>10:41 PM</p>
                                        </div>
                                    </div>
                                )
                            )}
                            {friends.map((friend) => (
                                    <div className={'friend'} key={friend.friend_id} onClick={() => {
                                        onFriendClick(friend)
                                        setSelectedFriend(friend)
                                    }}>


                                        <div className={'friend-prof-pic'}>
                                            <img
                                                src={`http://localhost:8000${friend.friend_profile.profile_picture}`}/>
                                        </div>
                                        <div className={'friend-username'}>
                                            <NavLink to={'#'} className={'usr'}>
                                                {friend.username}
                                            </NavLink>
                                            <p className={'latest-msg'}>hey there how are you?</p>
                                        </div>
                                        <div className={'timi'}>
                                            <p className={'time'}>10:41 PM</p>
                                        </div>
                                    </div>
                                )
                            )}
                            {friends.map((friend) => (
                                    <div className={'friend'} key={friend.friend_id} onClick={() => {
                                        onFriendClick(friend)
                                        setSelectedFriend(friend)
                                    }}>


                                        <div className={'friend-prof-pic'}>
                                            <img
                                                src={`http://localhost:8000${friend.friend_profile.profile_picture}`}/>
                                        </div>
                                        <div className={'friend-username'}>
                                            <NavLink to={'#'} className={'usr'}>
                                                {friend.username}
                                            </NavLink>
                                            <p className={'latest-msg'}>hey there how are you?</p>
                                        </div>
                                        <div className={'timi'}>
                                            <p className={'time'}>10:41 PM</p>
                                        </div>
                                    </div>
                                )
                            )}
                            {friends.map((friend) => (
                                    <div className={'friend'} key={friend.friend_id} onClick={() => {
                                        onFriendClick(friend)
                                        setSelectedFriend(friend)
                                    }}>


                                        <div className={'friend-prof-pic'}>
                                            <img
                                                src={`http://localhost:8000${friend.friend_profile.profile_picture}`}/>
                                        </div>
                                        <div className={'friend-username'}>
                                            <NavLink to={'#'} className={'usr'}>
                                                {friend.username}
                                            </NavLink>
                                            <p className={'latest-msg'}>hey there how are you?</p>
                                        </div>
                                        <div className={'timi'}>
                                            <p className={'time'}>10:41 PM</p>
                                        </div>
                                    </div>
                                )
                            )}
                            {friends.map((friend) => (
                                    <div className={'friend'} key={friend.friend_id} onClick={() => {
                                        onFriendClick(friend)
                                        setSelectedFriend(friend)
                                    }}>


                                        <div className={'friend-prof-pic'}>
                                            <img
                                                src={`http://localhost:8000${friend.friend_profile.profile_picture}`}/>
                                        </div>
                                        <div className={'friend-username'}>
                                            <NavLink to={'#'} className={'usr'}>
                                                {friend.username}
                                            </NavLink>
                                            <p className={'latest-msg'}>hey there how are you?</p>
                                        </div>
                                        <div className={'timi'}>
                                            <p className={'time'}>10:41 PM</p>
                                        </div>
                                    </div>
                                )
                            )}
                            {friends.map((friend) => (
                                    <div className={'friend'} key={friend.friend_id} onClick={() => {
                                        onFriendClick(friend)
                                        setSelectedFriend(friend)
                                    }}>


                                        <div className={'friend-prof-pic'}>
                                            <img
                                                src={`http://localhost:8000${friend.friend_profile.profile_picture}`}/>
                                        </div>
                                        <div className={'friend-username'}>
                                            <NavLink to={'#'} className={'usr'}>
                                                {friend.username}
                                            </NavLink>
                                            <p className={'latest-msg'}>hey there how are you?</p>
                                        </div>
                                        <div className={'timi'}>
                                            <p className={'time'}>10:41 PM</p>
                                        </div>
                                    </div>
                                )
                            )}
                            {friends.map((friend) => (
                                    <div className={'friend'} key={friend.friend_id} onClick={() => {
                                        onFriendClick(friend)
                                        setSelectedFriend(friend)
                                    }}>


                                        <div className={'friend-prof-pic'}>
                                            <img
                                                src={`http://localhost:8000${friend.friend_profile.profile_picture}`}/>
                                        </div>
                                        <div className={'friend-username'}>
                                            <NavLink to={'#'} className={'usr'}>
                                                {friend.username}
                                            </NavLink>
                                            <p className={'latest-msg'}>hey there how are you?</p>
                                        </div>
                                        <div className={'timi'}>
                                            <p className={'time'}>10:41 PM</p>
                                        </div>
                                    </div>
                                )
                            )}
                            {friends.map((friend) => (
                                    <div className={'friend'} key={friend.friend_id} onClick={() => {
                                        onFriendClick(friend)
                                        setSelectedFriend(friend)
                                    }}>


                                        <div className={'friend-prof-pic'}>
                                            <img
                                                src={`http://localhost:8000${friend.friend_profile.profile_picture}`}/>
                                        </div>
                                        <div className={'friend-username'}>
                                            <NavLink to={'#'} className={'usr'}>
                                                {friend.username}
                                            </NavLink>
                                            <p className={'latest-msg'}>hey there how are you?</p>
                                        </div>
                                        <div className={'timi'}>
                                            <p className={'time'}>10:41 PM</p>
                                        </div>
                                    </div>
                                )
                            )}
                            {friends.map((friend) => (
                                    <div className={'friend'} key={friend.friend_id} onClick={() => {
                                        onFriendClick(friend)
                                        setSelectedFriend(friend)
                                    }}>


                                        <div className={'friend-prof-pic'}>
                                            <img
                                                src={`http://localhost:8000${friend.friend_profile.profile_picture}`}/>
                                        </div>
                                        <div className={'friend-username'}>
                                            <NavLink to={'#'} className={'usr'}>
                                                {friend.username}
                                            </NavLink>
                                            <p className={'latest-msg'}>hey there how are you?</p>
                                        </div>
                                        <div className={'timi'}>
                                            <p className={'time'}>10:41 PM</p>
                                        </div>
                                    </div>
                                )
                            )}



























































                            {/*{Object.values(friends).map((friend) => (*/}
                            {/*    <div key={friend.friend_id}>*/}
                            {/*        {console.log("1",friend.friend_id)}*/}
                            {/*        {console.log("2",friends)}*/}
                            {/*        <p>Username: {friend.username}</p>*/}
                            {/*        <p>Friend ID: {friend.friend_id}</p>*/}
                            {/*        <p>Created At: {friend.created_at}</p>*/}
                            {/*        /!* Render other friend details as needed *!/*/}
                            {/*        <hr /> /!* Add a horizontal line between friends for separation *!/*/}
                            {/*    </div>*/}
                            {/*))}*/}

                        </div>
                    )}
                </div>

                    <div className={'listfriends-mob'}>
                        <div className={'home-utils'}>
                            <div className={'appname-home'}>
                                <img id={'appname-home'} src={Appname}/>
                                <div className={'images'}>
                                    <div className={'lguser-prof'} onClick={handleSelfProfile}>
                                        <div className={'friend-prof-pic'}>
                                            {user.profile_picture === null && (<img src={default_profile}/>)}
                                            {user.profile_picture !== null && (
                                                <img src={`http://localhost:8000${profilePicture}/`}/>)}
                                        </div>
                                    </div>
                                    {/*{console.log(`http://localhost:8000${profilePicture}/`)}*/}

                                    {notifications.length === 0 && (
                                        <img id={'bell'} src={bell} onClick={() => setOpenNotifications(true)}/>)}
                                    {notifications.length !== 0 && (
                                        <img id={'bell'} src={bell2} onClick={() => setOpenNotifications(true)}/>)}

                                    {/*<img id={'dots'} src={DotsVertical} onClick={() => setOpenMenu(!openMenu)}/>*/}
                                    {/*{openMenu && (*/}
                                    {/*    <div>*/}
                                    {/*        <div className="menu">*/}
                                    {/*            /!* Menu items *!/*/}
                                    {/*            <div className="menu-item">Item 1</div>*/}
                                    {/*            <div className="menu-item">Item 2</div>*/}
                                    {/*            <div className="menu-item">Item 3</div>*/}
                                    {/*        </div>*/}
                                    {/*    </div>*/}
                                    {/*)}*/}

                                    <div className={openMenu ? "dropdown block" : "dropdown"}>
                                        <button className={"dropbtn"}>
                                            <img id={'dots'} src={DotsVertical} onClick={() => setOpenMenu(!openMenu)}/>
                                        </button>
                                        <div className="dropdown-content">
                                            <div className="menu-item bl-list" onClick={handleBlacklist}>Blacklisted
                                                Users
                                            </div>
                                            <div className="menu-item settings">Settings</div>
                                            {/*<div className="menu-item">Item 3</div>*/}
                                        </div>
                                    </div>


                                </div>

                            </div>
                            <div className={`searchbar`}>
                                <div className={'box'}>
                                    <img src={Search}/>
                                </div>
                                <input type={"text"} placeholder={'Search'} value={searchQuery}
                                       onChange={e => setSearchQuery(e.target.value)}/>
                                {/*<button onClick={handleSearch}>Search</button>*/}

                                {/*{openOptions && (*/}
                                {/*    <div>*/}
                                {/*        <button >send friend request</button>*/}
                                {/*        <button>Blacklist</button>*/}
                                {/*    </div>*/}
                                {/*)}*/}
                                <div className={'box5'}>
                                    {searchQuery.length !== 0 && (
                                        <img onClick={() => setSearchQuery('')} src={searchx}/>)}

                                </div>
                                <img id={'filter'} src={Adjustments}/>
                            </div>
                        </div>
                        {searchResults.map((user) => {
                            return (
                                <div key={user.user} className={'searched-user'}
                                     onClick={() => handleNonFriends(user.user)}>

                                    <div className={'friend-prof-pic'}>
                                        {user.profile_picture === null && (<img src={default_profile}/>)}
                                        {user.profile_picture !== null && (<img src={user.profile_picture}/>)}
                                    </div>
                                    <div className={'searched-user-about'}>
                                        <div className={'friends_searched_image'}>
                                            <p className={'usr'}>{user.username}</p>
                                            <img id={'friends_icon_hovered'} src={friends_icon_hovered}/>
                                        </div>

                                        <p className={'latest-msg'}>{user.about}</p>
                                    </div>

                                </div>)
                        })}
                        {searchQuery.length === 0 && (
                            <div>
                                {friends.length === 0 && (
                                    <div className={'zero-friends'}>
                                        <img src={zero}/>
                                        <div className={'zero-friends-p'}>
                                            <p>No friends yet? No big deal. Connect with people who share your interests
                                                and
                                                start building your network</p>
                                        </div>

                                    </div>
                                )}
                                {friends.map((friend) => (
                                        <div className={'friend'} key={friend.friend_id} onClick={() => {
                                            onFriendClick(friend)
                                            setSelectedFriend(friend)
                                        }}>
                                            <div className={'friend-prof-pic'}>
                                                <img
                                                    src={`http://localhost:8000${friend.friend_profile.profile_picture}`}/>
                                            </div>
                                            <div className={'friend-username'}>
                                                <NavLink to={'#'} className={'usr'}>
                                                    {friend.username}
                                                </NavLink>
                                                <p className={'latest-msg'}>hey there how are you?</p>
                                            </div>
                                            <div className={'timi'}>
                                                <p className={'time'}>10:41 PM</p>
                                            </div>
                                        </div>
                                    )
                                )}




                                {/*{Object.values(friends).map((friend) => (*/}
                                {/*    <div key={friend.friend_id}>*/}
                                {/*        {console.log("1",friend.friend_id)}*/}
                                {/*        {console.log("2",friends)}*/}
                                {/*        <p>Username: {friend.username}</p>*/}
                                {/*        <p>Friend ID: {friend.friend_id}</p>*/}
                                {/*        <p>Created At: {friend.created_at}</p>*/}
                                {/*        /!* Render other friend details as needed *!/*/}
                                {/*        <hr /> /!* Add a horizontal line between friends for separation *!/*/}
                                {/*    </div>*/}
                                {/*))}*/}





































































































                            </div>
                        )}
                    </div>

            </div>


        )
        }
        </>
    )
        ;
}

export default ListFriends;

