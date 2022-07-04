const notFound = (req, res, next) => {
  const error = new Error(`Not Found -${req.orinialUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  if (process.env.NODE_ENV !== "production") {
    console.log(err);
  }
  res.status(res.statusCode === 200 ? 500 : res.statusCode);
  res.json({
    msg: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

module.exports = { notFound, errorHandler };
