import React, {useEffect, useState} from 'react';
import axios from "axios";

function Notifications({access_token}) {
    const [listFriendRequest,setListFriendRequest] = useState([])
    useEffect(() => {
        const listFriendRequest  = async () => {
            const response = await axios.get('http://localhost:8000/messager/requests/',{headers: {Authorization:`Bearer ${access_token}`}})
            setListFriendRequest(response.data)
        }
        listFriendRequest()
    }, []);
    const handleAcceptRequest  =async (id) => {
        console.log(id)
        await axios.post(`http://localhost:8000/messager/requests/accept/${id}/`,null,{headers:{Authorization: `Bearer ${access_token}`}})
        console.log('friend request accepted')
    }
    const handleRejectRequest  =async (id) => {
        console.log(id)
        await axios.post(`http://localhost:8000/messager/requests/reject/${id}/`,null,{headers:{Authorization: `Bearer ${access_token}`}})
        console.log('friend request rejected')
    }
    return (
        <>
            {listFriendRequest.map((request)=>{
                return(<div key={request.id}>
                    <p>{request.susername} sent you a friend request</p>
                    <button  onClick={()=>handleAcceptRequest(request.id)}>Accept</button>
                    <button onClick={()=>handleRejectRequest(request.id)}>Reject</button>

                </div>)
            })}
        </>
    );
}

export default Notifications;
