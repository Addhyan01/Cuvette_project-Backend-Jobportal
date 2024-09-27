const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const dotenv = require("dotenv");
dotenv.config();

const jsonwebtoken = require("jsonwebtoken");
const { User } = require("../schema/user.schema");
const { checkSchema } = require("express-validator");

//This is resgister user route

router.post(("/register"), async (req, res) => {
    const { name, email, password } = req.body;


    //Todo for check validatio schema using express-validator
    // const result = await checkSchema({
    //     email: { isEmail: true, errorMessage: "Please enter valid email" },
    //     password: { isLength: { options: { min: 8 } }, errorMessage: "Password must be at least 8 characters" },
    //   }).run(req.body);

    //   if (!result.isEmpty) {
    //     console.log('Failed validation');
    //     return res.status(400).json({ message: result.map((err) => err.context.message).join(', ') });
    //   }


    console.log(req.body);
    const ifUserExists = await User.findOne({ email });
    if (ifUserExists){
            return res.status(400).json({ message: "user already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({name, email, password: hashedPassword});
    await user.save();
    res.status(201).json({ message: "user created successfully" }); 


})

//Get All users

router.get(("/"), async (req, res) => {
    const users = await User.find().select("-password -_id" );
    // res.send(user);
    res.status(200).json( users );
})

//Get usr by email
router.get("/:email", async (req,res) => {
    const { email } = req.params;
    const users = await User.findOne({ email }).select("-password -_id") 
    if(!users){
        return res.status(404).json({message:"User not found"});
    }
    res.status(200).json(users);
})

// login User
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if(!user){
        res.status(400).json({message : "Wrong email or passwod"});
    }
    const isPasswordMAtch = await bcrypt.compare(password, user.password);
    if(!isPasswordMAtch){
       res.status(400).json({message: "Wrong email or passwod 2"});
    }
    const payload = { id: user._id };
    const token = jsonwebtoken.sign(payload, process.env.JWT_SECRET);
    res.status(200).json({ token });
    

})







module.exports = router;
   


