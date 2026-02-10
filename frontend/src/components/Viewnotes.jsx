import React from 'react'
import { useState,useEffect } from 'react'
import axios from 'axios';



const Viewnotes =() => {
    
const [notes,setnotes]=useState([]);
const  load=async()=>{
const res=await axios.get("http://localhost:5000/api/notes");
setnotes(res.data);
};
const editnotes = async (id) => {
  const newtittle = prompt("new tittle");
  const newcontent = prompt("new content");

  if (!newtittle || !newcontent) return;

  await axios.put(`http://localhost:5000/api/notes/${id}`, {
    title: newtittle,
    content: newcontent,
  });

  load();
};

const deletenotes=async(id)=>{
    await axios.delete(`http://localhost:5000/api/notes/${id}`)
 load();

}
useEffect(()=>{
    load();
},[])
  return (
    <div>
        <h1>Viewnotes</h1>
    
    {notes.map((note)=>
     <div key={note._id}>
        <b>{note.title}</b> -{note.content}
        <button onClick={()=>editnotes(note._id)}>edit</button>
        <button onClick={()=>deletenotes(note._id)}>del</button>
     </div>

    )}


    </div>
  )
}

export default Viewnotes