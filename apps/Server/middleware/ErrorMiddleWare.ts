import path from "path";

const notFound = (req, res, next) => {
  const error = new Error(`Not Found -${req.orinialUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  let ZodError = {};
  if ("issues" in err) {
    ZodError = err.flatten();
  }
  if (process.env.NODE_ENV !== "production") {
    console.log(ZodError);
  }
  res.status(res.statusCode === 200 ? 500 : res.statusCode);
  const _dirname = path.resolve();
  res.json({
    msg: err.message + `dire + ${_dirname}`,
    MessageStack: ZodError,
    stack: process.env.NODE_ENV === "production" ? err.stack : err.stack,
  });
};

export { notFound, errorHandler };
