import { StatusCodes } from "http-status-codes";
import { CodeRunner } from "../utils/index.js";
import SuccessResponse from "../utils/common/success.js";
import ErrorResponse from "../utils/common/error.js";

const input = `5
2 8
5 4
-8 -2
8 75
4444 2525
`;

const expectedOutput = `
10
9
-10
83
6969
`;

export const getCppOutput = async (req, res) => {
  try {
    const { code } = req.body;
    const output = await CodeRunner(code, input);
    SuccessResponse.data = output;
    if (expectedOutput.trim() == output.trim()) {
      SuccessResponse.message = "All testcase got matched ✅";
    } else {
      SuccessResponse.message = "Some test cases failed ❌";
    }
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
  }
};
