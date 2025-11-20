import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import mongoose from 'mongoose';
import chatRoutes from "./routes/chat.js";


const app = express(); //create app with express
const PORT=8080;

//Both of these lines will be usefull for frontend  
app.use(express.json()); //basic middleware to parse our incoming request
app.use(cors()); //use frontend <-> backend

app.use('/api', chatRoutes);

app.listen(PORT, ()=> {
    console.log(`server running on our ${PORT}`);
    connectDB();//jese he server start hoga we need to ensure before any incoming api calls  ki humara connection establish ho chuka hai 
});

const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("connected with database")
    }catch(err){
        console.log('Failed to connect with DB', err);
    }
} 

// app.post("/test", async (req, res)=>{

//     const options={
//         method:"POST",
//         headers: {
//             "Content-Type": "application/json",
//             "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
//         },
//         body: JSON.stringify({
//             model: "gpt-4o-mini",
//             messages: [{
//                     role: "user",
//                     content: "Hello!"
//             }]
//         })
//     };

//     try {
//         const response = await fetch("https://api.openai.com/v1/chat/completions", options);
//         const data = await response.json();
//         // console.log(data.choices[0].message.content);//reply
//         res.send(data.choices[0].message.content);
//     } catch (error) {
//         console.log(error);
//     }
// })