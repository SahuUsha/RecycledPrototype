import { User } from "../models/user.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";



const UserDetail = asyncHandler(async(req,res)=>{
    const userId = req.user; // Assuming `req.user` contains the authenticated user's ID

    if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
    }

    // Fetch user details and populate event details
    const user = await User.findById(userId)
        .select("username email walletId balance event_joined")
        .populate({
            path: "event_joined",
            select: "title", // Fetch event title only
            model: Event, 
        });

    if (!user) {
        throw new ApiError(404,"User not found")
    }

    // Count the number of events joined
    const eventCount = user.event_joined.length;

    res.status(200).json({
        user: {
            username: user.username,
            email: user.email,
            walletId: user.walletId,
            balance: user.balance,
            event_joined: user.event_joined,
            total_events_joined: eventCount // Add event count
        }
    });
  
})


export {UserDetail}