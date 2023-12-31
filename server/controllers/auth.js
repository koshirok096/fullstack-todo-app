import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { handleError } from "../error.js";

export const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({
      ...req.body,
      password: hash
    });

    await newUser.save();

    const token = generateToken(newUser._id); // トークンを生成する関数を呼び出す

    const { password, ...othersData } = newUser._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(othersData);
  } catch (err) {
    next(err);
  }
};

export const signin = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    if (!user) return next(handleError(404, "User not found"));

    const isCorrect = await bcrypt.compare(req.body.password, user.password);

    if (!isCorrect) return next(handleError(400, "Wrong password"));

    const token = generateToken(user._id); // トークンを生成する関数を呼び出す

    const { password, ...othersData } = user._doc;

    res
      .cookie("access_token", token, {
        httpOnly: true
      })
      .status(200)
      .json({ token, ...othersData });
  } catch (err) {
    next(err);
  }
};

const generateToken = (userId) => {
  const token = jwt.sign({ id: userId }, process.env.JWT, {
    expiresIn: '1h',
    // headers: {
    //   typ: 'JWT'
    // }
  });
  return token;
};
