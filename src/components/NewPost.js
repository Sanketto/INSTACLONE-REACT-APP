import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/new-post.css'


export default function NewPost(){
    const [data, setData] = useState({
      name: "",
      description: "",
      file: "",
      location: "",
      likes: 0,
      date: ""
    })
    const navigate = useNavigate()

     const uploadImg =(e)=> {
      setData(prevData=>({
        ...prevData,
        file: e.target.files[0]
      }))
    }
  
    return (
      <div className="post-form">
          <form encType="multipart/form-data" method="POST" onSubmit={(e)=>{
            e.preventDefault();
            let time = new Date();
            data.date= `${time.getFullYear()}/${time.getMonth()+1}/${time.getDate()}`;
           setData(prevData=>({
              ...prevData,
              date: `${time.getFullYear()}/${time.getMonth()+1}/${time.getDate()}`
           }))
           if(!data.location || !data.name || !data.description || !data.file){
              alert("Fields shouldn't be empty!!!")
              return
           }
           else{
           let data1 = data.file;
           //console.log(data1);
           const formdata = new FormData()
           formdata.append("file",data1)
           formdata.append("usr",JSON.stringify(data))
            axios.post('http://localhost:8080/upload', formdata
            )
            .then(res=>{
              console.log(res);
              navigate('/postview')
            })
            .catch(err=>{
              console.log(err);
            })
            
            //console.log(data );
          }
             

  
          }}>
            <div>
            <input id="file" type="file" 
              onChange={uploadImg}  
              accept="image/*"
              name="file"
            />
            </div>
            <div id="author">
              <input type="text" 
                onChange={(e)=>{
                  setData(prevData=>({
                    ...prevData,
                    name: e.target.value
                  }))
                }}  
                value={data.name}
                placeholder="Author"/>
              <input type="text"
              onChange={(e)=>{
                setData(prevData=>({
                  ...prevData,
                  location: e.target.value
                }))
              }}  
              value={data.location}
              placeholder="Location"/>
            </div>
            <div>
              <input type="text"
              onChange={(e)=>{
                setData(prevData=>({
                  ...prevData,
                  description: e.target.value
                }))
              }}  
              value={data.description}
              placeholder="description"/>
              </div>
              <div id="post-btn">
                  <button type="submit">Post</button>
              </div>
          </form>
      </div>
    );
}