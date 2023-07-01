import { handleError } from "../error.js";
import User from "../models/User.js";
// import Tweet from "../models/Tweet.js";

// GET

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

// DELETE

export const deleteUser = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      await User.findByIdAndDelete(req.params.id);
      // await Tweet.remove({ userId: req.params.id });

      res.status(200).json("User delete");
    } catch (err) {
      next(err);
    }
  } else {
    return next(handleError(403, "You can only update your own account"));
  }
};