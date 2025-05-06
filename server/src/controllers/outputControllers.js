import { StatusCodes } from "http-status-codes";
import { CodeRunner } from "../utils/index.js";
import SuccessResponse from "../utils/common/success.js";
import ErrorResponse from "../utils/common/error.js";


export const getOutput = async (req, res) => {
  try {
    const {code, input} = req.body;
    const output = await CodeRunner(code , input);
    SuccessResponse.data = output
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
  }
};
