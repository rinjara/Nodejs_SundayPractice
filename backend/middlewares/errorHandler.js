module.exports = (error, req, res, next) => {
  console.log(res.statusCode);
  // console.log(error.message);
  const statusCode = res.statusCode || 500;

  let stack = process.env.NODE_ENV === "development" ? error.stack : null;

  return res.status(statusCode).json({
    code: statusCode,
    stack,
  });
};
