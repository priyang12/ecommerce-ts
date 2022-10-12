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
  res.json({
    msg: err.message,
    MessageStack: ZodError,
    stack: process.env.NODE_ENV === "production" ? err.stack : err.stack,
  });
};

export { notFound, errorHandler };
