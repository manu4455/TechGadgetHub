import User from "../models/user";
import { uploads } from "../utils/cloudinary";
import fs from "fs";
import ErrorHandler from "../utils/errorHandler";
import bcrypt from "bcryptjs";
import APIFilters from "../utils/APIFilters";

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
  });

  res.status(201).json({
    user,
  });
};

export const updateProfile = async (req, res) => {
  const { name, email, phoneNo, dob, gender } = req.body;

  const newUserData = {
    name,
    email,
    phoneNo,
    dob,
    gender,
  };

  // If there's an avatar file to process
  if (req.files && req.files.length > 0) {
    const uploader = async (path) => await uploads(path, "TechYo/avatars");

    const file = req.files[0];
    const { path } = file;

    try {
      const avatarResponse = await uploader(path);
      newUserData.avatar = {
        public_id: avatarResponse.public_id,  // Ensure these are the correct fields from your upload response
        url: avatarResponse.url,
      };
    } catch (err) {
      return res.status(500).json({ message: "Could not upload image", error: err });
    } finally {
      fs.unlinkSync(path); // Ensure the file is deleted whether the upload was successful or not
    }
  }

  try {
    const user = await User.findByIdAndUpdate(req.user._id, newUserData, { new: true });
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({ message: "Could not update user", error });
  }
};


export const updatePassword = async (req, res, next) => {
  const user = await User.findById(req.user._id).select("+password");

  const isPasswordMatched = await bcrypt.compare(
    req.body.currentPassword,
    user.password
  );

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Old password is incorrect", 400));
  }

  user.password = req.body.newPassword;
  await user.save();

  res.status(200).json({
    sucess: true,
  });
};

export const getUsers = async (req, res) => {
  const resPerPage = 100;
  const usersCount = await User.countDocuments();

  const apiFilters = new APIFilters(User.find(), req.query).pagination(
    resPerPage
  );

  const users = await apiFilters.query;

  res.status(200).json({
    usersCount,
    resPerPage,
    users,
  });
};

export const getUser = async (req, res) => {
  let user = await User.findById(req.query.id);

  if (!user) {
    return next(new ErrorHandler("No user found with this ID", 404));
  }

  res.status(200).json({
    success: true,
    user,
  });
};

export const updateUser = async (req, res) => {
  let user = await User.findById(req.query.id);

  if (!user) {
    return next(new ErrorHandler("No user found with this ID", 404));
  }

  user = await User.findByIdAndUpdate(req.query.id, req.body.userData);

  res.status(200).json({
    success: true,
    user,
  });
};

export const deleteUser = async (req, res) => {
  let user = await User.findById(req.query.id);

  if (!user) {
    return next(new ErrorHandler("No User found with this ID", 404));
  }

  await user.deleteOne();

  res.status(200).json({
    success: true,
  });
};
