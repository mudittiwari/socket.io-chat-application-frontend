import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import LoadingBar from "./Loadingbar";
import { getStorage, ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import app from './Firebase';


const Modal = ({ isOpen, onClose,resetpassword }) => {
  const [oldpassword, setOldpassword] = useState("");
  const [newpassword, setNewpassword] = useState("");
  return (
    <div
      className={`fixed inset-0 flex items-center justify-center w-full z-50 ${isOpen ? '' : 'hidden'}`}
    >
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="bg-white p-8 rounded-lg shadow-lg w-1/2" style={{ 'zIndex': '100' }}>
        <h2 className="text-xl font-bold mb-4">Reset Password</h2>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="oldpassword"
          >
            Old Password
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="oldpassword"
            type="password"
            placeholder="Old Password"
            value={oldpassword}
            onChange={(e) => {
              setOldpassword(e.target.value);
            }}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="newpassword"
          >
            New Password
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="newpassword"
            type="password"
            placeholder="New Password"
            value={newpassword}
            onChange={(e) => {
              setNewpassword(e.target.value);
            }}
          />
        </div>
        <div className="flex ">
          <button
            className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              resetpassword(oldpassword,newpassword);
            }}

          >
            Change Password
          </button>
          <button
            className="bg-indigo-500 hover:bg-indigo-600 mx-4 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={(e) => {
              e.preventDefault();
              onClose();
            }}

          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};






function EditProfile() {
  const navigate = useNavigate();
  const storage = getStorage(app);
  const [image, setimage] = useState(null);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("socialmediauser")));
  const [name, setName] = useState(user.name);
  const [username, setUsername] = useState(user.username);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
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
          axios.post('http://localhost:5000/api/user/updateuser', {
            'name': name,
            'username': username,
            'profilepicture': downloadURL
          },{
            headers: {
              'Authorization': `Bearer ${user.accessToken}`
            },
            params:{
              'id':user.id
            }
          }).then((res) => {
            if (res.status === 200) {
              setLoading(false);
              alert("Profile Updated");
              let newuser=res.data;
              newuser.accessToken=user.accessToken;
              localStorage.setItem("socialmediauser",JSON.stringify(newuser));
              setUser(newuser);
            }
          }).catch((err) => {
            console.log(err);
            setLoading(false);
            alert("error");
          });
          // editprofile();
        });

      });

  }





  async function editprofile() {
    if (image === null) {
      setLoading(true);
      axios.post('http://localhost:5000/api/user/updateuser', {
        'name': name,
        'username': username,
        'profilepicture': user.profilepicture
      },{
        headers: {
          'Authorization': `Bearer ${user.accessToken}`
        },
        params:{
          'id':user.id
        }
      }).then((res) => {
        if (res.status === 200) {
          setLoading(false);
          // console.log(res.data);
          alert("Profile Updated");
          let newuser=res.data;
          newuser.accessToken=user.accessToken;
          localStorage.setItem("socialmediauser",JSON.stringify(newuser));
          setUser(newuser);
        }
      }).catch((err) => {
        console.log(err);
        setLoading(false);
        alert("error");
      });
    }
    else {
      upload();
    }
  }

  async function resetpassword(oldpassword, newpassword)
  {
    setLoading(true);
    axios.post('http://localhost:5000/api/user/resetpassword', {
      'oldpassword': oldpassword,
      'newpassword': newpassword
    },{
      headers: {
        'Authorization': `Bearer ${user.accessToken}`
      },
      params:{
        'id':user.id
      }
    }).then((res) => {
      if (res.status === 200) {
        setLoading(false);
        alert("Password Changed");
        closeModal();
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
      <Modal resetpassword={resetpassword} isOpen={modalOpen} onClose={closeModal} />
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


              <div className="flex ">
                <button
                  className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    editprofile();
                  }}

                >
                  Save Changes
                </button>
                <button
                  className="bg-indigo-500 hover:bg-indigo-600 mx-4 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    openModal();
                  }}

                >
                  Reset Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditProfile;