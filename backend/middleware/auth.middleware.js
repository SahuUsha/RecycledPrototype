import { User } from "../models/user.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";


const verifyJWT = asyncHandler(async(req,_,next)=>{
    try {

        const token = req.cookies?.accessToken || req.headers["authorization"]?.replace("Bearer ", "");

        if(!token){
            throw new ApiError(401,"Unauthorized Request: No access token provided")
        }

        const decodedToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
        if (!decodedToken?._id) {
            throw new ApiError(401, "Invalid access token: Decoded token does not contain user ID");
          }

        const user = await User.findById(decodedToken._id).select("-password -refreshToken")  
        if (!user) {
            throw new ApiError(401, "Invalid access token: User does not exist");
          }

        req.user = user;
        next()  

    } catch (error) {
        console.error("JWT verification error:", error);
        throw new ApiError(401, error?.message || "Invalid access token");
    }
})

export default verifyJWT;