import React, { useEffect, useState } from "react";
import { RiUserAddFill, RiUserReceivedFill,RiUserFollowFill } from 'react-icons/ri';
import { FaUserFriends } from 'react-icons/fa';
import axios from "axios";
import LoadingBar from "./Loadingbar";
const SearchCard = ({ user, userid, username, userimage, socket }) => {
    const sendreq = async (id) => {
        socket.emit('sendreq', { 'id': id, 'user': JSON.parse(localStorage.getItem('socialmediauser')).id });
    };
    console.log(user.friendrequestsreceived.includes(userid));
    if (user.friends.includes(userid)) {
        return (
            <div className='flex items-center justify-between px-4 my-2 py-3 bg-gray-200 rounded-md w-full'>
                <div className="flex items-center w-full">
                    <img
                        className="w-10 h-10 rounded-full object-cover"
                        src={userimage}
                        alt={`${username}'s profile`}
                    />
                    <div className="ml-2 flex w-full justify-between">
                        {/* <p className="font-medium text-sm">{user.name}</p> */}
                        <p className={`text-xs text-gray-700`}>{username}</p>
                        <div onClick={() => {
                            // sendreq(userid);
                        }}><FaUserFriends className="text-gray-900" /></div>
                    </div>
                </div>

            </div>
        );
    }
    else if (user.friendrequestssent.includes(userid)) {
        return (
            <div className='flex items-center justify-between px-4 my-2 py-3 bg-gray-200 rounded-md w-full'>
                <div className="flex items-center w-full">
                    <img
                        className="w-10 h-10 rounded-full object-cover"
                        src={userimage}
                        alt={`${username}'s profile`}
                    />
                    <div className="ml-2 flex w-full justify-between">
                        {/* <p className="font-medium text-sm">{user.name}</p> */}
                        <p className={`text-xs text-gray-700`}>{username}</p>
                        <div onClick={() => {
                            // sendreq(userid);
                        }}><RiUserFollowFill className="text-gray-900" /></div>
                    </div>
                </div>

            </div>
        );
    }
    else if (user.friendrequestsreceived.includes(userid)) {
        return (
            <div className='flex items-center justify-between px-4 my-2 py-3 bg-gray-200 rounded-md w-full'>
                <div className="flex items-center w-full">
                    <img
                        className="w-10 h-10 rounded-full object-cover"
                        src={userimage}
                        alt={`${username}'s profile`}
                    />
                    <div className="ml-2 flex w-full justify-between">
                        {/* <p className="font-medium text-sm">{user.name}</p> */}
                        <p className={`text-xs text-gray-700`}>{username}</p>
                        <div onClick={() => {
                            // sendreq(userid);
                        }}><RiUserReceivedFill className="text-gray-900" /></div>
                    </div>
                </div>

            </div>
        );
    }
    else { 
        return (
            <div className='flex items-center justify-between px-4 my-2 py-3 bg-gray-200 rounded-md w-full'>
                <div className="flex items-center w-full">
                    <img
                        className="w-10 h-10 rounded-full object-cover"
                        src={userimage}
                        alt={`${username}'s profile`}
                    />
                    <div className="ml-2 flex w-full justify-between">
                        {/* <p className="font-medium text-sm">{user.name}</p> */}
                        <p className={`text-xs text-gray-700`}>{username}</p>
                        <div onClick={() => {
                            sendreq(userid);
                        }}><RiUserAddFill className="text-gray-900" /></div>
                    </div>
                </div>

            </div>
        );
    }
};
const Searchpage = (props) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('socialmediauser')));
    console.log(user);
    const getusers = async () => {
        axios.get('http://localhost:5000/api/user/getallusers', {
            headers: {
                Authorization: `Bearer ${user.accessToken}`
            },

        }).then((res) => {
            console.log(res);
            setUsers(res.data);
            setLoading(false);
        }).catch((err) => {
            setLoading(false);
            console.log(err);
            alert("error");
        });
    };
    props.socket.on('reqsent', (data) => {
        let token=user.accessToken;
        let newuser=JSON.parse(data);
        newuser.accessToken=token;
        localStorage.setItem('socialmediauser',JSON.stringify(newuser));
        // getusers();
    });
    useEffect(() => {
        getusers();
    }, [props.socket]);

    return (
        <>
            {loading && <LoadingBar />}
            <div className="bg-gradient-to-r py-10 from-purple-400 via-pink-500 to-red-500 flex justify-center w-screen  h-screen">
                <div className="w-1/2">
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                        <div className="flex items-center justify-between px-4 py-3 bg-gray-900">
                            <h2 className="text-white font-medium w-max mx-auto">Users</h2>
                        </div>
                        <div className="p-4">
                            {users.map((user, index) => {
                                if (user.id === JSON.parse(localStorage.getItem('socialmediauser')).id)
                                    return null;
                                return <SearchCard

                                    key={index}
                                    user={JSON.parse(localStorage.getItem('socialmediauser'))}
                                    userid={user.id}
                                    username={user.username}
                                    userimage={user.profilepicture}
                                    socket={props.socket}
                                />
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Searchpage;
