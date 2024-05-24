const customError = require("../utils/custom-error");
const jwt = require("jsonwebtoken");
const prisma = require("../models/");

module.exports = async (req, res, next) => {
  try {
    // check req.headers -- have Authorization
    const authorization = req.headers.authorization;
    if (!authorization) {
      throw customError("UnAuthorized", 401);
    }
    // if (!authorization.startsWith("Bearer ")) {
    if (!/^Bearer /.test(authorization)) {
      throw customError("UnAuthorized", 401);
    }

    const token = authorization.split(" ")[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    console.log(payload);

    const user = await prisma.user.findUnique({
      where: { id: payload.id },
    });

    // ลบ password จาก {}
    delete user.password;
    console.log(user);
    req.user = user;

    next();
  } catch (err) {
    next(err);
  }
};
