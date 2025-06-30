import path from "path";

const notFound = (req, res, next) => {
  const error = new Error(`Not Found -${req.orinialUrl}`);
  res.status(404);
  next(error);
};

interface ErrorResponse {
  msg: string;
  MessageStack: object;
  stack?: string;
  directory?: string;
}

const errorHandler = (err, req, res, next) => {
  let ZodError = {};
  if ("issues" in err) {
    ZodError = err.flatten();
  }
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);

  const response: ErrorResponse = {
    msg: err.message,
    MessageStack: ZodError,
  };

  // Include stack only in non-production
  if (process.env.NODE_ENV !== "production") {
    response.stack = err.stack;
    response.directory = path.resolve(); // optional, for debug
  }

  res.json(response);
};

export { notFound, errorHandler };
