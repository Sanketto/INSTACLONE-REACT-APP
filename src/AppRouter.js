import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import NewPost from "./components/NewPost";
import PostView from "./components/PostView";

export default function AppRouter(){
    return<>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage/>}/>
                <Route path="/postview" element={<PostView/>} />
                <Route path="/newpost" element={<NewPost/>} />
            </Routes>
        </BrowserRouter>    
    </>
}