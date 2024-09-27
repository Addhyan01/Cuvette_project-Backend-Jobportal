const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { User} = require("./user.schema");

const jobSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    logo: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
    jobType: {
        type: String,
        required: true,
        enum: ['Full Time', 'Part Time', 'Contract', 'internship']

        //What is enum?
        //It is a way to restrict the value of a field. means you can only enter Full Time or Part Time or Contract or Internship;(liited options only)
    },
    remote:{
        type: Boolean,
        required: true,
        default: false
    },  
    location: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    about: {
        type: String,
        required: true
    },
    skills: {
        type: [Array],
        required: true,

        //why we are use array here?
        //because we can use multiple skills in one job and so we use array here
        //here [string] means array of string type and it is required
    },
    information: {
        type : String,
        required : true
    },
    creater:{
        type : mongoose.Schema.ObjectId,
        ref : "User",
        required: true

    }
});


const Job = mongoose.model("Job", jobSchema);

module.exports = { Job } 