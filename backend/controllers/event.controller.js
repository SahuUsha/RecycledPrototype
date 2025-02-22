import { Event } from "../models/event.js";
import { User } from "../models/user.js";
import { ApiError } from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({storage });


const addEvent =asyncHandler(async(req,res)=>{

    const {title,description,location} = req.body;
    const owner = req.user

    console.log("title : ",title)
    console.log("description : ",description)
    console.log("location : ",location)
    console.log("owner : ",owner)

    const image = req.file
    
    if(
        [title,description,location].some((field)=> field?.trim()==="")
    ){
      throw new ApiError(400,"All fields are required")
    }

   if(!image){
 throw new ApiError(404,"Image is required")
   }
 
   const newEvent = await Event.create({
         title,
         description,
         location,
         owner,
         image:{
            data: image.buffer,
            contentType : image.mimetype

         },
       })
  
  const eventCreated = await Event.findById(newEvent._id)

  if(!eventCreated){
    throw new ApiError(500,"event is not created")
  }

  return res.status(201)
  .json(
   new ApiResponse(200,eventCreated,"Event created successfully")
  )

})


const getAllIncompleteEvent=asyncHandler(async(req,res)=>{

    const allEvents = await Event.aggregate([
        {
            $match: { isEventComplete: false }
        },
        {
            $lookup: {
                from: "users",
                localField: "owner",
                foreignField: "_id",
                as: "ownerInfo"
            }
        },
        {
            $unwind: "$ownerInfo"
        },
        {
            $project: {
                title: 1,
                description: 1,
                location: 1,
                participants :1,

                owner: {
                    _id: "$ownerInfo._id",
                    username: "$ownerInfo.username",
                    email: "$ownerInfo.email",
                    contact: "$ownerInfo.contact"
                },
                image: "$image" // Keep raw image data
            }
        }
    ]);

    // Convert image buffer to Base64 in JavaScript
    const formattedEvents = allEvents.map(event => ({
        ...event,
        image: event.image?.data
            ? `data:${event.image.contentType};base64,${event.image.data.toString("base64")}`
            : null,
    }));

    return res.status(200).json(new ApiResponse(200, formattedEvents, "Events fetched successfully"));
})


const joinEvent = asyncHandler(async (req, res) => {
    const userId = req.user._id;  // Logged-in user ID
    const { eventId } = req.params; // Event ID from request

    // Check if the event exists
    const event = await Event.findById(eventId);
    if (!event) {
        throw new ApiError(404, "Event not found");
    }

    // Check if user is already a participant
    if (event.participants.includes(userId)) {
        throw new ApiError(400, "You have already joined this event");
    }

    // Update the User: Add eventId to event_joined
    await User.findByIdAndUpdate(userId, {
        $addToSet: { event_joined: eventId } // Avoid duplicates
    });

    // Update the Event: Add userId to participants
    await Event.findByIdAndUpdate(eventId, {
        $addToSet: { participants: userId }
    });

    return res.status(200).json(new ApiResponse(200, null, "Joined event successfully"));
});


export {addEvent,upload,getAllIncompleteEvent,joinEvent}