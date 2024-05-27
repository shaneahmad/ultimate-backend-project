import asyncHandler from '../utils/asyncHandler.js';
import ApiErrors from '../utils/ApiError.js';
import {User} from '../models/user.model.js';
import uploadOnCloudinary from '../utils/cloudinary.js';
import ApiResponse from '../utils/ApiResponse.js';



const registerUser = asyncHandler(async (req, res, next) => {
    // steps for user registration
    // get user data from req.body
    // validate user data
    // check if user already exists: using email and username
    // check for images, avatar, profile picture
    // upload images to cloudinary, avatar
    // create user object and create user entry in database
    // hash user password
    // remove sensitive data from user object like password and refresh tokens
    // check for user creation
    // return response
    const {fullname, username, email, password} = req.body;
    console.log(fullname, username, email, password);
    if(fullname === '' || username === '' || email === '' || password === ''){
        res.status(400);
        throw new ApiErrors(400, 'All fields are required');
    }
    const existedUser = User.findOne({$or: [{email}, {username}]});
    if(existedUser){
        throw new ApiErrors(409, 'User already exists');
    }
    
    const avatarLocalPAth = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if(!avatarLocalPAth){
        throw new ApiErrors(400, 'Avatar is required');
    }
    const avatar = await uploadOnCloudinary(avatarLocalPAth);
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);
    if(!avatar){
        throw new ApiErrors(500, 'Avatat upload failed');
    }
    const user = User.create({
        fullname,
        username: username.toLowerCase(),
        email,
        password,
        avatar: avatar.url,
        coverImage: coverImage.url || "",
    });
    const createdUser = await User.findById(user._id).select('-password -refreshToken');
    if(!createdUser){
        throw new ApiErrors(500, 'User creation failed');
    }
    return res.status(201).json(new ApiResponse(200, 'User created successfully', createdUser));
});

export {registerUser};