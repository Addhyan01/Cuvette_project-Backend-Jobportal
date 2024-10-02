const express = require("express");
const router = express.Router();
const { Job } = require("../schema/job.schema");
const  authMiddleware  = require("../middleware/auth");
const isAuth = require("../utils/index");


router.post("/", authMiddleware, async (req, res) => {
    try{

        const { name, logo, position, salary, jobType, remote, location, description, about, skills, information } = req.body;
        const { user } = req;


        const jobs = skills.split(",").map(skill => skill.trim());
    
        
        const job = new Job({ name, logo, position, salary, jobType, remote, location, description, about, skills: jobs, information, creater : user });
        await job.save();
        res.status(200).json({message : "job created sucessfully"}) 

    }
    catch(err){
        console.log(err);
        res.status(400).json({message: "job not created "});

    }
});



router.get("/", async (req, res) => {
    const isAuthenticated = await isAuth(req);
    const jobs = isAuthenticated ? await Job.find() : await Job.find().select("-__v -creater -_id -information");
    res.status(200).json(jobs);
})

router.get("/:id", authMiddleware, async (req, res) => {
    const { id } = req.params;
    const job = await Job.findById(id);
    if(!job){
        return res.status(404).json({message : "job not found"});
    }
    res.status(200).json(job);
})


router.delete("/:id", authMiddleware, async (req, res) => {
      const { id } = req.params;
      const job = await Job.findById(id);
      if(!job){
        return res.status(404).json({message : "job not found"});
      }
      if(job.creater.toString() !== req.user.toString()){
        return res.status(401).json({message : "you are not authorized to delete this job."});
      }    
      
      await Job.findByIdAndDelete(id);
      res.status(200).json({message : "job deleted successfully"});

})


router.put("/:id", authMiddleware, async (req, res) => {
    try{
        const { id } = req.params;
        const { name, logo, position, salary, jobType, remote, location, description, about, skills, information } = req.body;
        const jobSkills = skills?.split(",").map(skill => skill.trim());
        let job = await Job.findById(id);
        if(!job){
            return res.status(404).json({message : "job not found"});
        }


        if(job.creater.toString() !== req.user.toString()){
            return res.status(401).json({message : "you are not authorized to update this job."});
        }



         job = await Job.findByIdAndUpdate(id, { name, logo, position, salary, jobType, remote, location, description, about, skills: jobSkills, 
            information },{new : true});
            res.status(200).json(job);


            //job.save(); //also we can use this way to update the job data in the database without using mongoose library  

    }
    catch(err){
        console.log(err);
        res.status(400).json({message : "job not updated"});
    }
    
})



// SEARCH BY TITLE NAME :

router.get("/search/:title", async (req, res) => {
    const { title } = req.params;
    const jobs = await Job.find({ name: new RegExp(title, "i") }).select("-__v -creater -_id -information");
    res.status(200).json(jobs);
})

module.exports = router;