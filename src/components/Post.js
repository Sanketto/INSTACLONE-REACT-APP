import React, {  useState } from "react";
import share from '../images/share.png'
import more from '../images/more_icon.png'
import heart from '../images/heart.png'
import '../styles/post-view.css'

const Post = ({ data, getLikes, deletePost }) => {
    const [moreOption, setMoreOption] = useState(false)

    return <>
        <div className="post-container">
            <header>
                <div>
                    <p>{data.name}</p>
                    <p>{data.location}</p>
                </div>
                <img src={more} onClick={() => setMoreOption(toggle => (!toggle))} alt="icon-1" />
                {moreOption && <div onClick={()=>deletePost(data)} id="more-option">Delete</div>}
            </header>
            <section id="post-img">
                <img src={data.file} alt="post-img" />
            </section>

            <footer>
                <div>
                    <img onClick={() => getLikes(data)} src={heart} alt="icon-2" />
                    <img src={share} alt="icon-3" />
                    <p>{data.date}</p>
                </div>
                <p>{data.likes} likes</p>
                <p>{data.description}</p>
            </footer>
        </div>

    </>
}
export default Post