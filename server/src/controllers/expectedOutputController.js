import { StatusCodes } from "http-status-codes";
import { ExpectedOutput } from "../models/index.js";
import { ErrorResponse } from "../utils/common/index.js";
import { SuccessResponse } from "../utils/common/index.js";

export const createExpectedOutput = async (req, res) => {
  const { problemId, testCaseId, expectedAns } = req.body;

  if (!problemId || !testCaseId || !expectedAns) {
    console.log("All fields are required");
    ErrorResponse.message = "All fields are required";
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  try {
    const expOutput = await ExpectedOutput.create({
      problemId,
      testCaseId,
      expectedAns,
    });

    if (!expOutput) {
      console.log("Expected output not created");
      ErrorResponse.message = "Expected output not created";
      return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }

    SuccessResponse.message = "Expected output created successfully";
    SuccessResponse.data = expOutput;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  }catch (error) {
    console.log(error.message);
    ErrorResponse.message = error.message;
    return res.status(StatusCodes.BAD_GATEWAY).json(ErrorResponse);
  }
};

export const getAllExpectedOutput = async(req,res) =>{
    try{
        const expectedOutputs = await ExpectedOutput.findAll();
        if(!expectedOutputs){
            console.log("Expected outputs not found");
            ErrorResponse.message = "Expected outputs not found"
            return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
        }
        SuccessResponse.message = "Expected outputs retrieved";
        SuccessResponse.data = expectedOutputs;
        return res.status(SuccessResponse.OK).json(SuccessResponse);
    }catch (error) {
        console.log(error.message);
        ErrorResponse.message = error.message;
        return res.status(StatusCodes.BAD_GATEWAY).json(ErrorResponse);
    }
}

export const getAllExpectedOutputById = async(req,res) =>{
    const id = req.params.id;
    try{
        const output = await ExpectedOutput.findByPk(id);
        if(!output){
            console.log("Expected output not found");
            ErrorResponse.message = "Expected output not found"
            return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
        }
        SuccessResponse.message = "Expected outputs retrieved";
        SuccessResponse.data = output;
        return res.status(SuccessResponse.OK).json(SuccessResponse);

    }catch (error) {
        console.log(error.message);
        ErrorResponse.message = error.message;
        return res.status(StatusCodes.BAD_GATEWAY).json(ErrorResponse);
    }
}

export const updateExpectedOutput = async(req,res) =>{
    const id = req.params.id;
    const updates = req.body;

    try{
        const [affectedRows] = await ExpectedOutput.update(updates, { where: { id } });

        if (!affectedRows) {
            console.log("Expected output not updated or not found");
            ErrorResponse.message = "Expected output not updated or not found";
            return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
        }
        const updatedOutput = await ExpectedOutput.findByPk(id);

        SuccessResponse.message = "Expected output updated successfully";
        SuccessResponse.data = updatedOutput;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    }catch (error) {
        console.error(error.message);
        ErrorResponse.message = error.message;
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}

export const deleteExpectedOutput = async(req,res) =>{
    const id = req.params.id;
    try{
        const deletedExp = await ExpectedOutput.destroy({where:{id}});
        if(!deletedExp){
            console.log("Expected output not deleted");
            ErrorResponse.message = "Expected output not deleted"
            return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
        }
        SuccessResponse.message = "Expected output deleted";
        return res.status(SuccessResponse.OK).json(SuccessResponse);
    }catch (error) {
        console.error(error.message);
        ErrorResponse.message = error.message;
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}