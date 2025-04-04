import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
// async handler is nothing but higher order function which accepts the
// which accepts the other function.
// const registerUser = asyncHandler(async (req, res) => {

//    console.log("Register route hit"); // Debugging

//    res.status(200).json({
//     message: "Jagrat backend",
//   });
// });
// method to bana dia maga execute jab hoga jab koi url hit hoga.

const registerUser = asyncHandler(async (req, res) => {
  // get user details from frontend
  // validation - not empty
  // Check if the user already exists: username,email
  // Check for images,check for avatar
  // upload them to cloudinary,avatar
  // create user object-create entry in db
  // remove password and refresh token field from response
  // check for user creation
  // return res

  const { fullName, email, username, password } = req.body;
  if (
    [fullName, email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are compulsory"); //  we can also check one by one but this one is proper classic syntax.
  }

  const existedUser = await User.findOne({
    $or: [{ username }, { email }], // by using the $we can use various operators nd check multiple things ki if username or email is not there
  });

  console.log(existedUser);

  if (existedUser) {
    throw new ApiError(409, "User with email or username already exists!");
  }
  // console.log(req.files);

  const avatarLocalPath = req.files?.avatar[0]?.path;
  // const coverImageLocalPath = req.files?.coverImage[0]?.path;

  let coverImageLocalPath;
  if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length>0){
    coverImageLocalPath = req.files.coverImage[0].path // now we are checking if the cover image is empty or not
  }

  console.log(avatarLocalPath);
  console.log(coverImageLocalPath);

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if (!avatar) {
    throw new ApiError(400, "Avatar file is required");
  }

  const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase(),
  });

  // console.log(user);
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(500, "something went wrong while registering the user");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User Registered succesfully"));
});

export { registerUser };
