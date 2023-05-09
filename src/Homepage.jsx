import React from 'react';
import { FaHome, FaRegComment, FaBell, FaUser,FaThumbsUp, FaComment } from 'react-icons/fa';
import { useState } from 'react';

import Navbar from './Navbar';
import { useEffect } from 'react';
function PostCard(props) {
  const [likes, setLikes] = useState(props.likes);
  const [isLiked, setIsLiked] = useState(false);
  const [comment, setComment] = useState('');

  const handleLikeClick = () => {
    if (isLiked) {
      setLikes(likes - 1);
      setIsLiked(false);
    } else {
      setLikes(likes + 1);
      setIsLiked(true);
    }
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleCommentSubmit = (event) => {
    event.preventDefault();
    // TODO: Add comment to post
    setComment('');
  };

  return (
    <div className="bg-white w-2/3 mx-auto rounded-md shadow-md p-4 mb-4">
      <div className="flex items-center">
        <img className="h-10 w-10 rounded-full" src={props.imageUrl} alt={props.username} />
        <h2 className="text-lg ml-2">{props.username}</h2>
      </div>
        <img className="my-4 mx-auto h-96 w-96 " src={props.imageUrl} />
      <p className="text-gray-600 mt-2">{props.content}</p>
      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center">
          <button onClick={handleLikeClick} className="text-gray-600 hover:text-blue-500 focus:outline-none">
            <FaThumbsUp size={24} className={isLiked ? 'text-blue-500' : ''} />
          </button>
          <span className="text-gray-600 ml-2">{likes} Likes</span>
        </div>
        <div className="flex items-center">
          <button className="text-gray-600 hover:text-blue-500 focus:outline-none">
            <FaComment size={24} />
          </button>
          <span className="text-gray-600 ml-2">{props.comments.length} Comments</span>
        </div>
      </div>
      <div className="mt-4">
        {props.comments.map((comment) => (
          <div className="flex items-center mb-2">
            <img className="h-8 w-8 rounded-full" src={comment.avatarUrl} alt={comment.username} />
            <p className="text-gray-600 ml-2">{comment.content}</p>
          </div>
        ))}
        <form onSubmit={handleCommentSubmit} className="flex items-center mt-2">
          <img className="h-8 w-8 rounded-full" src={props.imageUrl} alt="Your Avatar" />
          <input
            type="text"
            placeholder="Add a comment..."
            value={comment}
            onChange={handleCommentChange}
            className="flex-1 ml-2 bg-gray-100 rounded-full py-2 px-4 text-gray-600 focus:outline-none"
          />
          <button type="submit" disabled={!comment} className={`ml-2 rounded-full py-2 px-4 ${!comment ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-400 text-white focus:outline-none'}`}>
            Post
          </button>
        </form>
      </div>
    </div>
  );
}





function Homepage(props) {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Handle form submission here
    console.log('Image:', image);
    console.log('Caption:', caption);

    // Clear form fields
    setImage(null);
    setCaption('');
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  }
  const sendmessage = () => {
    props.socket.emit('message', { message: "hello world", username: 'MUDITTIWARI' });
  };
  useEffect(()=>{
    // sendmessage();
  },[])
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar/>
      <div className="p-6 bg-gray-100">
      <h2 className="text-lg font-bold mb-2">Add Post</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center justify-center h-max border-4 border-dashed border-gray-400 rounded-lg">
          {image ? (
            <img src={URL.createObjectURL(image)} alt="Selected image" className="h-full w-full object-cover" />
          ) : (
            <span className="text-gray-500">No image selected</span>
          )}
        </div>
        <label htmlFor="image" className="block text-gray-700 font-bold mb-2">Add Image</label>
        <input type="file" accept="image/*" id="image" onChange={handleImageChange} className="px-4 py-2 border border-gray-400 rounded-lg w-full" />
        <label htmlFor="caption" className="block text-gray-700 font-bold mb-2">Caption</label>
        <textarea id="caption" value={caption} onChange={(e) => setCaption(e.target.value)} className="px-4 py-2 border border-gray-400 rounded-lg w-full resize-none"  />
        <button type="submit" className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600">Submit</button>
      </form>
    </div>
      <div className="flex-1 bg-gray-100 p-4">
        <p className="text-gray-600 w-max mx-auto font-bold text-3xl mb-4">Welcome to goodvibes!</p>
        <PostCard 
  profilePictureUrl="https://picsum.photos/id/237/200/300" 
  username="JohnDoe" 
  imageUrl="https://picsum.photos/id/237/500/500" 
  caption="Beautiful sunset at the beach" 
  likes={42} 
  comments={[
    {username: "JaneDoe", content: "Wow, stunning!", avatarUrl: "https://picsum.photos/id/237/200/300"},
    {username: "BobSmith", content: "I wish I was there!", avatarUrl: "https://picsum.photos/id/237/200/300"}
  ]}
/>

      </div>
    </div>
  );
}

export default Homepage;
