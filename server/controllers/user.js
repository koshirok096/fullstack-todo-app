import User from "../models/User.js";
import { handleError } from "../error.js";

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

// UPDATE WALLPAPER

export const updateWallpaper = async (req, res, next) => {

  const { id } = req.params;
  const { bgwallpaper } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: { bgwallpaper } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};