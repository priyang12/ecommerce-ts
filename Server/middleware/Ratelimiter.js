const RateLimit = require("express-rate-limit");

const limitReached = (req, res) => {
  console.log({ ip: req.ip }, "Rate limiter triggered");
  // renderError(req, res);
  return res.status(429).json({
    status: 429,
    message: "Too many requests",
  });
};

const renderError = (req, res) => {
  res.render("error", {
    title: "Rate limit reached",
    message:
      "You have reached the rate limit for this site. Please try again later.",
  });
};

const CustomRateLimiter = (
  options = {
    windowMs: 60000 * 5, // 5 minute
    max: 100, // limit each IP to 100 requests per windowMs
    handler: limitReached,
  }
) => {
  const rateLimiter = RateLimit(options);

  return rateLimiter;
};

module.exports = CustomRateLimiter;
