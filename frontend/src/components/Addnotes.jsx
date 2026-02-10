import React from 'react'
import axios from 'axios'
import { useState } from 'react';




const Addnotes = () => {
    const[title,settittle]=useState("");
const [content,setcontent]=useState("");


const addnotes=async()=>{    
await axios.post('http://localhost:5000/api/notes/addnote',{
        title,
        content
    })
    settittle("");
    setcontent("");
}


  return (
    <div>
        <input type='text' placeholder='enter the tittle'
        id='title'
        value={title}
        onChange={(e)=>settittle(e.target.value)}
        
        />
        <br/>

        <input type='text' placeholder='enter the content'
        id='content'
        value={content}
        onChange={(e)=>setcontent(e.target.value)}
        
        />
        <br/>
        <button onClick={addnotes} >Add notes</button>
    </div>
  )
}

export default Addnotes