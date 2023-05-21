import LoadingBar from "./Loadingbar";
import { useState, useEffect } from "react";
import { FiUserCheck,FiUserX } from 'react-icons/fi';
import axios from "axios";

const SearchCard = ({ user, userid, username, userimage, socket }) => {
    
        const acceptreq = async () => {
            socket.emit('acceptreq', { 'id': userid, 'user': user.id });;
        };
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
                           acceptreq();
                        }}><FiUserCheck className="text-gray-900" /></div>
                    </div>
                </div>

            </div>
        );
};


function Friendrequests(props) {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const getrequests = async () => {
        const user = JSON.parse(localStorage.getItem("socialmediauser"));
        let arr=[];
        const promises=[];
        setLoading(true);
        for (let i = 0; i < user.friendrequestsreceived.length; i++) {

           const promise= axios.get('http://localhost:5000/api/user/getuser', {
                headers: {
                    Authorization: `Bearer ${user.accessToken}`
                },
                params: {
                    'id': user.friendrequestsreceived[i]
                }

            }).then((res) => {
                console.log(res);
                arr.push(res.data);
            }).catch((err) => {
                console.log(err);
                alert("error");
                // return;
            });
            promises.push(promise);
        }
        Promise.all(promises).then(()=>{
            setUsers(arr);
            setLoading(false);
        }).catch(()=>{
            setLoading(false);
            alert("error");
        });

    };
    props.socket.on('reqaccepted', (data) => {
        console.log(data);
        let user=JSON.parse(localStorage.getItem('socialmediauser'));
        if(data==="error")
        {
            alert("error");
            return;
        }
        // console.log(data);
        let newuser=JSON.parse(data);
        newuser.accessToken=user.accessToken;
        localStorage.setItem("socialmediauser",JSON.stringify(newuser));
        // console.log(user);
        getrequests();
    });
    useEffect(() => {
        getrequests();
    }, [props.socket]);
    return (
        <>
            {loading && <LoadingBar />}
            <div className="bg-gradient-to-r py-10 from-purple-400 via-pink-500 to-red-500 flex justify-center w-screen  h-screen">
                <div className="w-1/2">
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                        <div className="flex items-center justify-between px-4 py-3 bg-gray-900">
                            <h2 className="text-white font-medium w-max mx-auto">Friend Requests</h2>
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
}

export default Friendrequests;