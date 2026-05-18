import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import Login from "./pages/Login";
import DashboardLayout from "./layouts/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import AddPrompt from "./pages/AddPrompt";
import Profile from "./pages/Profile";
import CommingSoon from "./components/CommingSoon"
import NotFound from "./components/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import PromptDetails from "./pages/PromptDetails";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route element={<Register />} path="/register" />
          <Route element={<Login />} path="/login" />

          <Route element={<DashboardLayout />} >
          <Route element={<ProtectedRoute>
            <Dashboard/>
            </ProtectedRoute>} path="/" />
          <Route element ={<Home/>} path="/home" />
          <Route path="/addprompt" element={<ProtectedRoute><AddPrompt /></ProtectedRoute>} />
          <Route path ="/profile" element ={<ProtectedRoute><Profile/></ProtectedRoute>} />
          <Route path="/prompt/:id" element={<ProtectedRoute><PromptDetails/></ProtectedRoute>}/>

          <Route path ="/categories" element ={<ProtectedRoute><CommingSoon/></ProtectedRoute>} />
          <Route path ="/bookmarks" element ={<ProtectedRoute><CommingSoon/></ProtectedRoute>} />
          <Route path="/settings" element ={<ProtectedRoute><CommingSoon/></ProtectedRoute>} />
          <Route path= "*"element={<NotFound/>} />


          </Route>

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
