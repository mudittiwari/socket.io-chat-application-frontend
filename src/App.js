import { BrowserRouter,HashRouter ,Routes, Route } from 'react-router-dom';
import Login from './Login';
import Homepage from './Homepage';
import Messages from './Messages';
import Notifications from './Notifications';
import Userprofile from './Profile';
import EditProfile from './Editprofile';
import Signup from './Signup';
import io from 'socket.io-client';
const socket=io.connect("http://localhost:5000");
function App()
{
  return (
    <>
      <BrowserRouter>
     {/* <Navbar /> */}
        <Routes>
          <Route exact  path="/" element={<Homepage socket={socket} />} />
          <Route exact  path="/login" element={<Login />} />
          <Route exact  path="/signup" element={<Signup />} />
          <Route exact  path="/messages" element={<Messages />} />
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