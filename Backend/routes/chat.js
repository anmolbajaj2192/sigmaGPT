import express from 'express';
import Thread from '../models/Thread.js';
import getOpenAIAPIResponse from '../utils/openai.js';


const router = express.Router();

//test: jho bhi incoming req hai woh '/post' par ayegi.
//sample thread hai woh db mein jakar store hojayega
router.post("/test", async(req, res)=>{
    try{
        const thread = new Thread({
            threadId:'xyz',
            title:'Testing new thread'
        });

        const response = await thread.save();
        res.send(response);
    }catch(err){
        console.log(err);
        res.status(500).json({error:'Failed to save in DB'});
    }
});

//get all threads
router.get("/thread", async(req, res)=>{
    try{
        const threads = await Thread.find({}).sort({updatedAt:-1}); //we have pass an empty object
        //descending order of updatedAt.....most recent data on top
        res.json(threads)
         
    }catch(err){
        console.log(err);
        res.send(500).json(
            {
                error:"Failed to fetch threads"
            });
    }
});

router.get("/thread/:threadId", async(req, res)=>{
    const {threadId} = req.params;

    try{
        const thread = await Thread.findOne({threadId});

        if(!thread){
            res.send(404).json({error:"Thread not found"});
        }
        res.json(thread.messages);
    }catch(err){
        console.log(err);
        res.send(500).json({
            error:"Failed to fetch chat"
        });
    }
});

router.delete("/thread/:threadId", async(req, res)=>{
    const {threadId} = req.params;
    try {
        const deletedThread = await Thread.findOneAndDelete({threadId});
        if(!deletedThread){
            res.send(404).json({error:"Thread could not found"});
        }
        res.send(200).json({success:"Thread deleted successfully"});
        
    } catch (error) {
        console.log(error);
        res.send(500).json({
            error:"Failed to delete chat"
        })
    }
});

router.post("/chat", async(req, res)=>{

    const {threadId, message}=req.body;

    //validated based on threadId and message
    if(!threadId || !message){
        res.send(404).json({error:"missing require fields"}); 
    }

    try {
        const thread = await Thread.findOne({threadId});
        //if thread doesnt exist then we had created new Thread and stored the message in it
        if(!thread){
            //create new Thread
            thread=new Thread({
                threadId,
                title:message,
                messages:[{role: "user", content: message}]
            });
        }else{
            //if thread already created then we stored the message
            thread.messages.push({role:"user", content: message});
        }

        //ask assistant reply
        const assistantReply = await getOpenAIAPIResponse(message);
        //stored reply in the Database
        thread.messages.push({role:"assistant", content: assistantReply});
        thread.updatedAt = new Date();

        //eventually saved everything in mongodb
        await thread.save();
        //reply has been sent to frontend 
        res.json({reply:assistantReply}); 
        
    } catch (error) {
        //if any thing went wrong.....
        console.log(error);
        res.send(500).json({error:"something went wrong"});
    }
})
export default router;