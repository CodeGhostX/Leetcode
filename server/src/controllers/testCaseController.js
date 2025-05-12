import { StatusCodes } from "http-status-codes";
import { Testcase } from "../models/index.js";
import { ErrorResponse } from "../utils/common/index.js";
import { SuccessResponse } from "../utils/common/index.js";

export const createTestCase = async(req,res) =>{
    const test = req.body;
    try{
        const testCase = await Testcase.create(test);
        if(!testCase){
            console.log("Test case not created");
            ErrorResponse.message = "Test case not created";
            return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
        }
        SuccessResponse.message = "Test case created";
        return res.status(StatusCodes.OK).json(SuccessResponse);

    }catch(error){
        console.log(error.message);
        ErrorResponse.message = error.message;
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
}

export const deleteTest = async(req,res) =>{
    const id = req.params.id;
    try{
        const deleteTestCase = await Testcase.destroy({where : {id:id}});
        if(!deleteTestCase){
            console.log("Test case not deleted");
            ErrorResponse.message = "Test case not deleted";
            return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
        }
        SuccessResponse.message = "Test case deleted";
        return res.status(StatusCodes.OK).json("Test case deleted");
    }catch(error){
        console.log(error.message);
        ErrorResponse.message = error.message;
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
}