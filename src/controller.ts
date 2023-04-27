import { z } from "zod";
import { Request, Response, NextFunction } from "express";
import { shiftBy } from "./shiftBy";

// use zod for input validation
const postData = z.object({
  array: z.array(
    z.number({ invalid_type_error: "element in array should be a number" }),
    {
      required_error: "array is required",
      invalid_type_error: "array should be an array of numbers",
    }
  ),
  n: z.number({
    required_error: "n is required",
    invalid_type_error: "n should be a number",
  }),
});

type PostData = z.infer<typeof postData>;

interface CustomRequest<T> extends Request {
  body: T;
}

function Controller() {
  let isProcessing = false;
  let result: number[];
  let timeout: NodeJS.Timeout;

  return {
    checkPostData: (
      req: CustomRequest<PostData>,
      res: Response,
      next: NextFunction
    ) => {
      const parseResult = postData.safeParse(req.body);
      if (!parseResult.success)
        return res
          .status(400)
          .json({ error: parseResult.error.issues[0].message });
      next();
    },
    getData: (_: any, res: Response) => {
      if (isProcessing || !result) return res.json({ status: "pending" });
      res.json({ result, status: "complete" });
    },
    setData: (req: CustomRequest<PostData>, res: Response) => {
      clearTimeout(timeout);
      isProcessing = true;

      timeout = setTimeout(() => {
        result = shiftBy(req.body.array, req.body.n);
        isProcessing = false;
      }, 5000);

      res.json({ status: "request sent" });
    },
  };
}

const controller = Controller();

export const { checkPostData, getData, setData } = controller;
