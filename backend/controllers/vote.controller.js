import { Vote } from "../models/interestvote.js";
import { ApiError } from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";



const toggleVote = asyncHandler(async(req,res)=>{
  const {eventId} = req.params;
  const userId = req.user?._id;

  if(!eventId){
    throw new ApiError(400,"eventId is required")
  }

  const existingVote = await Vote.findOne({
    event : eventId,
    voteBy : userId
  })

  if(existingVote){
    await Vote.findByIdAndDelete(existingVote?._id)
  }else{
    const newVote = await Vote.create({
        event : eventId,
        voteBy : userId
    })
    if(!newVote){
        throw new ApiError(400, "failed to vote")
    }
  }

  const totalVote = await Vote.countDocuments({event:eventId})

 return res.status(200).json(
    new ApiResponse(200,{vote : !existingVote , totalVote},"Liked toggles sucessfully")
 )


})

export {toggleVote}