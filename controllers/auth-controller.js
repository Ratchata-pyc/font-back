const bcrypt = require("bcryptjs");
const prisma = require("../models/index");
const customError = require("../utils/custom-error");
const jwt = require("jsonwebtoken");

const register = async (req, res, next) => {
  const { username, password, confirmPassword, email } = req.body;
  try {
    //รับ body {username ,password ,confirmPassword ,email}
    // if (!username || !password || !confirmPassword) {
    if (!(username && password && confirmPassword)) {
      // const error = new Error("Fill all Input");
      // error.statusCode = 400;
      // return next(error);

      return next(customError("Fill all input", 400));
    }

    //validation
    if (password !== confirmPassword) {
      // const error = new Error("check confirmpassword");
      // error.statusCode = 400;
      throw customError("check confirmpassword", 400);
    }
    const userExist = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });
    if (userExist) {
      throw customError("user already exist", 400);
    }

    //hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const data = {
      username: username,
      password: hashedPassword,
      email: email,
    };

    //create user ใน prisma.user

    const result = await prisma.user.create({
      data: data,
    });
    console.log(result);
    res.json({ msg: "Register Sucessful" });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    //validation

    if (!(username && password)) {
      return next(customError("Fill all input", 400));
    }

    const targetUser = await prisma.user.findUnique({
      where: { username: username },
    });

    //find username in prisma.user
    if (!targetUser) {
      throw customError("invalid login", 400);
    }

    //check password
    const pwOk = await bcrypt.compare(password, targetUser.password);
    if (!pwOk) {
      throw customError("invalid login", 400);
    }
    //create jwt-token
    //make payload = {id,username}
    //jwt.sign +{expiresIn:"7d"}
    const payload = { id: targetUser.id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    console.log(token);

    // response jwt-token

    res.json({ token: token });
  } catch (err) {
    next(err);
  }
};

const me = (req, res, next) => {
  res.json({ msg: "in getMe" });
};

module.exports = { login, register, me };
