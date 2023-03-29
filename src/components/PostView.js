import React, { useEffect, useState } from "react";
import '../styles/post-view.css'
import Header from "./Header";
import axios from "axios";
import Post from "./Post";

export default function PostView() {
    const [user, setLike] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState("")
    useEffect(() => {
        axios.get('https://insta-backend-qv9o.onrender.com/posts')
            .then(res => {
                res.data = res["data"].reverse();
                setLike(res.data);
                setLoading(false);
            setError('')
            
            })
        .catch(err=>{
                setError('Failed To Get Posts')
                setLoading(false)
            })
    }, [])
    const getLikes = (data) => {
        data.likes = data.likes + 1;
        setLike(prevData => {
            for (let i = 0; i < prevData.length; i++) {
                if (prevData[i]._id === data._id) {
                    prevData.splice(i, 1, data)
                    break;
                }
            }
            // console.log(data._id);
            // console.log(data);
            axios.put(`https://insta-backend-qv9o.onrender.com/${data._id}`, JSON.stringify(data))
            return [...prevData]
        })
    }

    const deletePost = (post) => {
        axios.delete(`https://insta-backend-qv9o.onrender.com/${post._id}`)
            .then((res) => {
                //console.log(res);
                setLike(prevData => (
                    prevData.filter(element => element._id !== res.data.id)
                ))
            })
            .catch(err => { console.log(err); })
    }

    //console.log(user);
    return <>
        <Header />

        {
           ( isLoading)? <div className="post-container" style={{ textAlign: "center", fontSize: "30px" }}>
                        <div class="lds-facebook"><div></div><div></div><div></div></div>    
                    </div>      
        :(user.length<1)? <div className="post-container" style={{ textAlign: "center", fontSize: "30px" }}>
                No Posts Yet.   
                     </div>      
        :(error)? <div className="post-container" style={{ textAlign: "center", fontSize: "30px", color:"red" }}>
                        {error}   
                    </div>
                :user.map(data => {
                    return <>
                        <Post data={data} getLikes={getLikes} deletePost={deletePost} key={data._id} />
                    </>
                })
        }







    </>
}
