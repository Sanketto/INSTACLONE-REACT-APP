import React from "react";
import '../styles/post-view.css'
import camera from '../images/camera.png'
import icon from '../images/icon.png'
import { useNavigate } from "react-router-dom";

export default function Header(){
    const navigate = useNavigate();

    return<>
        <header id="insta-header">
            <img src={icon} className="icon"
                onClick={()=>{navigate('/')}}
                id="insta-logo"
            />
            <p>Instaclone</p>
            <img src={camera} className="icon" id="camera-icon"
                onClick={()=>{navigate('/newpost')}}
            />
        </header>
    </>
}