import React from "react";
import { useNavigate } from "react-router-dom";

function Card(props)
{
    const navigate = useNavigate();

    return (
        <>
            <div className="mt-8 grid grid-cols-3 gap-4">
        {props.posts.map((post, index) => (
          <div key={index} className="relative">
            <img
              className="w-full rounded-md object-cover"
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
    const navigate = useNavigate();
    const posts = [
        {
          image: 'https://picsum.photos/id/1003/400/400',
          title: 'Beautiful mountain view'
        },
        {
          image: 'https://picsum.photos/id/1011/400/400',
          title: 'Sunset over the ocean'
        },
        {
            image: 'https://picsum.photos/id/1003/400/400',
            title: 'Beautiful mountain view'
          },
          {
            image: 'https://picsum.photos/id/1011/400/400',
            title: 'Sunset over the ocean'
          }
      ];
  return (
    <div className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <div className="container mx-auto">
        <div className="flex justify-between items-center px-4 py-6">
          <div className="flex">
            <div className="mr-6">
              <img src="https://source.unsplash.com/500x500/?portrait" alt="User Profile" className="h-20 w-20 rounded-full border-4 border-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white">Jane Doe</h2>
              <p className="text-lg font-medium text-gray-200">@janedoe</p>
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
            <p className="text-xl font-bold">150</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-medium mb-4">Followers</h3>
            <p className="text-xl font-bold">4.5K</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-medium mb-4">Following</h3>
            <p className="text-xl font-bold">250</p>
          </div>
        </div>
        <div className="mt-8">
          <Card  posts={posts}/>
        </div>
      </div>
    </div>
  );
};

export default Userprofile;
