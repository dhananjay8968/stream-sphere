import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from '../utils/ApiError.js'
import { User } from "../models/user.models.js"
import { uploadOnCloudinary } from "../utils/fileupload.js"
import { upload } from "../middlewares/multer.middleware.js"
import { ApiResponse } from "../utils/ApiResponse.js"
const registerUser = asyncHandler( async (req,res) => {
    const {username, email, fullName, password } = req.body

    if(
        [fullName,email,username,password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400,"All fields are required")
    }

    const existingUser = await User.findOne({
        $or: [{ username },{ email }]
    })

    if(existingUser) {
        throw new ApiError(409,"User with email or username already exists")
    }

    const avatarLocalPath = req.files?.avatar[0]?.path

    let coverImageLocalPath;
    if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
        coverImageLocalPath = req.files.coverImage[0].path
    }

    if(!avatarLocalPath) {
        throw new ApiError(400,"Avatar file local is required")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    console.log("Avatar path", avatarLocalPath)
    console.log("here", avatar);
    
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if(!avatar) {
        throw new ApiError(400,"Avatar file is required")
    }

    const user = await User.create(
        {
            fullName,
            avatar: avatar.url,
            coverImage: coverImage?.url || "",
            email,
            password,
            username: username.toLowerCase()

        }
    )

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser) {
        throw new ApiError(500,"Error while registering user")
    }

    return res.status(201).json(
        new ApiResponse(200,createdUser,"User registered successfully")
    )



})

export { registerUser }