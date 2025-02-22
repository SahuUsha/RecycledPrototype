import { User } from "../models/user.js";
import { ApiError } from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";


const generateAccessandRefreshTokens = async(userId)=>{
    try{
        const user = await User.findById(userId);
    
    if(!user) {
        throw new ApiError(404, "User not found");
      }
    
      const accessToken = user.generateAccessToken();
      const refreshToken = user.generateRefreshToken();

      console.log("Access token:", accessToken);
       console.log("Refresh token:", refreshToken);

      user.refreshToken = refreshToken;

      await user.save({ validateBeforeSave: false });

      return {accessToken,refreshToken}

}catch(err){
    console.error("Error generating tokens:", err)
    throw new ApiError(500, "Something went wrong while generating access and refresh tokens")
}
}



const signUp = asyncHandler(async(req,res)=>{
    const {username,email,password,contact} = req.body

    console.log("username",username)
    console.log("password",password)
    console.log("email",email)
    console.log("contact",contact)
    if(!contact){
        throw new ApiError("contact is required")
    }

    if(
        [email,username,password].some((field)=> field?.trim()==="")

    ){
        throw new ApiError(400, "All field are required")
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!emailRegex.test(email)){
        throw new ApiError(400,"Invalid email formate")
    }

    const existedUser =  await User.findOne({
        email:email
    })

    if(existedUser){
        throw new ApiError(409 ,"User with email or username already exist")
    }


    const user = await User.create({
        username,
        email,
        password,
        contact,
        
    })

    const createdUser = await User.findById(user._id).select(
        "-password"
    )

    if(!createdUser){
        throw new ApiError(500,"some thing went worng while signup the user")
    }

    return res.status(201).json(
        new ApiResponse(200,createdUser,"User signUpSuccessfully")
    )
})

const loginUser = asyncHandler(async(req,res)=>{

    const {email,password} = req.body

    if(!password){
        throw new ApiError(400 , "password is required")
    }

    if( !email  ){
        throw new ApiError(400 , "username and email is required")
     }

     const user = await User.findOne({
      email: email
     })

     if(!user){
        throw new ApiError(404,"User not found")
     }

     const isPasswordValid =  await user.isPasswordCorrect(password)

     if(!isPasswordValid){
        throw new ApiError(401,"Invalid user password")
     }

     const {accessToken,refreshToken} = await generateAccessandRefreshTokens(user._id)
     console.log(accessToken)
     console.log(refreshToken)

    const loggedInUser =  await User.findById(user._id).select("-password -refreshToken");

    const options={
        httpOnly : true,
        secure : true
    }

    return res
    .status(200)
    .cookie("accessToken", accessToken  ,options)
    .cookie("refreshToken" , refreshToken,options)
    .json(
        new ApiResponse(
            200,
            {
                user : loggedInUser,accessToken,refreshToken
            },
             "User logged in successfully"
        )
    )
})

const logoutUser = asyncHandler(async(req,res)=>{

    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                refreshToken : undefined
            }
        },{
            new : true 
        }
    )

    const options={
        httpOnly : true,
        secure : true
    }

    return res
    .status(200)
    .clearCookie("accessToken" , options)
    .clearCookie("refreshToken" , options)
    .json(
        new ApiResponse(200,{},"user logged out")
    )
})

export {
    signUp,
    loginUser,
    logoutUser
}