import express from 'express';
import Thread from '../models/Thread.js';


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

export default router;