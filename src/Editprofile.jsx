import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import LoadingBar from "./Loadingbar";
import { getStorage, ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import app from './Firebase';
function EditProfile() {
  const navigate = useNavigate();
  const storage = getStorage(app);
  const [image, setimage] = useState(null);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("socialmediauser")));
  const [name, setName] = useState(user.name);
  const [username, setUsername] = useState(user.username);
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [imageurl,setimageurl]=useState("");

  const upload = async () => {
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
          setimageurl(downloadURL);
          editprofile();
        });

      });

  }

  async function editprofile()
  {

  }

  return (
    <>
    {loading && <LoadingBar />}
    <div className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 min-h-screen">
      {/* <Navbar /> */}
      <div className="container mx-auto max-w-screen-lg py-10">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-2xl font-bold mb-4">Edit Profile</h1>
          <form>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="name"
              >
                Name
              </label>
              <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="username"
              >
                Username
              </label>
              <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                placeholder="Your Username"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="image" className="block text-gray-700 font-bold mb-2">Profile Picture</label>
              <input type="file" accept="image/*" id="image" onChange={(e) => {
                setimage(e.target.files[0]);
              }} className="px-4 py-2 border border-gray-400 rounded-lg w-full" />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="Your Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            
            <button
              className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                EditProfile();
              }}

            >
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
    </>
  );
}

export default EditProfile;