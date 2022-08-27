import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Chat from "./pages/Chat";
import SetAvatar from "./pages/SetAvatar";
import Logout from "./components/Logout";
class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/avatar" element={<SetAvatar />} />
          <Route path="/" element={<Chat />} />
          <Route path="/log" element={<Logout />} />
        </Routes>
      </BrowserRouter>
    )
  }
}
export default App;