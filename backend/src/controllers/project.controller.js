import Project from "../models/project.model.js";

export const createProject = async (req,res) => {
    const {projName,projDesc} = req.body;
    try {
        if(!projName || projName.length < 3){
            return res.status(400).json({message:'Bad User Input'});
        }

        const newProj = new Project({
            projName,
            projDesc,
            createdBy:req.user._id
        });
        await newProj.save();
        return res.status(201).json(newProj);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Server Error', error: error.message });
    }
}

export const getProjects = async (req,res)=> {
    const user_id = req.user._id;
    try {
        if(!user_id){
            return res.status(401).json({message:"Not authenticated"});
        }
        const projects = await Project.find({createdBy:user_id});
        res.status(201).json({data:projects});
    } catch (error) {
        console.log(error);
    }
}