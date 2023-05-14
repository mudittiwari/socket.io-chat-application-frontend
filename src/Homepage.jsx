import React from 'react';
import { FaHome, FaRegComment, FaBell, FaUser, FaThumbsUp, FaComment, FaReply } from 'react-icons/fa';
import { useState } from 'react';
import axios from 'axios';
import { getStorage, ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import app from './Firebase';
import Navbar from './Navbar';
import { useEffect } from 'react';
import LoadingBar from './Loadingbar';
function PostCard(props) {
  const [likes, setLikes] = useState(props.likes);
  const [isLiked, setIsLiked] = useState(false);
  const [comment, setComment] = useState('');


  const handleLikeClick = () => {
    if (props.likes.indexOf(props.user.id) == -1)
      props.socket.emit('addlike', { postid: props.id, userid: props.user.id });
    else
      props.socket.emit('removelike', { postid: props.id, userid: props.user.id });
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleCommentSubmit = (event) => {
    event.preventDefault();
    props.socket.emit('addcomment', { postid: props.id, userid: props.user.id, comment: comment, userimage: props.user.profilepicture, username: props.user.username });
    setComment('');
  };
  return (
    <div className="bg-white w-2/3 mx-auto rounded-md shadow-md p-4 mb-4">
      <div className="flex items-center">
        <img className="h-10 w-10 rounded-full" src={props.profilePictureUrl} alt={props.username} />
        <h2 className="text-lg ml-2">{props.username}</h2>
      </div>
      <img className="my-4 mx-auto h-96 w-96 " src={props.imageUrl} />
      <p className="text-gray-600 mt-2">{props.content}</p>
      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center">
          <button onClick={handleLikeClick} className="text-gray-600 hover:text-blue-500 focus:outline-none">
            <FaThumbsUp onClick={handleLikeClick} size={24} className={props.likes.indexOf(props.user.id) != -1 ? 'text-blue-500' : 'text-gray-600'} />
          </button>
          <span className="text-gray-600 ml-2">{props.likes.length} Likes</span>
        </div>
        <div className="flex items-center">
          <button className="text-gray-600 hover:text-blue-500 focus:outline-none">
            <FaComment size={24} />
          </button>
          <span className="text-gray-600 ml-2">{props.comments.length} Comments</span>
        </div>
      </div>
      <div className="mt-4">
        {props.comments.map((comment, index) => (

          <div className="flex items-start mb-2 flex-col " key={index}>
            <div className='flex items-center'>
              <img className="h-8 w-8 rounded-full" src={comment.userimage} alt={comment.username} />
              <div className='flex flex-col'>
                <p className="text-gray-600 ml-2">{comment.comment}</p>

              </div>
            </div>

          </div>

        ))}
        <form onSubmit={handleCommentSubmit} className="flex items-center mt-2">
          <img className="h-8 w-8 rounded-full" src={props.user.profilepicture} alt={props.user.username} />
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
  const [posts, setPosts] = useState([]);
  const [caption, setCaption] = useState('');
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('socialmediauser')));
  const [loading, setLoading] = useState(false);
  const storage = getStorage(app);
  const upload = async () => {
    if (image === null) {
      alert("Please select an image");
      return;
    }
    setLoading(true);
    const storageRef = ref(storage, `files/${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on('state_changed',
      (snapShot) => {

        console.log(snapShot);
      }, (err) => {
        console.log(err);

      }, () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          Addpost(downloadURL);
        });

      });

  }
  const Addpost = (url) => {


    axios.post('http://localhost:5000/api/post/createpost', {
      'title': caption,
      'image': url,
      'username': user.username,
      'userimage': user.profilepicture,
    }, {
      headers: {
        Authorization: `Bearer ${user.accessToken}`
      },
      params: {
        id: user.id
      }
    }).then((res) => {
      getposts();
      console.log(res);
      setImage(null);
      setCaption('');
      setLoading(false);
      alert("post added");
    }).catch((err) => {
      setLoading(false);
      console.log(err);
      alert("error");
    });

  }
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

  const getposts = () => {
    setLoading(true);
    axios.get('http://localhost:5000/api/post/getposts', {
      headers: {
        Authorization: `Bearer ${user.accessToken}`
      },
    }).then((res) => {
      let posts_ = [];
      const promises = [];
      for (let i = 0; i < res.data.length; i++) {
        if (res.data[i].user === user.id || res.data[i].user in user.friends) {
          const promise = axios.get('http://localhost:5000/api/user/getuser', {
            headers: {
              Authorization: `Bearer ${user.accessToken}`
            },
            params: {
              id: res.data[i].user
            }
          }).then((res1) => {
            posts_.push({ ...res.data[i], username: res1.data.username, profilepicture: res1.data.profilepicture });
          }).catch((err) => {
            console.log(err);
          });
          promises.push(promise);
        }
      }
      Promise.all(promises).then(() => {
        console.log(posts_);
        setPosts(posts_);
        setLoading(false);
      }).catch((err) => {
        console.log(err);
        setLoading(false);
        // alert("error");
      });
    }
    ).catch((err) => {
      setLoading(false);
      alert("error");
      console.log(err);
    }
    );
  }
  props.socket.on('likeadded', (data) => {
    if (data == "error") {
      alert("error");
    }
    else {
      // console.log(data);
      let posts_ = [...posts];
      // console.log();
      let index = posts_.findIndex((post) => post.id == JSON.parse(data).id);
      console.log(index);
      posts_[index] = JSON.parse(data);
      // console.log(posts_);
      setPosts(posts_);
      // console.log(posts);
    }
  });
  props.socket.on('likeremoved', (data) => {
    if (data == "error") {
      alert("error");
    }
    else {
      let posts_ = [...posts];
      let index = posts_.findIndex((post) => post.id == JSON.parse(data).id);
      posts_[index] = JSON.parse(data);
      setPosts(posts_);
    }
  });
  props.socket.on('commentadded', (data) => {
    if (data == "error") {
      alert("error");
    }
    else {
      let posts_ = [...posts];
      let index = posts_.findIndex((post) => post.id == JSON.parse(data).id);
      posts_[index] = JSON.parse(data);
      setPosts(posts_);
    }
  });
  const sendmessage = () => {
    props.socket.emit('message', { message: "hello world", username: 'MUDITTIWARI' });
  };
  useEffect(() => {
    // sendmessage();
    console.log(user);
    getposts();
  }, [props.socket])
  return (
    <>
      {loading && <LoadingBar />}
      <div className="min-h-screen flex flex-col">
        <Navbar />
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
            <textarea id="caption" value={caption} onChange={(e) => setCaption(e.target.value)} className="px-4 py-2 border border-gray-400 rounded-lg w-full resize-none" />
            <button type="submit" className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600" onClick={(e) => {
              e.preventDefault();
              upload();
            }}>Submit</button>
          </form>
        </div>
        <div className="flex-1 bg-gray-100 p-4">
          <p className="text-gray-600 w-max mx-auto font-bold text-3xl mb-4">Welcome to goodvibes!</p>
          {posts.length > 0 ? posts.map((post, index) => {
            return (
              <PostCard
                id={post.id}
                user={user}
                key={index}
                socket={props.socket}
                profilePictureUrl={post.userimage}
                username={post.username}
                imageUrl={post.image}
                caption={post.title}
                likes={post.likes}
                comments={post.comments}
              />
            );
          }) : <p className="text-gray-600 w-max mx-auto font-bold text-3xl mb-4">No posts to show</p>
          }

        </div>
      </div>
    </>
  );
}

export default Homepage;
