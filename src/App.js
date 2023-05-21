import { BrowserRouter,HashRouter ,Routes, Route } from 'react-router-dom';
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
const socket=io.connect("http://localhost:5000");
function App()
{
 socket.on('safelyconnected', (data) => {
    // alert(data);
    console.log(data);
  });
 socket.on('senddetails', (data) => {
    // alert(data);
    socket.emit('details',JSON.parse(localStorage.getItem('socialmediauser')).accessToken);
  });
  

  return (
    <>
      <BrowserRouter>
     {/* <Navbar /> */}
        <Routes>
          <Route exact  path="/" element={<Homepage socket={socket} />} />
          <Route exact  path="/login" element={<Login />} />
          <Route exact  path="/signup" element={<Signup />} />
          <Route exact  path="/messages" element={<Messages />} />
          <Route exact  path="/search" element={<Searchpage socket={socket}/>} />
          <Route exact  path="/friendrequests" element={<Friendrequests socket={socket}/>} />
          <Route exact  path="/notifications" element={<Notifications />} />
          <Route exact  path="/profile" element={<Userprofile  />} />
          <Route exact  path="/editprofile" element={<EditProfile  />} />
        </Routes>
        {/* <Footer/> */}
      </BrowserRouter>
    </>
  );
}

export default App;