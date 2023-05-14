import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LoadingBar from './Loadingbar';
import { getStorage, ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import app from './Firebase';
function Signup() {
    const storage = getStorage(app);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [image, setimage] = useState(null);
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
              signup(downloadURL);
            });
    
          });
    
      }
    function signup(imageurl) {
        setLoading(true);
        axios.post('http://localhost:5000/api/user/register', {
            'name': name,
            'username': username,
            'email': email,
            'password': password,
            'image': imageurl
        }).then((res) => {
            if (res.status === 200) {
                setLoading(false);
                navigate('/login');
            }
        }).catch((err) => {
            console.log(err);
            setLoading(false);
            alert("error");
        });
    }


    return (
        <>
            {loading && <LoadingBar />}
            <div className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 min-h-screen flex items-center justify-center">
                <div className="bg-white w-full max-w-sm rounded-lg shadow-lg overflow-hidden">
                    <div className="px-6 py-4">
                        <h2 className="text-center text-3xl font-bold text-gray-700">Create your account</h2>
                    </div>
                    <div className="px-6 py-4">

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                                Name
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="name"
                                type="text"
                                placeholder="Enter your Name"
                                value={name}
                                onChange={(e) => {
                                    setName(e.target.value);
                                }
                                }
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                                Username
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="username"
                                type="text"
                                placeholder="Enter your Username"
                                value={username}
                                onChange={(e) => {
                                    setUsername(e.target.value);
                                }
                                }
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                Email Address
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }
                                }
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                Password
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="password"
                                type="password"
                                placeholder="Enter your Password"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }
                                }
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="image" className="block text-gray-700 font-bold mb-2">Profile Picture</label>
                            <input type="file" accept="image/*" id="image" onChange={(e) => {
                                setimage(e.target.files[0]);
                            }} className="px-4 py-2 border border-gray-400 rounded-lg w-full" />
                        </div>
                        <div className="flex items-center justify-between">
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="submit" onClick={(e) => {
                                    e.preventDefault();
                                    upload();
                                }}
                            >
                                Signup
                            </button>
                            <Link
                                className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                                to="#"
                            >
                                Forgot Password?
                            </Link>
                        </div>
                    </div>
                    <div className="px-6 py-4">
                        <p className="text-gray-700 text-center">
                            Already have an Account?{' '}
                            <Link className="font-bold text-blue-500 hover:text-blue-800" to="/login">
                                Login
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Signup;