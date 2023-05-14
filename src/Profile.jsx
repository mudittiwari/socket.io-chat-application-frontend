import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
function Card(props)
{
    const navigate = useNavigate();

    return (
        <>
            <div className="mt-8 grid grid-cols-3 gap-4">
        {props.posts.map((post, index) => (
          <div key={index} className="relative">
            <img
              className="w-full rounded-md h-full"
              src={post.image}
              alt="Post Image"
            />
            <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black to-transparent w-full p-2">
              <h3 className="text-white text-md font-bold">{post.title}</h3>
            </div>
          </div>
        ))}
      </div>
        </>
    );
}

const Userprofile = () => {
  const [userposts, setuserposts] = React.useState([]);
  const [user,setUser] = React.useState(JSON.parse(localStorage.getItem('socialmediauser')));
  const getuserposts = async () => {
    axios.get('http://localhost:5000/api/post/getposts', {
      headers: {
        Authorization: `Bearer ${user.accessToken}`
      },
    }).then((res)=>{
      console.log(res.data);
      setuserposts(res.data);
    })
  };
  useEffect(() => {
    getuserposts();
  }, []);

    const navigate = useNavigate();
    
  return (
    <div className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <div className="container mx-auto">
        <div className="flex justify-between items-center px-4 py-6">
          <div className="flex">
            <div className="mr-6">
              <img src={user.profilepicture} alt="User Profile" className="h-20 w-20 rounded-full border-4 border-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white">{user.name}</h2>
              <p className="text-lg font-medium text-gray-200">{user.username}</p>
            </div>
          </div>
          <div>
            <button onClick={(e)=>{
                e.preventDefault();
                navigate('/editprofile');
            }} className="bg-white text-purple-500 font-medium py-2 px-4 rounded-full">Edit Profile</button>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-medium mb-4">Posts</h3>
            <p className="text-xl font-bold">{userposts.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-medium mb-4">Friends</h3>
            <p className="text-xl font-bold">{user.friends.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-medium mb-4">Friend Requests</h3>
            <p className="text-xl font-bold">{user.friendrequestsreceived.length}</p>
          </div>
        </div>
        <div className="mt-8">
          <Card  posts={userposts}/>
        </div>
      </div>
    </div>
  );
};

export default Userprofile;
