import React, { useEffect, useState } from "react";
import '../styles/post-view.css'
import Header from "./Header";
import axios from "axios";
import Post from "./Post";
// const user = [{
//     name: "Sanket",
//   location: "Pune",
//   description: "Jungle",
//   date: "2023/2/24",
//   likes: 201,
//   file: "https://thumbs.dreamstime.com/b/beautiful-rain-forest-ang-ka-nature-trail-doi-inthanon-national-park-thailand-36703721.jpg"

// },
// {
//     name: "Ai",
//   location: "Tokyo",
//   description: "Mt. Fuji Japan",
//   date: "2023/2/24",
//   likes: 5000,
//   file: "https://www.japanrailpass.com.au/wp-content/uploads/2014/07/Aerial-view-of-Mount-Fuji-volcano-with-a-snow-cap-in-Japan.jpg"

// },
// {
//     name: "John",
//   location: "Mumbai",
//   description: "Gateway of India",
//   date: "2023/2/24",
//   likes: 1115,
//   file: "https://planetofhotels.com/guide/sites/default/files/styles/paragraph__hero_banner__hb_image__1880bp/public/hero_banner/Gateway-to-India_0.jpg"
// },
// {
//     name: "Doe",
//   location: "Banglore",
//   description: "Maisoor Palace",
//   date: "2023/2/24",
//   likes: 4000,
//   file: "https://karnatakatourism.org/wp-content/uploads/2020/06/mysore-palace-1.jpg"
// }
// ]
export default function PostView() {
    const [user, setLike] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:8080/posts')
            .then(res => {
                res.data = res["data"].reverse();
                setLike(res.data)
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
            console.log(data._id);
            console.log(data);
            axios.put(`http://localhost:8080/${data._id}`, JSON.stringify(data))
            return [...prevData]
        })
    }

    const deletePost = (post) => {
        axios.delete(`http://localhost:8080/${post._id}`)
            .then((res) => {
                console.log(res);
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
                (user.length < 1)? <div className="post-container" style={{ textAlign: "center", fontSize: "30px" }}>No Posts Yet.</div>
        :
            user.map(data => {
                return <>
                    {/* <div className="post-container">
                                <header>
                                    <div>
                                        <p>{data.name}</p>
                                        <p>{data.location}</p>
                                    </div>
                                    <img src={more} onClick={()=>setMoreOption(toggle=>(!toggle))} />
                                    {moreOption && <div id="more-option">Delete</div>}
                                </header>
                                <section id="post-img">
                                    <img src={data.file} alt="post-img" />
                                </section>
        
                                <footer>
                                    <div>
                                        <img onClick={()=>getLikes(data)} src={heart} />
                                        <img src={share} />
                                        <p>{data.date}</p>
                                    </div>
                                    <p>{data.likes} likes</p>
                                    <p>{data.description}</p>
                                </footer>
                            </div>
                         */}
                    <Post data={data} getLikes={getLikes} deletePost={deletePost} key={data._id} />
                </>
            })
        }







    </>
}
