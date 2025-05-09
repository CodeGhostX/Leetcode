import { StatusCodes } from 'http-status-codes';
import { Problem } from '../models/index.js'
import { ErrorResponse } from '../utils/common/index.js';
import { SuccessResponse } from '../utils/common/index.js';

export const addProblem = async (req, res) => {
    const { title, description, upvote, downvote } = req.body;

    if (!title || !description || !upvote || !downvote) {
        ErrorResponse.message = "fill all the details"
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
    try {
        const createProblem = await Problem.create({
            title,
            description,
            upvote,
            downvote
        })
        if (!createProblem) {
            console.log("Problem not added");
            ErrorResponse.message = "Problem not added"
            return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
        }
        SuccessResponse.message = "Problem added";
        SuccessResponse.data = {
            problem :{
                id: createProblem.id,
                title: createProblem.title,
                description: createProblem.description,
                upvote: createProblem.upvote,
                downvote: createProblem.downvote
            }
        }
        return res.status(StatusCodes.OK).json(SuccessResponse)
    }catch(error){
        console.log(error.message);
        ErrorResponse.message = error.message
        return res.status(StatusCodes.BAD_GATEWAY).json(ErrorResponse);
    }
}

export const getProblems = async(req,res) =>{
    try{
        const problems = await Problem.findAll();
        if(problems.length === 0){
            console.log("Problems not found");
            ErrorResponse.message = "Problems not found";
            return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
        }
        SuccessResponse.message = "Problems found";
        SuccessResponse.data = problems;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    }catch(error){
        console.log(error.message);
        ErrorResponse.message = error.message
        return res.status(StatusCodes.BAD_GATEWAY).json(ErrorResponse);
    }
}

export const getProblemById = async(req,res) =>{
    const problemId = req.params.id;
    try{
        const problem = await Problem.findByPk(problemId);
        if(!problem){
            console.log("Problem not found");
            ErrorResponse.message = "Problem not found";
            return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
        }
        SuccessResponse.message = "Problem found";
        SuccessResponse.data = user;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    }catch(error){
        console.log(error.message);
        ErrorResponse.message = error.message
        return res.status(StatusCodes.BAD_GATEWAY).json(ErrorResponse);
    }
}

export const updateProblem = async(req,res) =>{
    const problemId = req.params.id;
    const updates = req.body;
    try{
        const [affectedRows] = await Problem.update(updates,{where:{id:problemId}});
        if(affectedRows === 0){
            console.log("Problem not updated");
            ErrorResponse.message = "Problem not updated"
            return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
        }
        const updatedProblem = await Problem.findByPk(problemId);
        SuccessResponse.message = "Problem updated";
        SuccessResponse.data = updatedProblem;
        return res.status(StatusCodes.OK).json(SuccessResponse)

    }catch(error){
        console.log(error.message);
        ErrorResponse.message = error.message
        return res.status(StatusCodes.BAD_GATEWAY).json(ErrorResponse);
    }

}

export const deleteProblem = async(req,res) =>{
    const problemId = req.params.id;

    try{
        const removePrblm = await Problem.destroy({where:{id:problemId}});
        if(!removePrblm){
            console.log("Problem not deleted");
            ErrorResponse.message = "Problem not deleted";
            return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
        }
        SuccessResponse.message = "Problem deleted";
        return res.status(StatusCodes.OK).json(SuccessResponse);
    }catch(error){
        console.log(error.message);
        ErrorResponse.message = error.message
        return res.status(StatusCodes.BAD_GATEWAY).json(ErrorResponse);
    }
}