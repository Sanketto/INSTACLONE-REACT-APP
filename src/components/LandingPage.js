import React from "react";
import { useNavigate } from "react-router-dom";
import landingImage from '../images/landing-img.png'
import '../styles/landingPage.css'


export default function LandingPage(){
    const navigate = useNavigate()

    return<>
        <div id="landing-container">
            <section id="img-container">
                <img src={landingImage} alt="img-1" />
            </section>
            <section id="text-container">
                <h2>Instaclone</h2>
                <div id="btn-enter">
                    <button onClick={()=>{navigate('/postview')}} >Enter</button>
                </div>

            </section>
            
        </div>
    </>
}