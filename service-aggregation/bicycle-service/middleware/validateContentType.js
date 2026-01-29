const request = ["GET", "POST", "PUT"];
const validateContentType = (req, res, next) => {
  if (request.includes(req.method && !req.is("application/json"))) {
    return res.status(415).json({
      error: "Unsupported Media Type. Content-Type must be application/json",
    });
  }
  next();
};

export default validateContentType;
