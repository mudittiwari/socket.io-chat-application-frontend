import { BrowserRouter, HashRouter, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Homepage from './Homepage';
import Messages from './Messages';
import Notifications from './Notifications';
import Userprofile from './Profile';
import EditProfile from './Editprofile';
import Signup from './Signup';
import io from 'socket.io-client';
import Searchpage from './Searchpage';
import Friendrequests from './Friendrequests';
const socket = io.connect("http://localhost:5000");
function App() {
  if (localStorage.getItem('socialmediauser') != null) {
    socket.on('senddetails', (data) => {
      console.log("send details called");
      // alert(data);
      socket.emit('details', {'email':JSON.parse(localStorage.getItem('socialmediauser')).email});
    });
  }


  return (
    <>
      <BrowserRouter>
        {/* <Navbar /> */}
        <Routes>
          <Route exact path="/" element={<Homepage socket={socket} />} />
          <Route exact path="/login" element={<Login socket={socket} />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/messages" element={<Messages />} />
          <Route exact path="/search" element={<Searchpage socket={socket} />} />
          <Route exact path="/friendrequests" element={<Friendrequests socket={socket} />} />
          <Route exact path="/notifications" element={<Notifications />} />
          <Route exact path="/profile" element={<Userprofile />} />
          <Route exact path="/editprofile" element={<EditProfile />} />
        </Routes>
        {/* <Footer/> */}
      </BrowserRouter>
    </>
  );
}

export default App;