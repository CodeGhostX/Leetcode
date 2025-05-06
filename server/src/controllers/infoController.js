import { StatusCodes } from "http-status-codes";
import { SuccessResponse } from "../utils/common/index.js";

export const infoController = (req, res) => {
  SuccessResponse.message = "Server is running";
  return res.status(StatusCodes.OK).json(SuccessResponse)
};
