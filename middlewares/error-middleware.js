module.exports = (err, req, res, next) => {
  console.log("----");
  console.log(err);
  console.log("----");
  let statusCode = err.statusCode || 500;
  res.status(statusCode).json({ msg: err.message });
};
