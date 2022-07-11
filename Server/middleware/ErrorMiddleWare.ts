const notFound = (req, res, next) => {
  const error = new Error(`Not Found -${req.orinialUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  let ErrorMessage = err.message;
  if ("issues" in err) {
    ErrorMessage = err.flatten();
  }
  if (process.env.NODE_ENV !== "production") {
    console.log(ErrorMessage);
  }
  res.status(res.statusCode === 200 ? 500 : res.statusCode);
  res.json({
    msg: ErrorMessage,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

export { notFound, errorHandler };
