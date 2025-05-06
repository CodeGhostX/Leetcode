import fs from "fs";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

const runner = async (code, input, ext = "cpp") => {
  fs.writeFileSync("main.cpp", code);
  fs.writeFileSync("input.txt", input);

  try {
    const { stdout } = await execAsync("g++ main.cpp -o main && ./main < input.txt");
    return stdout;
  } catch (error) {
    return error.stderr || error.message;
  }
};

export default runner;
