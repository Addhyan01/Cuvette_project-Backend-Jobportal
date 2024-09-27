const express = require("express");
const router = express.Router();
const { Job } = require("../schema/job.schema");
const  authMiddleware  = require("../middleware/auth");
const { route } = require("./user");






router.post("/create", authMiddleware, async (req, res) => {
    try{

        const { name, logo, position, salary, jobType, remote, location, description, about, skills, information } = req.body;
        const { user } = req;


        const jobs = skills.split(",").map(skill => skill.trim());
    
        
        const job = new Job({ name, logo, position, salary, jobType, remote, location, description, about, skills: jobs, information, creater : user });
        await job.save();
        res.status(201).json({message : "job created sucessfully"}) 

    }
    catch(err){
        console.log(err);
        res.status(400).json({message: "job not created "});

    }
});



router.get("/", async (req, res) => {

    const jobs = await Job.find().select("-__v -creater -_id");
    if(!jobs){
        return res.status(404).json({message : "job not found"});
    }   

    res.status(200).json(jobs);
})


module.exports = router;