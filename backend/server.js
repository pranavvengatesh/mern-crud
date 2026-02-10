const express =require('express');
const app=express();

const mongoose=require('mongoose');
const cors=require('cors');

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/mynotes')
.then(()=>{
    console.log('connected to database');

}).catch((err)=>{
    console.log('error connecting to database',err);
})

const notesroutes=require('./routes/Noteroutes');
app.use('/api/notes',notesroutes);

app.listen(5000,()=>{
    console.log('server is running on port 5000');
})